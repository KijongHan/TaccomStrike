export class CreateGameLobby 
{
    maxRoomLimit: number;
    gameLobbyName: string;
    gameMode: number;

    constructor() 
    {
        this.gameMode = 1;
        this.maxRoomLimit = 4;
        this.gameLobbyName = "";
    }
}