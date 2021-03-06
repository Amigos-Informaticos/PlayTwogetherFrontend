import {Player} from "./Player.js";
import {Configuration} from "./Configuration.js";
import {ApiError} from "./ApiError.js";

let page = 0;
let searching = sessionStorage.getItem("searching");

showPlayers();

function showPlayers() {
    let $template = document.getElementById("template-players").content;
    let linkForSearch = sessionStorage.getItem("linkForSearch");
    let sendOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "token": sessionStorage.getItem("token")
        }
    };
    let $fragment = document.getElementById("players-container");
    if (!$fragment.firstChild){
        fetch(linkForSearch + page, sendOptions).then(response => {
            if (response.ok) {
                response.json().then(playersJson => {
                    playersJson.forEach((player) => {
                        $template.querySelector(".card-picture").src = Configuration.getURL() + "players/" + player.nickname + "/image";
                        $template.querySelector(".card-nickname").textContent = player.nickname;
                        if (searching === "reportedPlayers") {
                            $template.querySelector(".card-age").textContent = player.reports + " reportes";
                        } else {
                            $template.querySelector(".card-age").textContent = Player.getAge(player.birthday) + " años";
                        }
                        $template.querySelector(".verified-icon").style.display = "block";
                        if (!player.isVerified) {
                            $template.querySelector(".verified-icon").style.display = "none";
                        }

                        $template.querySelectorAll(".box *").forEach((element) => {
                            element.dataset.nickname_player = player.nickname;
                        });

                        let $clone = document.importNode($template, true);

                        $fragment.appendChild($clone);
                    })
                });
            }else if(response.status === 500){
                alert("No se encontraron resultados");
            }else if (response.status === 404){
                alert("No se encontraron resultados");
            }
        }).catch(error => ApiError.goLogin());
    }
}

document.addEventListener("click", (event) => {
    if (event.target.matches(".box *")) {
        sessionStorage.setItem("viewProfile", event.target.dataset.nickname_player);
        location.href = `../view/ViewProfile.html`;
    }
});