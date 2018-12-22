import { GetUser } from "./getuser";

export class GetGameLobby 
{
    gameLobbyName: string;
    gameLobbyId: string;
    maxRoomLimit: number;
    host: GetUser;
    players: GetUser[];
}