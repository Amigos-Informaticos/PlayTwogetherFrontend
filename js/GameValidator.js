export class GameValidator{
    static validateNickname(nickname){
        return nickname.length > 3 &&
            nickname.length < 26;
    }

    static validatePersonage(idPersonage){
        let response = true;
        let id = Number(idPersonage);
        if (id <= 0){
            response = false;
        }
        return response;
    }

    static uncompleteGameInfo(nickname, accountLevel, personage, hoursPlayed, rol){
        return !nickname || !accountLevel || !personage || !hoursPlayed || !rol;
    }

    static validateRol(rol) {
        let response = true;
        let id = Number(rol);
        if (id <= 0){
            response = false;
        }
        return response;
    }

    static validateHoursToPlay(hours){
        let isValid = false;
        let hours_int = parseInt(hours);
        if (Number.isInteger(hours_int)){
            if (hours_int> 0 && hours_int < 2000){
                isValid = true;
            }
        }
        return isValid;
    }

    static validateLevel(level){
        let isValid = false;
        let level_int = parseInt(level)
        if (Number.isInteger(level_int)){
            if (level_int>0 && level_int<3000){
                isValid = true;
            }
        }
        return isValid;
    }
}