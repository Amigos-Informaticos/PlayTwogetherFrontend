import {Configuration} from "./Configuration.js";
let $tfNickname = document.getElementById("tfNickname");
let $cbSchedule = document.getElementById("cbSchedule");
let $cbGames = document.getElementById("cbGames");
let $cbGender = document.getElementById("cbGender");
let $tfAge = document.getElementById("tfAge");
let $btnGeneralSearch = document.getElementById("btnGeneralSearch");
let $btnSearchByNickname = document.getElementById("btnSearchByNickname");
let $warningNickname = document.getElementById("warningNickname");
let $warningGeneral = document.getElementById("warningGeneralSearch");



$btnSearchByNickname.addEventListener("click", (event) => {
    event.preventDefault();
    $warningNickname.innerHTML = "";
    let nickname = $tfNickname.value;
    if (nickname.trim()!= ""){
        let link = Configuration.getURL() + "/players?nickname=" + nickname.replace(/ /g, "") + "&info_page=";
        sessionStorage.setItem("linkForSearch", link);
        sessionStorage.setItem("searching", "queriedPlayers");
        location.href = `../view/playerList.html`;
    }else{
        $warningNickname.innerHTML = "Escriba un nickname por favor";
    }

})

$btnGeneralSearch.addEventListener("click", (event) => {
    event.preventDefault();
    let schedule = $cbSchedule.value;
    let game = $cbGames.value;
    let gender = $cbGender.value;
    let age = $tfAge.value;

    if (age != "" && (age<12 || age > 99)){
        $warningGeneral.innerText = "Introduzca una edad entre los 12 y 99 años"
    }else{
        let link = createLink(schedule, game, gender, age);
        sessionStorage.setItem("linkForSearch", link);
        sessionStorage.setItem("searching", "queriedPlayers");
        location.href = `../view/playerList.html`;
    }
})

function createLink(schedule, game, gender, age){
    let isFirstAttribute = true;
    let link = Configuration.getURL() + "players?";
    if (schedule !== "ANY"){
        isFirstAttribute = false;
        link = link + "schedule=" + schedule;
    }
    if (game !== "ANY"){
        if (isFirstAttribute){
            isFirstAttribute = false;
            link = link + "game=" + game;
        }else{
            link = link + "&game=" + game;
        }
    }
    if (gender !== "ANY"){
        if (isFirstAttribute){
            isFirstAttribute = false;
            link = link + "gender=" + gender;
        }else{
            link = link + "&gender=" + gender;
        }
    }
    if (age){
        if (isFirstAttribute){
            isFirstAttribute = false;
            link = link + "min_age=" + age;
        }else{
            link = link + "&min_age=" + age;
        }
    }
    if (isFirstAttribute){
        isFirstAttribute = false;
        link = link + "info_page=";
    }else{
        link = link + "&info_page=";
    }
    return link;
}

