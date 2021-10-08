let $btnRegistrarse = document.getElementById("btnSignUp");
let $tfEmail = document.getElementById("tfEmail");
let $tfNickname = document.getElementById("tfNickname");
let $tfContrasenia = document.getElementById("tfPassword");
let $tfRepetirContrasenia = document.getElementById("tfRepeatPassword");
let $cbSex = document.getElementById("cbSex");
let $dpBirthday = document.getElementById("dpBirthday");


$btnRegistrarse.addEventListener("click", ()=> {
    let contrasenia;
    if ($tfContrasenia.value == $tfRepetirContrasenia.value){
        contrasenia = $tfContrasenia.value;
    }else{
        contrasenia = null
    }

    let nuevoPlayer = {
        email: $tfEmail.value,
        nickname: $tfNickname.value,
        password: contrasenia,
        gender: $cbSex.value,
        birthday: $dpBirthday.value
    }

    let opcionesEnvio = {
        method: "POST",
        body: JSON.stringify(nuevoPlayer),
        headers:{
            'Content-Type': 'application/json'
        }
    }

    console.log(opcionesEnvio.body);


    fetch("http://127.0.0.1:5000/" + "players", opcionesEnvio).then(respuestaSolicitud => {
        console.log(opcionesEnvio.body);
        respuestaSolicitud.json().then(respuestaJson => {
            let $tiulo = document.getElementById("title").innerHTML = respuestaJson;
        })
    })
})

