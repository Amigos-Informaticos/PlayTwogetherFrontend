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
let $rdSchedule = document.getElementsByName("update-schedule-radio");

let $inpProfilePic = document.getElementById("inpProfilePic");
let $btnUpdateProfilePic = document.getElementById("btnUpdateProfilePic");

$tfNickname.value = sessionStorage.getItem('nickname');
$dpBirthday.value = sessionStorage.getItem('birthday');
$cbGender.value = sessionStorage.getItem('gender');

initForm();
$btnUpdate.addEventListener("click", (event) => {
    event.preventDefault();
    let playerEmail = sessionStorage.getItem("email");
    let playerNickname = $tfNickname.value;
    let playerPassword = $tfPassword.value;
    let playerRepeatPassword = $tfRepeatPassword.value;
    let playerGender = $cbGender.value;
    let playerBirthday = $dpBirthday.value;

    if ((infoIsUpdated() && passwordIsUpdated()) || passwordIsUpdated() ){
        sendUpdateComplete(playerNickname, playerEmail, playerPassword, playerRepeatPassword, playerBirthday, playerGender);

    }else if(infoIsUpdated() && !passwordIsUpdated()){
        sendUpdateInfo(playerNickname, playerEmail, playerGender, playerBirthday);
    }
})
function sendUpdateInfo(playerNickname, playerEmail, playerGender, playerBirthday){
    if (validateFieldsInfo(playerNickname, playerBirthday)){
        let newPlayer = {
            email: playerEmail,
            nickname: playerNickname,
            gender: playerGender,
            birthday: playerBirthday,
            schedule: getSchedule()
        }
        let sendOptions = buildOptions(newPlayer);
        sendFetchUpdate(sendOptions, newPlayer);
    }
}

function sendUpdateComplete(playerNickname, playerEmail, playerPassword, playerRepeatPassword, playerBirthday, playerGender){
    if (validateFieldsComplete(playerNickname, playerPassword, playerRepeatPassword, playerBirthday)) {
        let newPlayer = {
            email: playerEmail,
            nickname: playerNickname,
            password: playerPassword,
            gender: playerGender,
            birthday: playerBirthday,
            schedule: getSchedule()
        }
        let sendOptions = buildOptions(newPlayer)
        sendFetchUpdate(sendOptions, newPlayer);

    }
}

function getSchedule(){
    let selectedSchedule;
    for(var i = 0; i < $rdSchedule.length; i++) {
        if($rdSchedule[i].checked)
            selectedSchedule = $rdSchedule[i].value;
    }
    return selectedSchedule;
}

function buildOptions(newPlayer){
    let options = {
        method: "PUT",
        body: JSON.stringify(newPlayer),
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem("token")
        }
    }
    return options;
}

function sendFetchUpdate(options , newPlayer){
    fetch(Configuration.getURL() + "players", options).then(response => {
        if (response.ok) {
            sessionStorage.setItem('nickname', newPlayer.nickname);
            sessionStorage.setItem('birthday', newPlayer.birthday);
            sessionStorage.setItem('gender', newPlayer.gender);
            sessionStorage.setItem('schedule', newPlayer.schedule);
            location.href = '../view/ViewProfile.html';
        }else if (response.status ===  409){
            $pWarning.innerHTML = "El nickname ya existe actualmente, porfavor, elige otro.";
        }else if (response.status === 400){
            $pWarning.innerText = "Información inválida. Por favor, ingresa la información de manera correcta";
        }else if(response.status === 403){
            alert("Tu sesión expiró, por favor, inicia sesión nuevamente");
            location.href = "../index.html";
        }else{
            alert("Servidor en mantenimiento, ingrese más tarde");
            location.href = "../index.html";
        }
    })
}




function validateFieldsComplete(nickname,  password, repeatPassword, birthday) {
    let flag = true;
    $pWarning.innerHTML = ""
    if (!nickname && !password && !repeatPassword && !birthday) {
        $pWarning.innerHTML = "* Campos vacíos"
        flag = false;
    }else{
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
        if (!Player.validateBirthday(birthday)){
            flag = false;
            $pWarning.innerHTML = "* Debes ser mayor que 11 años y menor que 100 para poder registrarte"
        }
    }

    return flag;
}
function  validateFieldsInfo(nickname,  birthday){
    let flag = true;
    if (!nickname  && !birthday){
        $pWarning.innerHTML = "* Campos vacíos"
        flag = false;
    }else {
        if (!Player.validateNickname(nickname)) {
            flag = false;
            $pWarning.innerHTML = "* El nickname debe tener al menos 4 caracteres y máximo 25"
        }
        if (!Player.validateBirthday(birthday)){
            flag = false;
            $pWarning.innerHTML = "* Debes ser mayor que 11 años y menor que 100 para poder registrarte"
        }
    }
    return flag;
}

function infoIsUpdated(){
    $pWarning.innerHTML = ""
    let flag = false;
    let latestNickname = sessionStorage.getItem("nickname");
    let latestBirthday = sessionStorage.getItem("birthday");
    let latestGender = sessionStorage.getItem("gender");
    let lastSchedule = sessionStorage.getItem("schedule");

    let updatedNickname = $tfNickname.value;
    let updatedBirthday = $dpBirthday.value;
    let updatedGender = $cbGender.value;
    let updateSchedule = getSchedule();

    let genderDiferents = latestGender != updatedGender;
    let nicknameDiferents =latestNickname != updatedNickname;
    let birthdaysDiferents = latestBirthday != updatedBirthday;
    let schedulesDifetents = lastSchedule != updateSchedule;


    if (genderDiferents|| nicknameDiferents ||birthdaysDiferents || schedulesDifetents){
        flag = true;
    }

    return flag;
}

function  passwordIsUpdated(){
    let password = $tfPassword.value;
    let repeatPassword = $tfRepeatPassword.value;
    return password != "" || repeatPassword != "";
}


function initForm(){
    $tfNickname.value = sessionStorage.getItem("nickname");
    $dpBirthday.value = sessionStorage.getItem("birthday");
    $cbGender.value = sessionStorage.getItem("gender");
    let selectedSchedule = sessionStorage.getItem("schedule");
    let id_element = "update_schedule_"+selectedSchedule;
    document.getElementById(id_element).checked = true;
}


$btnUpdateProfilePic.addEventListener("click",(event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log($inpProfilePic.files[0]);
    formData.append("image", $inpProfilePic.files[0]);
    let nickname = sessionStorage.getItem("nickname");
    fetch(Configuration.getURL() + "players/" + nickname + "/image",{
        method: "POST",
        body: formData,
        headers: {
            'token': sessionStorage.getItem("token"),
            'email': sessionStorage.getItem("email")
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
        }else if(response.status === 403){
            alert("Tu sesión expiró, por favor, inicia sesión nuevamente");
            location.href = "../index.html";
        }
    })
})
