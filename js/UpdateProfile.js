import {Validator} from "./Validator.js";

let $btnUpdate = document.getElementById("btnUpdate");
let $tfNickname = document.getElementById("tfNickname");
let $tfPassword = document.getElementById("tfPassword");
let $tfRepeatPassword = document.getElementById("tfRepeatPassword");
let $cbGender = document.getElementById("cbSex");
let $dpBirthday = document.getElementById("dpBirthday");
let $pWarning = document.getElementById("warning");
let $btnDelete = document.getElementById("btnConfirmDelete");

$tfNickname.value = sessionStorage.getItem('nickname');
$dpBirthday.value = sessionStorage.getItem('birthday');
$cbGender.value = sessionStorage.getItem('gender');

$btnUpdate.addEventListener("click", (event) => {
    event.preventDefault();
    let playerEmail = sessionStorage.getItem("email");
    let playerNickname = $tfNickname.value;
    let playerPassword = $tfPassword.value;
    let playerRepeatPassword = $tfRepeatPassword.value;
    let playerGender = $cbGender.value;
    let playerBirthday = $dpBirthday.value;

    if (validateFields(playerNickname, playerEmail, playerPassword, playerRepeatPassword, playerBirthday)) {
        let newPlayer = {
            email: playerEmail,
            nickname: playerNickname,
            password: playerPassword,
            gender: playerGender,
            birthday: playerBirthday
        }
        let sendOptions = {
            method: "PUT",
            body: JSON.stringify(newPlayer),
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            }
        }
        fetch("http://127.0.0.1:5000/" + "players", sendOptions).then(response => {
            if (response.ok){
                sessionStorage.setItem('nickname', newPlayer.nickname);
                sessionStorage.setItem('birthday', newPlayer.birthday);
                sessionStorage.setItem('gender',newPlayer.gender);
                sessionStorage.setItem('currentPassword',password);
                location.href = '../view/ViewProfile.html';
            }
        })
    }
})

function validateFields(nickname, email, password, repeatPassword, birthday){
    let flag = true;
    if (!nickname.trim() && !email.trim() && !password.trim() && !repeatPassword.trim() && !birthday.trim()){
        $pWarning.innerHTML = "* Campos vacíos"
        flag = false;
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

$btnDelete.addEventListener("click",(event) =>{
    event.preventDefault();
    let playerToDelete = {
        email: sessionStorage.getItem('email'),
    }
    let sendOptions = {
        method: "DELETE",
        body: JSON.stringify(playerToDelete),
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token')
        }
    }
    console.log(sendOptions.body);
    fetch("http://127.0.0.1:5000/" + "players", sendOptions).then(response => {
        console.log(response);
        if (response.status === 200) {
            sessionStorage.clear();
            location.href = '../index.html';
        }
    })
})
