export class ApiError {

    static goLogin() {
        alert("Error al conectar con el servidor.");
        sessionStorage.clear();
        location.href = "../index.html";
    }
}