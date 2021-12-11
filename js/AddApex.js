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

populatePersonageCombo();

$btnAddGame.addEventListener("click", (event) => {
    event.preventDefault();
    let email = sessionStorage.getItem("email");
    let nickname = $tfNickName.value;
    let accountLevel = $tfLevel.value;
    let personage = $cbCharacter.value;
    let idRank = $cbRank.value;
    let hoursPlayed = $tfHours.value;
    let note = $tfNote.value;
    let rol = $cbRol.value;

    if (verifyInfo(nickname, accountLevel, personage, hoursPlayed, rol)) {
        let apexData = {
            accountLevel: accountLevel,
            game: "apexLegends",
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
            }
        })
    }
})

function verifyInfo(nickname, accountLevel, personage, hourPlayed, rol) {
    let flag = true;
    if (GameValidator.uncompleteGameInfo(nickname, accountLevel, personage, hourPlayed, rol)) {
        flag = false;
        $warning.innerText = "Llena correctamente todos los campos obligatorios (*)";
    }
    if (!GameValidator.validatePersonage(personage)) {
        flag = false;
        $characterWarning.innerText = "Selecciona un agente";
    }
    if (!GameValidator.validateRol(rol)){
        flag = false;
        $rolWarning.innerText = "Selecciona un rol";
    }
    return flag;
}

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