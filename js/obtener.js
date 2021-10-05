let $btnRegistrarse = document.getElementById("btnRegistrarse");
let $tfEmail = document.getElementById("tfEmail");
let $tfNickname = document.getElementById("tfNickname");
let $tfContrasenia = document.getElementById("tfContrasenia");

$btnRegistrarse.addEventListener("click", ()=> {
    let nuevoPlayer = {
        email: $tfEmail.value,
        nickname: $tfNickname.value,
        password: $tfContrasenia.value
    }
    let opcionesEnvio = {
        method: "POST",
        body: JSON.stringify(nuevoPlayer)
    }

    fetch("http://127.0.0.1:5000/" + "players", opcionesEnvio).then(respuestaSolicitud => {
        console.log(opcionesEnvio.body);
        respuestaSolicitud.json().then(respuestaJson => {
            let $parrafo = document.getElementById("Parrafo");
            if (respuestaJson.status == "success"){
                $parrafo.innerText = "Guardado!";
            }else {
                $parrafo.innerText = "No Guardado!";
            }
        })
    })
})

