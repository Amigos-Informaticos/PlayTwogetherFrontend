import {Player} from "./Player.js";

let page = 0;
showPlayers();

function showPlayers() {
    let $template = document.getElementById("template-players").content;
    let linkForSearch = sessionStorage.getItem("linkForSearch");
    let sendOptions = {
        method: "GET",
    }
    fetch(linkForSearch + page, sendOptions).then(response => {
        if (response.ok) {
            response.json().then(playersJson => {
                playersJson.forEach((player) => {
                    $template.querySelector(".card-nickname").textContent = player.nickname;
                    $template.querySelector(".card-age").textContent = Player.getAge(player.birthday) + " años";
                    $template.querySelector(".verified-icon").style.display = "block";
                    if (!player.isVerified) {
                        $template.querySelector(".verified-icon").style.display = "none";
                    }

                    $template.querySelectorAll(".box *").forEach((element) => {
                        element.dataset.nickname_player = player.nickname;
                    })

                    let $clone = document.importNode($template, true);
                    let $fragment = document.getElementById("players-container");
                    $fragment.appendChild($clone);
                })
            });
        }
    })
}


/*
const response = [
    {
        nickname: "EfraYork",
        isVerified: 1,
        birthday: "1999-10-21"
    },
    {
        nickname: "Yira98",
        isVerified: 1,
        birthday: "1998-10-21"
    },
    {
        nickname: "EfraYork",
        isVerified: 1,
        birthday: "1999-10-21"
    }
]

 */




document.addEventListener("click", (event) => {
    if (event.target.matches(".box *")) {
        console.log(event.target);
        sessionStorage.setItem('viewProfile', event.target.dataset.nickname_player);
        location.href = `../view/ViewProfile.html`;
    }
});