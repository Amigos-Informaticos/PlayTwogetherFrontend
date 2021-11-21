import {Configuration} from "./Configuration.js";
let $tfNickname = document.getElementById("tfNickname");
let $cbSchedule = document.getElementById("cbSchedule");
let $cbGames = document.getElementById("cbGames");
let $cbGender = document.getElementById("cbGender");
let $tfAge = document.getElementById("tfAge");
let $btnGeneralSearch = document.getElementById("btnGeneralSearch");
let $btnSearchByNickname = document.getElementById("btnSearchByNickname");



$btnSearchByNickname.addEventListener("click", (event) => {
    event.preventDefault();
    let nickname = $tfNickname.value;
    let link = Configuration.getURL() + "/players?nickname=" + nickname + "&info_page=";
    sessionStorage.setItem("linkForSearch", link);
    location.href = `../view/playerList.html`;
})

$btnGeneralSearch.addEventListener("click", (event) => {
    event.preventDefault();
    let schedule = $cbSchedule.value;
    let game = $cbGames.value;
    let gender = $cbGender.value;
    let age = $tfAge.value;

    let link = createLink(schedule, game, gender, age);
    sessionStorage.setItem("linkForSearch", link);
    location.href = `../view/playerList.html`;
})

function createLink(schedule, game, gender, age){
    let isFirstAttribute = true;
    let link = "http://127.0.0.1:5000/players?";
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
            link = link + "age=" + age;
        }else{
            link = link + "&age=" + age;
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

