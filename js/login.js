import {Configuration} from "./Configuration.js";

let $tfEmail = document.getElementById("tfEmailLogin");
let $tfPassword = document.getElementById("tfPasswordLogin");
let $btnLogin = document.getElementById("btnLogin");

$btnLogin.addEventListener("click", (event) => {
    event.preventDefault();
    let loginInformation = {
        email: $tfEmail.value,
        password: $tfPassword.value
    }
    let sendOptions = {
        method: "POST",
        body: JSON.stringify(loginInformation),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let url = Configuration.getURL();
    fetch(url + "login", sendOptions).then(response => {

        if (response.ok) {
            response.json().then(responseJson => {
                console.log(responseJson);
                sessionStorage.setItem('token', responseJson.token);
                sessionStorage.setItem('nickname', responseJson.nickname);
                sessionStorage.setItem('birthday', responseJson.birthday);
                sessionStorage.setItem('gender', responseJson.gender);
                sessionStorage.setItem('email', loginInformation.email);
                sessionStorage.setItem('currentPassword', loginInformation.password);
                sessionStorage.setItem('isModerator', responseJson.isModerator);
                location.href = 'view/Welcome.html';
            })
        }
    })
})