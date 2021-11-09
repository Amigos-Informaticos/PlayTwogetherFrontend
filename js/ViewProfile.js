let $lblNickname = document.getElementById("lblNickname");
let $lblAge = document.getElementById("lblAge");
let $lblGender = document.getElementById("lblGender");
let $btnEdit = document.getElementById("btnEdit");
let $btnReport = document.getElementById("btnReport");
let $btnVerify = document.getElementById("btnVerify");
let $btnBan = document.getElementById("btnBan");
let $btnAddGame = document.getElementById("btnAddGame");

let profileToShow = sessionStorage.getItem('viewProfile');
let nickname;
let birthday;
let gender;

if (profileToShow === "MyProfile"){
    nickname = sessionStorage.getItem('nickname');
    gender = sessionStorage.getItem('gender');
    birthday = sessionStorage.getItem('birthday');

    console.log("Cumple:"+birthday);

    $btnReport.remove();
    $btnVerify.remove();
    $btnBan.remove();

}else{
    let playerInformation = {
        nickname: profileToShow
    }
    let sendOptions = {
        method: "GET",
        body: JSON.stringify(playerInformation),
        headers:{
            'Content-Type': 'application/json'
        }
    }
    fetch("http://127.0.0.1:5000/" + "login", sendOptions).then(response => {
        console.log(response);
        if (response.ok){
            response.json().then(responseJson => {
                console.log(responseJson);
                nickname = responseJson.nickname;
                gender = responseJson.gender;
                birthday = responseJson.birthday;
            })
        }
    })
    $btnEdit.remove();
}

let $btnValorant = document.getElementById("btnValorant");

console.log("MOD:" + sessionStorage.getItem('isModerator'));

$lblNickname.innerText = nickname;
$lblAge.innerText = getAge(birthday) + " años";
var playerGender = gender;
var ScreenGender;
if (playerGender == 'F'){
    ScreenGender = "Mujer";
}else if (playerGender == 'M'){
    ScreenGender = "Hombre";
}else {
    ScreenGender = "Compañere";
}
$lblGender.innerHTML = ScreenGender;

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

$btnEdit.addEventListener("click",(event) =>{
    event.preventDefault();
    location.href = '../view/UpdateProfile.html'
})

$btnValorant.addEventListener("click",(event) =>{
    event.preventDefault();
    location.href = '../view/Valorant.html'
})

$btnAddGame.addEventListener("click",(event) =>{
    event.preventDefault();
    location.href = '../view/AddValorant.html'
})


const response = [
    {
        id: 1,
        game: "lol",
        level: "160",
        rank: "Bronce"
    },
    {
        id: 1,
        game: "Valorant",
        level: "150",
        rank: "Inmortal"
    },
    {
        id: 1,
        game: "Valorant",
        level: "150",
        rank: "Diamante"
    },
    {
        id: 1,
        game: "Valorant",
        level: "150",
        rank: "Diamante"
    },
    {
        id: 1,
        game: "Valorant",
        level: "150",
        rank: "Diamante"
    },
    {
        id: 1,
        game: "Valorant",
        level: "150",
        rank: "Diamante"
    }
]
let $template = document.getElementById("template-box").content;
response.forEach((persona) => {
    $template.querySelector(".card-level").textContent = "LVL:" + persona.level;
    $template.querySelector(".card-game").src = "../img/"+ persona.game +"/" + persona.game + "_logo.png";
    $template.querySelector(".card-rank").src = "../img/"+ persona.game +"/rank/" + persona.rank + ".png";

    let $clone = document.importNode($template, true);
    let $fragment = document.getElementById("game-container");
    $fragment.appendChild($clone);
});