import {Configuration} from "./Configuration.js";
import {ApiError} from "./ApiError.js";

let $lblNickname = document.getElementById("lblNickname");
let $lblLevel = document.getElementById("lblLevel");
let $lblRank = document.getElementById("lblRank");
let $lblCharacter = document.getElementById("lblCharacter");
let $imgCharacter = document.getElementById("imgCharacter");
let $imgRank = document.getElementById("imgRank");
let $pNote = document.getElementById("pNote");

let ownerGame = sessionStorage.getItem("viewProfile");

let sendOptions = {
    method: "GET"
}

let url = Configuration.getURL();
fetch(url + "players/" + ownerGame + "/" + "valorant", sendOptions).then(response => {
    if (response.ok) {
        response.json().then(responseJson => {
            $lblNickname.innerText = responseJson.nickname;
            $lblLevel.innerText = "Nivel: " + responseJson.accountLevel;
            $lblRank.innerText = responseJson.rank;
            $imgRank.src = "../img/Valorant/rank/" + responseJson.rank + ".png";
            $lblCharacter.innerText = responseJson.personage;
            $imgCharacter.src = "../img/Valorant/agents/" + responseJson.personage + ".png";
            $pNote.innerText = responseJson.note;
        })
    }else if(response.status === 500){
        ApiError.goLogin();
    }
}).catch(error => ApiError.goLogin());