import {Configuration} from "./Configuration.js";
import {Player} from "./Player.js";

let $tfEmail = document.getElementById("tfEmailLogin");
let $tfPassword = document.getElementById("tfPasswordLogin");
let $btnLogin = document.getElementById("btnLogin");
let $lbWarning = document.getElementById("warning");

function validateFields(email, password) {
    let flag = true;
    if (!Player.validateEmail(email)) {
        $lbWarning.innerText = "Por favor, ingrese un email válido";
        flag = false;
    }


    if (!password || !Player.validateStrongPassword(password)) {
        $lbWarning.innerText = "Por favor, ingrese una contraseña válida";
        flag = false;
    }
    return flag;
}

$btnLogin.addEventListener("click", (event) => {
    event.preventDefault();
    let email = $tfEmail.value;
    let password = $tfPassword.value;
    if (validateFields(email, password)){
        let loginInformation = {
            email: $tfEmail.value,
            password: $tfPassword.value
        };
        let sendOptions = {
            method: "POST",
            body: JSON.stringify(loginInformation),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*"
            }
        };
        let url = Configuration.getURL();
        fetch(url + "login", sendOptions).then(response => {

            if (response.ok) {
                response.json().then(responseJson => {
                    sessionStorage.setItem("token", responseJson.token);
                    sessionStorage.setItem("nickname", responseJson.nickname);
                    sessionStorage.setItem("birthday", responseJson.birthday);
                    sessionStorage.setItem("gender", responseJson.gender);
                    sessionStorage.setItem("email", loginInformation.email);
                    sessionStorage.setItem("currentPassword", loginInformation.password);
                    sessionStorage.setItem("isModerator", responseJson.isModerator);
                    sessionStorage.setItem("schedule", responseJson.schedule);
                    location.href = "view/Welcome.html";
                });
            }else if (response.status === 404){
                $lbWarning.innerHTML = "No se ha encontrado un usuario y contraseña que coincidan";
            } else {
                $lbWarning.innerHTML = "Servidor en mantenimiento, por favor, ingrese más tarde";
            }
        }).catch(error => alert("No fue posible conectar con el servidor"));

    }


})