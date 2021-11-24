import {Player} from "./Player.js";
import {Configuration} from "./Configuration.js";

let $btnUpdate = document.getElementById("btnUpdate");
let $tfNickname = document.getElementById("tfNickname");
let $tfPassword = document.getElementById("tfPassword");
let $tfRepeatPassword = document.getElementById("tfRepeatPassword");
let $cbGender = document.getElementById("cbSex");
let $dpBirthday = document.getElementById("dpBirthday");
let $pWarning = document.getElementById("warning");
let $btnDelete = document.getElementById("btnConfirmDelete");

let $inpProfilePic = document.getElementById("inpProfilePic");
let $btnUpdateProfilePic = document.getElementById("btnUpdateProfilePic");

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
                'token': sessionStorage.getItem("token")
            }
        }
        fetch(Configuration.getURL() + "players", sendOptions).then(response => {
            if (response.ok) {
                sessionStorage.setItem('nickname', newPlayer.nickname);
                sessionStorage.setItem('birthday', newPlayer.birthday);
                sessionStorage.setItem('gender', newPlayer.gender);
                sessionStorage.setItem('currentPassword', password);
                location.href = '../view/ViewProfile.html';
            }
        })
    }
})

function validateFields(nickname, email, password, repeatPassword, birthday) {
    let flag = true;
    if (!nickname.trim() && !email.trim() && !password.trim() && !repeatPassword.trim() && !birthday.trim()) {
        $pWarning.innerHTML = "* Campos vacíos"
        flag = false;
    }
    let validatedPassword = Player.validatePassword(password, repeatPassword);
    if (validatedPassword === "dontMatch") {
        flag = false;
        $pWarning.innerHTML = "* Las contraseñas no coinciden"
    } else if (validatedPassword === "weakPassword") {
        flag = false;
        $pWarning.innerHTML = "* La contraseña debe contener al menos una mayúscula y un número"
    }
    if (!Player.validateNickname(nickname)) {
        flag = false;
        $pWarning.innerHTML = "* El nickname debe tener al menos 4 caracteres y máximo 25"
    }
    return flag;
}

$btnUpdateProfilePic.addEventListener("click",(event) => {
    event.preventDefault();
    const formData = new FormData();

    console.log($inpProfilePic.files[0]);

    formData.append("image", $inpProfilePic.files[0]);

    let nickname = sessionStorage.getItem("nickname");

    fetch(Configuration.getURL() + "players/Yira98/image",{
        method: "POST",
        body: formData,
        headers: {
            'token': "CACACACAAA"
        }
    }).then(response => {
        if (response.ok){
            location.href = '../view/ViewProfile.html';
        }
    }).catch(console.error);
})

$btnDelete.addEventListener("click", (event) => {
    event.preventDefault();
    let playerToDelete = {
        email: sessionStorage.getItem("email"),
    }
    let sendOptions = {
        method: "DELETE",
        body: JSON.stringify(playerToDelete),
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem("token")
        }
    }
    fetch(Configuration.getURL() + "players", sendOptions).then(response => {
        if (response.status === 200) {
            sessionStorage.clear();
            location.href = "../index.html";
        }
    })
})
