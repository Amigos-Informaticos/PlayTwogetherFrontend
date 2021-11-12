let $tfNickName = document.getElementById("tfNickname");
let $tfLevel = document.getElementById("tfLevel");
let $cbAgent = document.getElementById("cbAgent");
let $cbRank = document.getElementById("cbRank");
let $tfHours = document.getElementById("tfHours");
let $warning = document.getElementById("warning");
let $btnAddGame = document.getElementById("btnAddGame");

$btnAddGame.addEventListener("click", (event) => {
    event.preventDefault();
    let email = sessionStorage.getItem('email');
    let nickname = $tfNickName.value;
    let level = $tfLevel.value;
    let agent = $cbAgent.value;
    let rank = $cbRank.value;
    let hours = $tfHours.value;

    let valorantData = {
        gameName: "valorant",
        email: email,
        nickname: nickname,
        level: level,
        agent: agent,
        rank: rank,
        hoursPlayed: hours
    }
    let sendOptions = {
        method: "POST",
        body: JSON.stringify(valorantData),
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token')
        }
    }
    fetch("http://127.0.0.1:5000/player/" + "game", sendOptions).then(response => {
        if (response.ok) {
            location.href = './view/ViewProfile.html';
        }
    })
})