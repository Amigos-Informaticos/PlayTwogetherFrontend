import {Player} from "./Player.js";

let $btnSignUp = document.getElementById("btnSignUp");
let $tfEmail = document.getElementById("tfEmail");
let $tfNickname = document.getElementById("tfNickname");
let $tfPassword = document.getElementById("tfPassword");
let $tfRepeatPassword = document.getElementById("tfRepeatPassword");
let $cbGender = document.getElementById("cbSex");
let $dpBirthday = document.getElementById("dpBirthday");
let $rdSchedule = document.getElementsByName("schedule-radio");
let $pWarning = document.getElementById("warning");

let $pEmailWarning = document.getElementById("email-warning");
let $pNicknameWarning = document.getElementById("nickname-warning");
let $pPasswordWarning = document.getElementById("password-warning");
let $pGenderWarning = document.getElementById("gender-warning");
let $pBirthdayWarning = document.getElementById("birthday-warning");
let $pScheduleWarning = document.getElementById("schedule-warning");

$btnSignUp.addEventListener("click", (event) => {
    event.preventDefault();
    let playerEmail = $tfEmail.value;
    let playerNickname = $tfNickname.value;
    let playerPassword = $tfPassword.value;
    let playerRepeatPassword = $tfRepeatPassword.value;
    let playerGender = $cbGender.value;
    let playerBirthday = $dpBirthday.value;
    let playerSchedule = getSchedule();


    console.log("Email: " + playerEmail);
    console.log("Nickname: " + playerNickname);
    console.log("Password: " + playerPassword);
    console.log("RPassword: " + playerRepeatPassword);
    console.log("Birthday: " + playerBirthday);
    console.log("Schedule: " + playerSchedule);

    if (validateFields(playerNickname, playerEmail, playerPassword, playerRepeatPassword, playerBirthday, playerSchedule)) {
        console.log("PASÓ");

        let newPlayer = {
            email: playerEmail,
            nickname: playerNickname,
            password: playerPassword,
            gender: playerGender,
            birthday: playerBirthday,
            schedule: playerSchedule
        }
        let sendOptions = {
            method: "POST",
            body: JSON.stringify(newPlayer),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log("PELUSA: "+sendOptions);
        fetch("http://127.0.0.1:5000/players", sendOptions).then(response => {
            if (response.ok) {
                location.href = '../index.html';
            }
        })
    }
})

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
        $pEmailWarning.innerHTML = "* La dirección de correo no es válida";
    }else {
        $pEmailWarning.innerHTML = "";
    }
    let validatedPassword = Player.validatePassword(password, repeatPassword);
    if (validatedPassword === "dontMatch") {
        flag = false;
        $pPasswordWarning.innerHTML = "* Las contraseñas no coinciden";
    }else if (validatedPassword === "weakPassword"){
        flag = false;
        $pPasswordWarning.innerHTML = "* La contraseña debe contener al menos una mayúscula y un número";
    }else {
        $pPasswordWarning.innerHTML = ""
    }
    if (!Player.validateNickname(nickname)) {
        flag = false;
        $pNicknameWarning.innerHTML = "* El nickname debe tener al menos 4 caracteres y máximo 25";
    }else {
        $pNicknameWarning.innerHTML = "";
    }
    if (Player.uncompleteSignUpInfo(email,nickname,password,repeatPassword,birthday,schedule)){
        flag = false;
        $pWarning.innerHTML = "Llena todos los campos obligatorios (*)";
    }
    return flag;
}