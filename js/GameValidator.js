export class GameValidator{
    static validateNickname(nickname){
        return nickname.length > 3 &&
            nickname.length < 26;
    }

    static uncompleteGameInfo(email, nickname, accountLevel, personage, hoursPlayed, rol){
        return !email || !nickname || !accountLevel || !personage || !hoursPlayed || !rol;
    }
}