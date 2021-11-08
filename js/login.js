let $tfEmail = document.getElementById("tfEmailLogin");
let $tfPassword = document.getElementById("tfPasswordLogin");
let $btnLogin = document.getElementById("btnLogin");

$btnLogin.addEventListener("click", (event)=> {
    event.preventDefault();
    let loginInformation = {
        email: $tfEmail.value,
        password: $tfPassword.value
    }
    let sendOptions = {
        method: "POST",
        body: JSON.stringify(loginInformation),
        headers:{
            'Content-Type': 'application/json'
        }
    }
    fetch("http://127.0.0.1:5000/" + "login", sendOptions).then(response => {
        console.log(response);
        if (response.ok){
            response.json().then(responseJson => {
                console.log(responseJson);
                sessionStorage.setItem('token', responseJson.token);
                sessionStorage.setItem('nickname', responseJson.nickname);
                sessionStorage.setItem('birthday', responseJson.birthday);
                sessionStorage.setItem('gender',responseJson.gender);
                sessionStorage.setItem('email',loginInformation.email);
                sessionStorage.setItem('currentPassword',loginInformation.password);
                sessionStorage.setItem('isModerator', responseJson.isModerator);
                location.href = 'view/ViewProfile.html';
            })
        }
    })
})