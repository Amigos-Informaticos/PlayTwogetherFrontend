export class Validator{
    static validateNickname(nickname){
        console.log(nickname.length);
        return nickname.length > 3 &&
            nickname.length < 26;
    }

    static validateEmail(email) {
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(String(email).toLowerCase());
    }

    static validatePassword(password, repeatPassword) {
        let response = "ok";
        if (password.localeCompare(repeatPassword) != 0) {
            console.log("sos" + password);
            console.log("sas" + repeatPassword);
            response = "dontMatch";
        } else if (!this.validateStrongPassword(password)){
            response = "weakPassword";
        }
        return response;
    }

    static validateStrongPassword(password) {
        return /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            password.length > 7 &&
            password.length < 21;
    }
}