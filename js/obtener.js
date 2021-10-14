let $btnRegistrarse = document.getElementById("btnSignUp");
let $tfEmail = document.getElementById("tfEmail");
let $tfNickname = document.getElementById("tfNickname");
let $tfContrasenia = document.getElementById("tfPassword");
let $tfRepetirContrasenia = document.getElementById("tfRepeatPassword");
let $cbSex = document.getElementById("cbSex");
let $dpBirthday = document.getElementById("dpBirthday");
let $pWarning = document.getElementById("warning");


$btnRegistrarse.addEventListener("click", (event)=> {
    event.preventDefault();
    let contrasenia;
    if ($tfContrasenia.value == $tfRepetirContrasenia.value){
        contrasenia = $tfContrasenia.value;
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
            console.log(respuestaSolicitud)
            respuestaSolicitud.json().then(respuestaJson => {
                let $tiulo = document.getElementById("title").innerHTML = respuestaJson;
            })
        })

    }else{
        $pWarning.innerHTML = "* Las contraseñas no coinciden"
    }
})

