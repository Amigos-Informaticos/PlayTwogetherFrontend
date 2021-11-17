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
}