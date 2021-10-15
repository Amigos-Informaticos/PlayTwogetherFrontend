let $btnUpdate = document.getElementById("btnUpdate");
let $tfNickname = document.getElementById("tfNickname");
let $tfPassword = document.getElementById("tfPassword");
let $tfRepeatPassword = document.getElementById("tfRepeatPassword");
let $cbSex = document.getElementById("cbSex");
let $dpBirthday = document.getElementById("dpBirthday");
let $pWarning = document.getElementById("warning");

$tfNickname.value = localStorage.getItem('nickname');
$dpBirthday.value = localStorage.getItem('birthday');
$cbSex.value = localStorage.getItem('gender');

$btnUpdate.addEventListener("click", (event) => {
    event.preventDefault();
    let password;
    if ($tfPassword.value == $tfRepeatPassword.value) {
        password = $tfPassword.value;
        if (password == ""){
            password = localStorage.getItem('currentPassword')
        }
        let newPlayer = {
            email: localStorage.getItem('email'),
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
                'token': localStorage.getItem('token')
            }
        }
        console.log(sendOptions.body);
        fetch("http://127.0.0.1:5000/" + "players", sendOptions).then(response => {
            console.log(response);
            if (response.ok){
                localStorage.setItem('nickname', newPlayer.nickname);
                localStorage.setItem('birthday', newPlayer.birthday);
                localStorage.setItem('gender',newPlayer.gender);
                localStorage.setItem('currentPassword',password);
                location.href = '../view/ViewProfile.html';
            }

        })

    } else {
        $pWarning.innerHTML = "* Las contraseñas no coinciden"
    }
})
