let $btnSignUp = document.getElementById("btnSignUp");
let $tfEmail = document.getElementById("tfEmail");
let $tfNickname = document.getElementById("tfNickname");
let $tfPassword = document.getElementById("tfPassword");
let $tfRepeatPassword = document.getElementById("tfRepeatPassword");
let $cbGender = document.getElementById("cbSex");
let $dpBirthday = document.getElementById("dpBirthday");
let $pWarning = document.getElementById("warning");

$btnSignUp.addEventListener("click", (event) => {
    event.preventDefault();
    let playerEmail = $tfEmail.value;
    let playerNickname = $tfNickname.value;
    let playerPassword = $tfPassword.value;
    let playerRepeatPassword = $tfRepeatPassword.value;
    let playerGender = $cbGender.value;
    let playerBirthday = $dpBirthday.value;

    if (validateFields(playerNickname, playerEmail, playerPassword, playerRepeatPassword, playerBirthday)) {
        let newPlayer = {
            email: playerEmail,
            nickname: playerNickname,
            password: playerPassword,
            gender: playerGender,
            birthday: playerBirthday
        }
        let sendOptions = {
            method: "POST",
            body: JSON.stringify(newPlayer),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch("http://127.0.0.1:5000/" + "players", sendOptions).then(response => {
            if (response.ok) {
                location.href = '../index.html';
            }
        })

    }
})

function validateFields(nickname, email, password, repeatPassword, birthday) {
    let flag = true;
    if (!validateEmail(email)) {
        flag = false;
        $pWarning.innerHTML = "* La dirección de correo no es válida"
    }
    let validatedPassword = validatePassword(password, repeatPassword);
    if (validatedPassword === "dontMatch") {
        flag = false;
        $pWarning.innerHTML = "* Las contraseñas no coinciden"
    }else if (validatedPassword == "weakPassword"){
        flag = false;
        $pWarning.innerHTML = "* La contraseña debe contener al menos una mayúscula y un número"
    }
    if (!validateNickname(nickname)) {
        flag = false;
        $pWarning.innerHTML = "* El nickname debe tener al menos 4 caracteres y máximo 25"
    }
    if (nickname != "" && email != "" && password != "" && repeatPassword != "" && birthday != "")
    return flag;
}



function validateNickname(nickname){
    console.log(nickname.length);
    return nickname.length > 3 &&
        nickname.length < 26;
}

function validateEmail(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}

function validatePassword(password, repeatPassword) {
    let response = "ok";
    if (password.localeCompare(repeatPassword) != 0) {
        console.log("sos" + password);
        console.log("sas" + repeatPassword);
        response = "dontMatch";
    } else if (!validateStrongPassword(password)){
        response = "weakPassword";
    }
    return response;
}

function validateStrongPassword(password) {
    return /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        password.length > 7 &&
        password.length < 21;
}