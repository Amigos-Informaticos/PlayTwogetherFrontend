let $lblNickname = document.getElementById("lblNickname");
let $lblLevel = document.getElementById("lblLevel");
let $lblRank = document.getElementById("lblRank");
let $lblCharacter = document.getElementById("lblCharacter");
let $imgCharacter = document.getElementById("imgCharacter");
let $imgRank = document.getElementById("imgRank");

let getGameformation = {
    email: sessionStorage.getItem("email"),
    game: "Valorant"
}
let sendOptions = {
    method: "GET",
    body: JSON.stringify(getGameformation),
    headers: {
        'Content-Type': 'application/json'
    }
}
fetch("http://127.0.0.1:5000/player/" + "game", sendOptions).then(response => {
    console.log(response);
    if (response.ok) {
        response.json().then(responseJson => {
            console.log(responseJson);
            $lblNickname.innerText = responseJson.nickname;
            $lblLevel.innerText = responseJson.level;
            $lblRank.innerText = responseJson.rank;
            $imgRank.src = "../img/Valorant/rank/" + responseJson.rank + ".png";
            $lblCharacter.innerText = responseJson.personage;
            $imgCharacter.src = "../img/Valorant/agents/" + responseJson.personage + ".png";
        })
    }
})