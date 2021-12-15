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

let ownerGame = sessionStorage.getItem("viewProfile");

let sendOptions = {
    method: "GET"
}

let url = Configuration.getURL();
fetch(url + "players/" + ownerGame + "/" + "lol", sendOptions).then(response => {
    if (response.ok) {
        response.json().then(responseJson => {
            $lblCharacter.innerText = responseJson.personage;
            $imgCharacter.src = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + responseJson.personage + "_0.jpg";
            $lblRol.innerText = responseJson.rol;
            $lblNickname.innerText = responseJson.nickname;
            $lblLevel.innerText = "Nivel: " + responseJson.accountLevel;
            $lblRank.innerText = responseJson.rank;
            $imgRank.src = "../img/lol/rank/" + responseJson.rank + ".png";
            $pNote.innerText = responseJson.note;
        })
    }else if(response.status === 500){
        ApiError.goLogin();
    }
}).catch(error=> ApiError.goLogin());