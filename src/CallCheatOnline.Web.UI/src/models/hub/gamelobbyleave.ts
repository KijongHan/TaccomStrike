import { GetUser } from "../rest/getuser";

export class GameLobbyLeaveGame
{
    playerLeaving: GetUser;
    host: GetUser;
    players: GetUser[];
}