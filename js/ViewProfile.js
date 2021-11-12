let $lblNickname = document.getElementById("lblNickname");
let $lblAge = document.getElementById("lblAge");
let $lblGender = document.getElementById("lblGender");
let $btnEdit = document.getElementById("btnEdit");
let $btnReport = document.getElementById("btnReport");
let $btnVerify = document.getElementById("btnVerify");
let $btnBan = document.getElementById("btnBan");
let $btnAddGame = document.getElementById("btnAddGame");
let $btnConfirmReport = document.getElementById("btnConfirmReport");
let $btnConfirmVerify = document.getElementById("btnConfirmVerify");
let $btnConfirmBan = document.getElementById("btnConfirmBan");
let $verified = document.getElementById("verified");

let profileToShow = sessionStorage.getItem('viewProfile');
let nickname;
let birthday;
let gender;
let isVerified;
let isModerator = sessionStorage.getItem('isModerator');

if (profileToShow === "MyProfile") {
    nickname = sessionStorage.getItem('nickname');
    gender = sessionStorage.getItem('gender');
    birthday = sessionStorage.getItem('birthday');
    showInfo(nickname, birthday, gender, 0);

    $btnReport.remove();
    $btnVerify.remove();
    $btnBan.remove();

} else {
    let sendOptions = {
        method: "GET",
    }
    fetch("http://127.0.0.1:5000/players/" + profileToShow, sendOptions).then(response => {
        console.log(response);
        if (response.ok) {
            response.json().then(responseJson => {
                gender = responseJson.gender;
                birthday = responseJson.birthday;
                isVerified = responseJson.isVerified;
                showInfo(profileToShow, birthday, gender, isVerified);
            })
        }
    })
    $btnAddGame.remove();
    $btnEdit.remove();
    console.log("MOD: " + isModerator);
    if (isModerator != 1) {
        console.log("NO ADMIN");
        $btnVerify.remove();
        $btnBan.remove();
    }
}

console.log("Genero " + gender);
console.log("Fecha " + birthday);

function showInfo(nickname, birthday, gender, isVerified) {
    $lblNickname.innerText = nickname;
    $lblAge.innerText = getAge(birthday) + " años";
    var playerGender = gender;
    var ScreenGender;
    if (playerGender == 'F') {
        ScreenGender = "Mujer";
    } else if (playerGender == 'M') {
        ScreenGender = "Hombre";
    } else {
        ScreenGender = "Compañere";
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
    location.href = '../view/UpdateProfile.html'
})

$btnConfirmReport.addEventListener("click", (event) => {
    event.preventDefault();
    let reportInformation = {
        email: $tfEmail.value,
        password: $tfPassword.value
    }
    let sendOptions = {
        method: "POST",
        body: JSON.stringify(reportInformation),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch("http://127.0.0.1:5000/" + "login", sendOptions).then(response => {
        console.log(response);
        if (response.ok) {
            response.json().then(responseJson => {
                console.log(responseJson);
                location.href = '../view/Welcome.html';
            })
        }
    })
})

$btnConfirmVerify.addEventListener("click", (event) => {
    event.preventDefault();
    let sendOptions = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token')
        }
    }
    fetch("http://127.0.0.1:5000/players/" + profileToShow + "/verify", sendOptions).then(response => {
        console.log(response);
        if (response.ok) {
            location.href = '../view/Welcome.html';
        }
    })
})

$btnConfirmBan.addEventListener("click", (event) => {
    event.preventDefault();
    let sendOptions = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token')
        }
    }
    fetch("http://127.0.0.1:5000/players/" + profileToShow + "/ban", sendOptions).then(response => {
        console.log(response);
        if (response.ok) {
            location.href = '../view/Welcome.html';
        }
    })
})


$btnAddGame.addEventListener("click", (event) => {
    event.preventDefault();
    location.href = '../view/AddValorant.html'
})


const response = [
    {
        id: 1,
        game: "Valorant",
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
    $template.querySelector(".card-game").src = "../img/" + persona.game + "/" + persona.game + "_logo.png";
    $template.querySelector(".card-rank").src = "../img/" + persona.game + "/rank/" + persona.rank + ".png";

    let $clone = document.importNode($template, true);
    let $fragment = document.getElementById("game-container");
    $fragment.appendChild($clone);
});