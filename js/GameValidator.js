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
        let hoursInt = parseInt(hours);
        if (Number.isInteger(hoursInt)){
            if (hoursInt> 0 && hoursInt < 2000){
                isValid = true;
            }
        }
        return isValid;
    }

    static validateLevel(level){
        let isValid = false;
        let levelInt = parseInt(level)
        if (Number.isInteger(levelInt)){
            if (levelInt>0 && levelInt<3000){
                isValid = true;
            }
        }
        return isValid;
    }
}