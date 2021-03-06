import {Configuration} from "./Configuration.js";
import {ApiError} from "./ApiError.js";

let $lblNickname = document.getElementById("lblNickname");
let $lblAge = document.getElementById("lblAge");
let $lblGender = document.getElementById("lblGender");
let $btnEdit = document.getElementById("btnEdit");
let $btnReport = document.getElementById("btnReport");
let $btnVerify = document.getElementById("btnVerify");
let $btnBan = document.getElementById("btnBan");
let $btnAddGame = document.getElementById("btnAddGame");

let $btnConfirmVerify = document.getElementById("btnConfirmVerify");
let $btnConfirmBan = document.getElementById("btnConfirmBan");
let $verified = document.getElementById("verified");

let $rdReportReason = document.getElementsByName("report-radio");
let $tfReport = document.getElementById("tfReport");
let $btnConfirmReport = document.getElementById("btnConfirmReport");
let $reportWarning = document.getElementById("report-warning");

let $imgProfile = document.getElementById("profile-pic");

let profileToShow = sessionStorage.getItem("viewProfile");
let nickname;
let birthday;
let gender;
let isVerified;
let isModerator = sessionStorage.getItem("isModerator");
let getGames = false;

getProfileImage();
configureWindow();
showPlayedGames(profileToShow);

function force(){
    if(!getGames){
        showPlayedGames();
    }
}

function configureWindow(){
    if (profileToShow === sessionStorage.getItem("nickname")) {
        nickname = sessionStorage.getItem("nickname");
        gender = sessionStorage.getItem("gender");
        birthday = sessionStorage.getItem("birthday");
        showInfo(nickname, birthday, gender, 0);

        $btnReport.remove();
        $btnVerify.remove();
        $btnBan.remove();

    } else {
        let sendOptions = {
            method: "GET",
        };
        fetch(Configuration.getURL() + "players/" + profileToShow, sendOptions).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    gender = responseJson.gender;
                    birthday = responseJson.birthday;
                    isVerified = responseJson.isVerified;
                    showInfo(profileToShow, birthday, gender, isVerified);
                });
            }else if(response.status === 500){
                ApiError.goLogin();
            }
        }).catch(error => ApiError.goLogin());
        $btnAddGame.remove();
        $btnEdit.remove();
        $btnAddGame.remove();
        if (isModerator != 1) {
            $btnVerify.remove();
            $btnBan.remove();
        }
    }
}

function getProfileImage(){
    let hasImage = false;
    let sendOptions = {
        method: "GET",
    }
    fetch(Configuration.getURL() + "players/" + profileToShow + "/has_image", sendOptions).then(response => {
        if (response.ok) {
           $imgProfile.src = Configuration.getURL() +"players/" + profileToShow + "/image";
        }
    }).catch(error => $imgProfile.src = "../img/default_picture.jpg" );
    return hasImage;
}


function showInfo(nickname, birthday, gender, isVerified) {
    $lblNickname.innerText = nickname;
    $lblAge.innerText = getAge(birthday) + " a??os";
    var playerGender = gender;
    var ScreenGender;
    if (playerGender == "F") {
        ScreenGender = "Mujer";
    } else if (playerGender == "M") {
        ScreenGender = "Hombre";
    } else {
        ScreenGender = "Compa??ere";
    }
    $lblGender.innerHTML = ScreenGender;

    if (isVerified != 1) {
        $verified.remove();
    }
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

$btnEdit.addEventListener("click", (event) => {
    event.preventDefault();
    location.href = "../view/UpdateProfile.html";
})

$btnConfirmReport.addEventListener("click", (event) => {
    event.preventDefault();
    let reason;
    let comment;
    reason = getReportReason();
    comment = $tfReport.value;

    let reportInformation = {
        informer: sessionStorage.getItem("nickname"),
        informed: profileToShow,
        reason: reason,
        comment: comment,
        email: sessionStorage.getItem("email")
    }
    let sendOptions = {
        method: "POST",
        body: JSON.stringify(reportInformation),
        headers: {
            "Content-Type": "application/json",
            "token": sessionStorage.getItem("token")
        }
    }
    fetch(Configuration.getURL() + "player/report", sendOptions).then(response => {
        if (response.ok) {
            location.href = "../view/Welcome.html";
        }else if (response.status == 409){
            $reportWarning.innerText = "Ya reportaste a este jugador anteriormente";
        }else if(response.status === 500){
            ApiError.goLogin();
        }
    }).catch(error => ApiError.goLogin());
})

function getReportReason(){
    let selectedReason;
    for(var i = 0; i < $rdReportReason.length; i++) {
        if($rdReportReason[i].checked)
            selectedReason = $rdReportReason[i].value;
    }
    return selectedReason;
}

$btnConfirmVerify.addEventListener("click", (event) => {
    event.preventDefault();
    let sendOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "token": sessionStorage.getItem("token")
        }
    }
    fetch(Configuration.getURL() + "players/" + profileToShow + "/verify", sendOptions).then(response => {
        if (response.ok) {
            location.href = "../view/Welcome.html";
        }else if(response.status === 500){
            ApiError.goLogin();
        }
    }).catch(error => ApiError.goLogin());
})

$btnConfirmBan.addEventListener("click", (event) => {
    event.preventDefault();
    let sendOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "token": sessionStorage.getItem("token")
        }
    }
    fetch(Configuration.getURL() + "players/" + profileToShow + "/ban", sendOptions).then(response => {
        if (response.ok) {
            location.href = "../view/Welcome.html";
        }else if(response.status === 500){
            ApiError.goLogin();
        }
    }).catch(error => ApiError.goLogin());
})


$btnAddGame.addEventListener("click", (event) => {
    event.preventDefault();
    location.href = "../view/games.html";
})

$btnBan.addEventListener("click", (event) => {
    event.preventDefault();
    getReports();
})

function getReports(){
    let sendOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "token": sessionStorage.getItem("token")
        }
    }
    var element = document.getElementById("report-list");
    if (!element.firstChild){
        fetch(Configuration.getURL() + "players/" + profileToShow + "/reports", sendOptions).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    responseJson.forEach((report) => {
                        var reportItem = document.createElement("p");
                        var reportReason = document.createTextNode(report.reason + ": ");
                        reportItem.appendChild(reportReason);
                        var reportComment = document.createTextNode(report.comment);
                        reportItem.appendChild(reportComment);
                        element.appendChild(reportItem);
                    });
                })
            }else if(response.status === 500){
                ApiError.goLogin();
            }
        }).catch(error => ApiError.goLogin());
    }
}

function showPlayedGames(nickname) {
    getGames = true;
    let sendOptions = {
        method: "GET",
    }
    fetch(Configuration.getURL() + "players/" + nickname + "/games", sendOptions).then(response => {
        if (response.ok) {
            response.json().then(responseJson => {
                let $template = document.getElementById("template-box").content;
                responseJson.forEach((playedGame) => {
                    $template.querySelector(".card-level").textContent = "LVL:" + playedGame.accountLevel;
                    $template.querySelector(".card-game").src = "../img/" + playedGame.name + "/" + playedGame.name + "_logo.png";
                    $template.querySelector(".card-rank").src = "../img/" + playedGame.name + "/rank/" + playedGame.rank + ".png";
                    $template.querySelectorAll(".box *").forEach((element) => {
                        element.dataset.name_game = playedGame.name;
                    })
                    let $clone = document.importNode($template, true);
                    let $fragment = document.getElementById("game-container");
                    $fragment.appendChild($clone);
                });
            })
        }else if(response.status === 500){
            ApiError.goLogin();
        }
    }).catch(error => ApiError.goLogin());
}

document.addEventListener("click", (event) => {
    if (event.target.matches(".box *")) {
        location.href = `../view/${event.target.dataset.name_game}.html`;
    }
});