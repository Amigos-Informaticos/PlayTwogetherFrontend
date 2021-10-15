let $btnRegistrarse = document.getElementById("btnSignUp");
let $tfNickname = document.getElementById("tfNickname");
let $tfContrasenia = document.getElementById("tfPassword");
let $tfRepetirContrasenia = document.getElementById("tfRepeatPassword");
let $cbSex = document.getElementById("cbSex");
let $dpBirthday = document.getElementById("dpBirthday");
let $pWarning = document.getElementById("warning");

$tfNickname.value = localStorage.getItem('nickname');
$cbSex.value = localStorage.getItem('gender');

