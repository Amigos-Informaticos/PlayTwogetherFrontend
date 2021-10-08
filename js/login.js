let $tfEmail = document.getElementById("tfEmailLogin");
let $tfPassword = document.getElementById("tfPasswordLogin");
let $btnLogin = document.getElementById("btnLogin");

$btnLogin.addEventListener("click", ()=> {
    let Password;
    if ($tfPassword.value == $tfRepetirPassword.value){
        Password = $tfPassword.value;
        let loginPlayer = {
            email: $tfEmail.value,
            password: Password,
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
            respuestaSolicitud.json().then(respuestaJson => {

            })
        })

    }else{
        $pWarning.innerHTML = "Las contraseñas no coinciden"
    }
})