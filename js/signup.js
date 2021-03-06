import {Player} from "./Player.js";
import {Configuration} from "./Configuration.js";

let $btnSignUp = document.getElementById("btnSignUp");
let $tfEmail = document.getElementById("tfEmail");
let $tfNickname = document.getElementById("tfNickname");
let $tfPassword = document.getElementById("tfPassword");
let $tfRepeatPassword = document.getElementById("tfRepeatPassword");
let $cbGender = document.getElementById("cbSex");
let $dpBirthday = document.getElementById("dpBirthday");
let $rdSchedule = document.getElementsByName("schedule-radio");
let $pWarning = document.getElementById("warning");
let $modalErrorMessage = document.getElementById("errorModal");

let $pEmailWarning = document.getElementById("email-warning");
let $pNicknameWarning = document.getElementById("nickname-warning");
let $pPasswordWarning = document.getElementById("password-warning");
let $pBirthdayWarning = document.getElementById("birthday-warning");
let $pScheduleWarning = document.getElementById("schedule-warning");

$btnSignUp.addEventListener("click", (event) => {
    event.preventDefault();
    let playerEmail = $tfEmail.value;
    let playerNicknameWithSpaces = $tfNickname.value;
    let playerNickname = playerNicknameWithSpaces.replace(/ /g, "");
    let playerPassword = $tfPassword.value;
    let playerRepeatPassword = $tfRepeatPassword.value;
    let playerGender = $cbGender.value;
    let playerBirthday = $dpBirthday.value;
    let playerSchedule = getSchedule();

    if (validateFields(playerNickname, playerEmail, playerPassword, playerRepeatPassword, playerBirthday, playerSchedule)) {
        let newPlayer = {
            email: playerEmail,
            nickname: playerNickname,
            password: playerPassword,
            gender: playerGender,
            birthday: playerBirthday,
            schedule: playerSchedule
        };
        let sendOptions = {
            method: "POST",
            body: JSON.stringify(newPlayer),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*"
            }
        };
        fetch(Configuration.getURL() + "players", sendOptions).then(response => {
            if (response.status === 201) {
                location.href = "../view/singUpSuccessful.html";
            }else if (response.status === 409){
                $pWarning.innerHTML = "El nickname o el email existen, prueba cambi??ndolos*";
            }else{
                $pWarning.innerHTML = "Servidor en mantenimiento, intente m??s tarde";
            }
        }).catch(error => $pWarning.innerHTML = "Servidor en mantenimiento, intente m??s tarde");
    }
});

function getSchedule(){
    let selectedSchedule;
    for(var i = 0; i < $rdSchedule.length; i++) {
        if($rdSchedule[i].checked)
            selectedSchedule = $rdSchedule[i].value;
    }
    return selectedSchedule;
}

function validateFields(nickname, email, password, repeatPassword, birthday, schedule) {
    let flag = true;
    if (!Player.validateEmail(email)) {
        flag = false;
        $pEmailWarning.innerHTML = "* La direcci??n de correo no es v??lida";
    }else {
        $pEmailWarning.innerHTML = "";
    }
    let validatedPassword = Player.validatePassword(password, repeatPassword);
    if (validatedPassword === "dontMatch") {
        flag = false;
        $pPasswordWarning.innerHTML = "* Las contrase??as no coinciden";
    }else if (validatedPassword === "weakPassword"){
        flag = false;
        $pPasswordWarning.innerHTML = "* La contrase??a debe contener entre 8 y 20 caracteres," +
            " con al menos una may??scula y un n??mero";
    }else {
        $pPasswordWarning.innerHTML = "";
    }
    if (!Player.validateNickname(nickname)) {
        flag = false;
        $pNicknameWarning.innerHTML = "* El nickname debe tener al menos 4 caracteres y m??ximo 25";
    }else {
        $pNicknameWarning.innerHTML = "";
    }
    if (!Player.validateBirthday(birthday)){
        flag = false;
        $pBirthdayWarning.innerHTML = "* Debes ser mayor que 11 a??os y menor que 100 para poder registrarte";
    }else{
        $pBirthdayWarning.innerHTML = "";
    }
    if (Player.uncompleteSignUpInfo(email,nickname,password,repeatPassword,birthday,schedule)){
        flag = false;
        $pWarning.innerHTML = "Llena todos los campos obligatorios (*)";
    }else{
        $pWarning.innerHTML = "";
    }
    return flag;
}