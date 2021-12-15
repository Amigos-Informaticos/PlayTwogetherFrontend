import {GameValidator} from "./GameValidator.js";
import {Configuration} from "./Configuration.js";

let $tfNickName = document.getElementById("tfNickname");
let $tfLevel = document.getElementById("tfLevel");
let $cbCharacter = document.getElementById("cbCharacter");
let $cbRank = document.getElementById("cbRank");
let $cbRol = document.getElementById("cbRol");
let $tfHours = document.getElementById("tfHours");
let $tfNote = document.getElementById("tfNote");
let $warning = document.getElementById("warning");
let $btnAddGame = document.getElementById("btnAddGame");
let $characterWarning = document.getElementById("character-warning");
let $rolWarning = document.getElementById("rol-warning");
let $nicknameWarning = document.getElementById("nickname-warning");
let $levelWarning = document.getElementById("level-warning");
let $rankWarning = document.getElementById("rank-warning");
let $hoursWarning = document.getElementById("hours-warning");
sessionStorage.setItem("viewProfile", sessionStorage.getItem("nickname"));

function populatePersonageCombo(){
    let sendOptions = {
        method: "GET"
    }
    fetch(Configuration.getURL() + "game/apexLegends/personages", sendOptions).then(response => {
        if (response.ok) {
            response.json().then(responseJson => {
                responseJson.forEach((personage) => {
                    var option = document.createElement("option");
                    option.value = personage.id;
                    option.innerHTML = personage.name;
                    $cbCharacter.appendChild(option);
                });
            })
        }
    })
}

function verifyInfo(nickname, accountLevel, personage, hourPlayed, rol, idRank) {
    let flag = true;
    cleanFields();
    if (GameValidator.uncompleteGameInfo(nickname, accountLevel, personage, hourPlayed, rol)) {
        flag = false;
        $warning.innerText = "Llena correctamente todos los campos obligatorios (*)";
    }
    if(!GameValidator.validateNickname(nickname)){
        flag = false;
        $nicknameWarning.innerHTML = "Ingresa un nickname válido de entre 4 y  26 caracteres";
    }

    if (!GameValidator.validatePersonage(personage)) {
        flag = false;
        $characterWarning.innerText = "Selecciona un agente";
    }
    if (!GameValidator.validateRol(rol)){
        flag = false;
        $rolWarning.innerText = "Selecciona un rol";
    }
    if (!GameValidator.validateHoursToPlay(hourPlayed)){
        flag = false;
        $hoursWarning.innerHTML = "Las horas totales no son válidas, deben estar entre 1 y 2000";
    }
    if (idRank==="0"){
        flag = false;
        $rankWarning.innerHTML = "Elige un rango porfavor";
    }

    if (!GameValidator.validateLevel(accountLevel)){
        flag = false;
        $levelWarning.innerHTML = "El nivel de cuenta es inválido, debe de estar entre 1 y 3000";
    }
    return flag;
}
function goLogin(){
    alert("Error al conectar con el servidor.");
    sessionStorage.clear();
    location.href = "../index.html";
}

function cleanFields(){
    $rolWarning.innerHTML = "";
    $nicknameWarning.innerHTML = "";
    $levelWarning .innerHTML = "";
    $rankWarning.innerHTML = "";
    $hoursWarning.innerHTML = "";
    $warning.innerHTML = "";
}

populatePersonageCombo();

$btnAddGame.addEventListener("click", (event) => {
    event.preventDefault();
    let email = sessionStorage.getItem("email");
    let nickname = $tfNickName.value;
    nickname = nickname.replace(/ /g, "");
    let accountLevel = $tfLevel.value;
    let personage = $cbCharacter.value;
    let idRank = $cbRank.value;
    let hoursPlayed = $tfHours.value;
    let note = $tfNote.value;
    let rol = $cbRol.value;

    if (verifyInfo(nickname, accountLevel, personage, hoursPlayed, rol, idRank)) {
        let apexData = {
            accountLevel: accountLevel,
            game: "ApexLegends",
            hoursPlayed: hoursPlayed,
            note: note,
            personage: personage,
            email: email,
            id_rank: idRank,
            rol: rol,
            nickname: nickname
        }
        let sendOptions = {
            method: "POST",
            body: JSON.stringify(apexData),
            headers: {
                "Content-Type": "application/json",
                "token": sessionStorage.getItem("token")
            }
        }
        fetch(Configuration.getURL() + "player/game", sendOptions).then(response => {
            if (response.ok) {
                location.href = "../view/ViewProfile.html";
            }else if (response.status === 409){
                $warning.innerHTML = "Ya has registrado Apex previamente, por favor, intenta con otro juego";
            }else if (response.status === 400) {
                $warning.innerHTML = "Campos inválidos, valida la información";
            }else{
                goLogin();
            }
        }).catch(error => goLogin());
    }
})







