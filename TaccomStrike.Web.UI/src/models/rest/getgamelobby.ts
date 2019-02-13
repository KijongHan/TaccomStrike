import { GetUser } from "./getuser";

export class GetGameLobby 
{
    gameLobbyName: string;
    gameLobbyID: number;
    maxRoomLimit: number;
    host: GetUser;
    gameMode: GameMode;
    players: GetUser[];
}

export enum GameMode 
{
    Casual=1, Competitive=2
}