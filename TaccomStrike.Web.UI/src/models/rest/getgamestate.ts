import { GetGameUser } from "./getgameuser";
import { GetGameCard } from "./getgamecard";
import { GetGameClaim } from "./getgameclaim";

export class GetGameState 
{
    userTurn: GetGameUser;
    hand: GetGameCard[];
    players: GetGameUser[];
    claims: GetGameClaim[];
}