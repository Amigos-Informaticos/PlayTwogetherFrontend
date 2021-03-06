/**
 *
 * @param {hamburgerButton} hamburgerButton - Selector that toggle the section
 * @param {panel} panel - Selector to toggle
 * @param {panelOption} panelOption - Selector from the options in the panel
 */
import {Configuration} from "./Configuration.js";

export default function hamburgerMenu(hamburgerButton, panel, panelOption) {
    document.addEventListener("click", (event) => {
        const $target = event.target;
        if (
            $target.matches(hamburgerButton) ||
            $target.matches(`${hamburgerButton} *`)
        ) {
            togglePanel(panel);
            toggleHamburger(hamburgerButton);
        }

        if ($target.matches(panelOption)) {
            removePanel(panel, hamburgerButton);
        }
    });
}

const togglePanel = (panelSelector) => {
    document.querySelector(panelSelector).classList.toggle("is-active");
};

const toggleHamburger = (hamburgerButton) => {
    document.querySelector(hamburgerButton).classList.toggle("is-active");
};

const removePanel = (panel, hamburgerButton) => {
    document.querySelector(panel).classList.remove("is-active");
    document.querySelector(hamburgerButton).classList.remove("is-active");
};

document.addEventListener("DOMContentLoaded", () => {
    hamburgerMenu(".hamburger-button", ".panel", ".panel-options");
});

let $hbSearch = document.getElementById("hbSearch");
let $hbMyProfile = document.getElementById("hbMyProfile");
let $hbGames = document.getElementById("hbGames");
let $hbReportedPlayers = document.getElementById("hbReportedPlayers");

$hbSearch.addEventListener("click",(event) =>{
    event.preventDefault();
    location.href = "../view/search.html";
});

$hbMyProfile.addEventListener("click",(event) =>{
    event.preventDefault();
    sessionStorage.setItem("viewProfile", sessionStorage.getItem("nickname"));
    location.href = "../view/ViewProfile.html";
});

$hbMyProfile.addEventListener("click",(event) =>{
    event.preventDefault();
    sessionStorage.setItem("viewProfile", sessionStorage.getItem("nickname"));
    location.href = "../view/ViewProfile.html";
});

$hbReportedPlayers.addEventListener("click",(event) =>{
    event.preventDefault();
    sessionStorage.setItem("linkForSearch", Configuration.getURL() + "report/players/");
    sessionStorage.setItem("searching", "reportedPlayers");
    location.href = "../view/playerList.html";
});

let isModerator = sessionStorage.getItem("isModerator");
if (isModerator != 1) {
    $hbReportedPlayers.remove();
}