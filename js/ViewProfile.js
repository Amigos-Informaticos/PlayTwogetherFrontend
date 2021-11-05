let $lblNickname = document.getElementById("lblNickname");
let $lblAge = document.getElementById("lblAge");
let $lblGender = document.getElementById("lblGender");
let $btnEdit = document.getElementById("btnEdit");
let $btnAddGame = document.getElementById("btnAddGame");

let $btnValorant = document.getElementById("btnValorant");

$lblNickname.innerText = sessionStorage.getItem('nickname');
$lblAge.setText = getAge(sessionStorage.getItem('birthday'));
var playerGender = sessionStorage.getItem('gender');
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