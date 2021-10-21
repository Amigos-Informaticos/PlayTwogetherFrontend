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

    if (validateFields(playerEmail, playerPassword, playerRepeatPassword)) {
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
        console.log(sendOptions.body);
        fetch("http://127.0.0.1:5000/" + "players", sendOptions).then(response => {
            console.log(response)
            if (response.ok) {
                location.href = '../index.html';
            }
        })

    }
})

function validateFields(email, password, repeatPassword) {
    let flag = true;
    if (!validateEmail(email)) {
        flag = false;
        $pWarning.innerHTML = "* La dirección de correo no es válida"
    }
    let validatedPassword = validatePassword(password, repeatPassword);
    if (validatedPassword == "dontMatch") {
        flag = false;
        $pWarning.innerHTML = "* Las contraseñas no coinciden"
    }else if (validatedPassword == "weakPassword"){
        flag = false;
        $pWarning.innerHTML = "* La contraseña debe contener al menos una mayúscula y un número"
    }
    return flag;
}

function validateEmail(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}

function validatePassword(password, repeatPassword) {
    let response;
    if (password != repeatPassword) {
        response = "dontMatch";
    } else if (!validateStrongPassword(password)){
        response = "weakPassword";
    }
    return response;
}

function validateStrongPassword() {
    return /[A-Z]/.test(pw) &&
        /[a-z]/.test(pw) &&
        /[0-9]/.test(pw);
}