let $btnRegistrarse = document.getElementById("btnRegistrarse");
let $tfEmail = document.getElementById("tfEmail");
let $tfNickname = document.getElementById("tfSalario");
let $tfContrasenia = document.getElementById("tfEdad");

$btnRegistrarse.addEventListener("click", ()=> {
    let nuevoPlayer = {
        email: $tfEmail.value,
        nickname: $tfNickname.value,
        contrasenia: $tfContrasenia.value
    }
    let opcionesEnvio = {
        method: "POST",
        body: JSON.stringify(nuevoPlayer)
    }

    fetch("https://dummy.restapiexample.com/api/v1/create", opcionesEnvio).then(respuestaSolicitud => {
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

