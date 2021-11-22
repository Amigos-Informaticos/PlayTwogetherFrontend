import {GameValidator} from "./GameValidator.js";
import {Configuration} from "./Configuration.js";

let $tfNickName = document.getElementById("tfNickname");
let $tfLevel = document.getElementById("tfLevel");
let $cbAgent = document.getElementById("cbAgent");
let $cbRank = document.getElementById("cbRank");
let $tfHours = document.getElementById("tfHours");
let $tfNote = document.getElementById("tfNote");
let $warning = document.getElementById("warning");
let $btnAddGame = document.getElementById("btnAddGame");
let $characterWarning = document.getElementById("character-warning");

$btnAddGame.addEventListener("click", (event) => {
    event.preventDefault();
    let email = sessionStorage.getItem('email');
    let nickname = $tfNickName.value;
    let accountLevel = $tfLevel.value;
    let personage = $cbAgent.value;
    let idRank = $cbRank.value;
    let hoursPlayed = $tfHours.value;
    let note = $tfNote.value;
    let rol = 10;

    if (verifyInfo(nickname, accountLevel, personage, hoursPlayed, rol)) {
        let valorantData = {
            accountLevel: accountLevel,
            game: "valorant",
            hoursPlayed: hoursPlayed,
            note: note,
            personage: personage,
            email: email,
            id_rank: idRank,
            rol: 10,
            nickname: nickname
        }
        let sendOptions = {
            method: "POST",
            body: JSON.stringify(valorantData),
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            }
        }
        fetch(Configuration.getURL() + "player/game", sendOptions).then(response => {
            if (response.ok) {
                location.href = './view/ViewProfile.html';
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
    return flag;
}