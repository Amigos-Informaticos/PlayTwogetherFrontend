let $btnUpdate = document.getElementById("btnUpdate");
let $tfNickname = document.getElementById("tfNickname");
let $tfPassword = document.getElementById("tfPassword");
let $tfRepeatPassword = document.getElementById("tfRepeatPassword");
let $cbSex = document.getElementById("cbSex");
let $dpBirthday = document.getElementById("dpBirthday");
let $pWarning = document.getElementById("warning");
let $btnDelete = document.getElementById("delete-icon");

let $modal = document.getElementById("exampleModal");

$tfNickname.value = sessionStorage.getItem('nickname');
$dpBirthday.value = sessionStorage.getItem('birthday');
$cbSex.value = sessionStorage.getItem('gender');


/*
$btnUpdate.addEventListener("click", (event) => {
    event.preventDefault();
    $modal.modal('show');

    let password;
    if ($tfPassword.value == $tfRepeatPassword.value) {
        password = $tfPassword.value;
        if (password == ""){
            password = sessionStorage.getItem('currentPassword')
        }
        let newPlayer = {
            email: sessionStorage.getItem('email'),
            nickname: $tfNickname.value,
            password: password,
            gender: $cbSex.value,
            birthday: $dpBirthday.value
        }
        let sendOptions = {
            method: "PUT",
            body: JSON.stringify(newPlayer),
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            }
        }
        console.log(sendOptions.body);
        fetch("http://127.0.0.1:5000/" + "players", sendOptions).then(response => {
            console.log(response);
            if (response.ok){
                sessionStorage.setItem('nickname', newPlayer.nickname);
                sessionStorage.setItem('birthday', newPlayer.birthday);
                sessionStorage.setItem('gender',newPlayer.gender);
                sessionStorage.setItem('currentPassword',password);
                location.href = '../view/ViewProfile.html';
            }
        })

    } else {
        $pWarning.innerHTML = "* Las contraseñas no coinciden"
    }


})
*/

$btnDelete.addEventListener("click",(event) =>{

    event.preventDefault();

    $modal.modal('show');

    /*
    let playerToDelete = {
        email: sessionStorage.getItem('email'),
    }
    let sendOptions = {
        method: "DELETE",
        body: JSON.stringify(playerToDelete),
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token')
        }
    }
    console.log(sendOptions.body);
    fetch("http://127.0.0.1:5000/" + "players", sendOptions).then(response => {
        console.log(response);
        if (response.status == 200) {
            sessionStorage.clear();
            location.href = '../index.html';
        }
    })

     */
})
