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
                localStorage.setItem('token', responseJson.token);
                localStorage.setItem('nickname', responseJson.nickname);
                localStorage.setItem('birthday', responseJson.birthday);
                localStorage.setItem('gender',responseJson.gender);
                localStorage.setItem('email',loginInformation.email);
                localStorage.setItem('currentPassword',loginInformation.password);
                location.href = 'view/ViewProfile.html';
            })

        }
    })
})