export class CreateGameLobby 
{
    maxRoomLimit: number;
    gameLobbyName: string;

    constructor() 
    {
        this.maxRoomLimit = 4;
        this.gameLobbyName = "";
    }
}