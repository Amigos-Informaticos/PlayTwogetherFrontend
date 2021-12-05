export class Player {
    static getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    static validateBirthday(dateString){
        var flag = false;
        var age = this.getAge(dateString);
        if ((age>=12) && (age<100)){
            flag = true;
        }
        return flag;
    }

    static validateNickname(nickname){
        return nickname.length > 3 &&
            nickname.length < 26 && !this.validateEmail(nickname);
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

    static uncompleteSignUpInfo(email, nickname, password, repeatPassword, birthday, schedule){
        return !email || !nickname || !password || !repeatPassword || !birthday || !schedule;
    }
}