import {GameValidator} from "./GameValidator.js";
import {Configuration} from "./Configuration.js";
import {ApiError} from "./ApiError.js";

let $tfNickName = document.getElementById("tfNickname");
let $tfLevel = document.getElementById("tfLevel");
let $cbAgent = document.getElementById("cbAgent");
let $cbRank = document.getElementById("cbRank");
let $tfHours = document.getElementById("tfHours");
let $tfNote = document.getElementById("tfNote");
let $warning = document.getElementById("warning");
let $btnAddGame = document.getElementById("btnAddGame");
let $characterWarning = document.getElementById("character-warning");

let $nicknameWarning = document.getElementById("nickname-warning");
let $levelWarning = document.getElementById("level-warning");
let $rankWarning = document.getElementById("rank-warning");
let $hoursWarning = document.getElementById("hours-warning");
sessionStorage.setItem("viewProfile", sessionStorage.getItem("nickname"));

function populatePersonageCombo(){
    let sendOptions = {
        method: "GET"
    };
    fetch(Configuration.getURL() + "game/valorant/personages", sendOptions).then(response => {
        if (response.ok) {
            response.json().then(responseJson => {
                responseJson.forEach((personage) => {
                    var option = document.createElement("option");
                    option.value = personage.id;
                    option.innerHTML = personage.name;
                    $cbAgent.appendChild(option);
                });
            });
        }else if(response.status === 500){
            ApiError.goLogin();
        }
    }).catch(error => ApiError.goLogin());
}

populatePersonageCombo();

function cleanFields(){
    $nicknameWarning.innerHTML = "";
    $levelWarning .innerHTML = "";
    $rankWarning.innerHTML = "";
    $hoursWarning.innerHTML = "";
    $warning.innerHTML = "";
}
function goLogin(){
    alert("Error al conectar con el servidor.");
    sessionStorage.clear();
    location.href = "../index.html";
}
function verifyInfo(nickname, accountLevel, personage, hourPlayed, rol, idRank) {
    let flag = true;
    cleanFields();
    if (GameValidator.uncompleteGameInfo(nickname, accountLevel, personage, hourPlayed, rol)) {
        flag = false;
        $warning.innerText = "Llena correctamente todos los campos obligatorios (*)";
    }
    if (!GameValidator.validatePersonage(personage)) {
        flag = false;
        $characterWarning.innerText = "Selecciona un agente";
    }

    if (!GameValidator.validateHoursToPlay(hourPlayed)){
        flag = false;
        $hoursWarning.innerHTML = "Las horas totales no son v??lidas, deben estar entre 1 y 2000";
    }

    if (!GameValidator.validateLevel(accountLevel)){
        flag = false;
        $levelWarning.innerHTML = "El nivel de cuenta es inv??lido, debe de estar entre 1 y 3000";
    }

    if (idRank==="0"){
        flag = false;
        $rankWarning.innerHTML = "Elige un rango porfavor";
    }
    if(!GameValidator.validateNickname(nickname)){
        flag = false;
        $nicknameWarning.innerHTML = "Ingresa un nickname v??lido de entre 4 y  26 caracteres";
    }
    return flag;
}

$btnAddGame.addEventListener("click", (event) => {
    event.preventDefault();
    let email = sessionStorage.getItem("email");
    let nickname = $tfNickName.value;
    nickname = nickname.replace(/ /g, "");
    let accountLevel = $tfLevel.value;
    let personage = $cbAgent.value;
    let idRank = $cbRank.value;
    let hoursPlayed = $tfHours.value;
    let note = $tfNote.value;
    let rol = 10;

    if (verifyInfo(nickname, accountLevel, personage, hoursPlayed, rol, idRank)) {
        let valorantData = {
            accountLevel: accountLevel,
            game: "valorant",
            hoursPlayed: hoursPlayed,
            note: note,
            personage: personage,
            email: email,
            id_rank: idRank,
            rol: rol,
            nickname: nickname
        };
        let sendOptions = {
            method: "POST",
            body: JSON.stringify(valorantData),
            headers: {
                "Content-Type": "application/json",
                "token": sessionStorage.getItem("token")
            }
        };
        fetch(Configuration.getURL() + "player/game", sendOptions).then(response => {
            if (response.ok) {
                location.href = "../view/ViewProfile.html";
            }else if (response.status === 409){
                $warning.innerHTML = "Ya has registrado valorant previamente, por favor, intenta con otro juego";
            }else if (response.status === 400) {
                $warning.innerHTML = "Campos inv??lidos, valida la informaci??n";
            }else{
                ApiError.goLogin();
            }
        }).catch(error => ApiError.goLogin());
    }
})





