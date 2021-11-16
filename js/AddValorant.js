let $tfNickName = document.getElementById("tfNickname");
let $tfLevel = document.getElementById("tfLevel");
let $cbAgent = document.getElementById("cbAgent");
let $cbRank = document.getElementById("cbRank");
let $tfHours = document.getElementById("tfHours");
let $tfNote = document.getElementsByName("tfNote");
let $warning = document.getElementById("warning");
let $btnAddGame = document.getElementById("btnAddGame");

$btnAddGame.addEventListener("click", (event) => {
    event.preventDefault();
    let email = sessionStorage.getItem('email');
    let nickname = $tfNickName.value;
    let accountLevel = $tfLevel.value;
    let personage = $cbAgent.value;
    let id_rank = $cbRank.value;
    let hoursPlayed = $tfHours.value;
    let note = $tfNote.value;

    let valorantData = {
        game: "valorant",
        email: email,
        nickname: nickname,
        accountLevel: accountLevel,
        personage: personage,
        id_rank: id_rank,
        hoursPlayed: hoursPlayed,
        rol: 10,
        note: note
    }
    let sendOptions = {
        method: "POST",
        body: JSON.stringify(valorantData),
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token')
        }
    }
    fetch("http://127.0.0.1:5000/player/game", sendOptions).then(response => {
        if (response.ok) {
            location.href = './view/ViewProfile.html';
        }
    })
})