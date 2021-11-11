import {Validator} from "./Validator.js";

let $btnSignUp = document.getElementById("btnSignUp");
let $tfEmail = document.getElementById("tfEmail");
let $tfNickname = document.getElementById("tfNickname");
let $tfPassword = document.getElementById("tfPassword");
let $tfRepeatPassword = document.getElementById("tfRepeatPassword");
let $cbGender = document.getElementById("cbSex");
let $dpBirthday = document.getElementById("dpBirthday");
let $pWarning = document.getElementById("warning");
let $tStartTime = document.getElementById("tStartTime");
let $tEndTime = document.getElementById("tEndTime");

$btnSignUp.addEventListener("click", (event) => {
    event.preventDefault();
    let playerEmail = $tfEmail.value;
    let playerNickname = $tfNickname.value;
    let playerPassword = $tfPassword.value;
    let playerRepeatPassword = $tfRepeatPassword.value;
    let playerGender = $cbGender.value;
    let playerBirthday = $dpBirthday.value;
    let playerStartTime = $tStartTime.value;
    let playerEndTime = $tEndTime.value;
    console.log("HORA. " +playerStartTime);
    console.log("HORA FIN. " +playerEndTime);

    if (Validator.validateTime(playerStartTime, playerEndTime)){
        console.log("A tiempo");
    }else {
        console.log("tarde");
    }

    if (validateFields(playerNickname, playerEmail, playerPassword, playerRepeatPassword, playerBirthday)) {



        let newPlayer = {
            email: playerEmail,
            nickname: playerNickname,
            password: playerPassword,
            gender: playerGender,
            birthday: playerBirthday,
            startTime: playerStartTime,
            endTime: playerEndTime
        }
        let sendOptions = {
            method: "POST",
            body: JSON.stringify(newPlayer),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log("PELUSA: "+sendOptions);
        fetch("http://127.0.0.1:5000/" + "players", sendOptions).then(response => {
            if (response.ok) {
                location.href = '../index.html';
            }
        })
    }
})

function validateFields(nickname, email, password, repeatPassword, birthday) {
    let flag = true;
    if (!nickname.trim() && !email.trim() && !password.trim() && !repeatPassword.trim() && !birthday.trim()){
        $pWarning.innerHTML = "* Campos vacíos"
        flag = false;
    }
    if (!Validator.validateEmail(email)) {
        flag = false;
        $pWarning.innerHTML = "* La dirección de correo no es válida"
    }
    let validatedPassword = Validator.validatePassword(password, repeatPassword);
    if (validatedPassword === "dontMatch") {
        flag = false;
        $pWarning.innerHTML = "* Las contraseñas no coinciden"
    }else if (validatedPassword === "weakPassword"){
        flag = false;
        $pWarning.innerHTML = "* La contraseña debe contener al menos una mayúscula y un número"
    }
    if (!Validator.validateNickname(nickname)) {
        flag = false;
        $pWarning.innerHTML = "* El nickname debe tener al menos 4 caracteres y máximo 25"
    }
    return flag;
}