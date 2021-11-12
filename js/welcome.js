let btnPrueba = document.getElementById("PerfilDePrueba");

btnPrueba.addEventListener("click",(event) =>{
    event.preventDefault();
    sessionStorage.setItem('viewProfile', "Yira98");
    location.href = '../view/ViewProfile.html'
})
