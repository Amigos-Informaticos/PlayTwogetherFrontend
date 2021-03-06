import {Configuration} from "./Configuration.js";
import {ApiError} from "./ApiError.js";

let $lblNickname = document.getElementById("lblNickname");
let $lblLevel = document.getElementById("lblLevel");
let $lblRank = document.getElementById("lblRank");
let $lblCharacter = document.getElementById("lblCharacter");
let $lblRol = document.getElementById("lblRol");
let $imgCharacter = document.getElementById("imgCharacter");
let $imgRank = document.getElementById("imgRank");
let $pNote = document.getElementById("pNote");

let $container = document.getElementById("game-info-container");

let ownerGame = sessionStorage.getItem("viewProfile");

let sendOptions = {
    method: "GET"
};

let url = Configuration.getURL();
fetch(url + "players/" + ownerGame + "/" + "apexLegends", sendOptions).then(response => {
    if (response.ok) {
        response.json().then(responseJson => {
            $lblCharacter.innerText = responseJson.personage;
            $container.style.backgroundImage = "url(../img/ApexLegends/characters/" + responseJson.personage + ".jpg)";
            $lblNickname.innerText = responseJson.nickname;
            $lblLevel.innerText = "Nivel: " + responseJson.accountLevel;
            $lblRank.innerText = responseJson.rank;
            $imgRank.src = "../img/ApexLegends/rank/" + responseJson.rank + ".png";
            $pNote.innerText = responseJson.note;
        });
    }else if(response.status === 500){
            ApiError.goLogin();
        }
    }).catch(error => ApiError.goLogin());