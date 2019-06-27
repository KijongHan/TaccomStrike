import { GetUser } from "./getuser";
import { GameMode } from "../enums/gamemode";

export class GetGameLobby 
{
    gameLobbyName: string;
    gameLobbyID: number;
    maxRoomLimit: number;
    host: GetUser;
    gameMode: GameMode;
    players: GetUser[];
}