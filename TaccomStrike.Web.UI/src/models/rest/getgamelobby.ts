import { GetUser } from "./getuser";

export class GetGameLobby 
{
    gameLobbyName: string;
    gameLobbyID: number;
    maxRoomLimit: number;
    host: GetUser;
    players: GetUser[];
}