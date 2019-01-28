import { GetGameState } from "../rest/getgamestate";
import { GetGameUser } from "../rest/getgameuser";
import { GetGameClaim } from "../rest/getgameclaim";

export class GameCallCheat 
{
    gameState: GetGameState;
    cheatCaller: GetGameUser;
    lastClaimUser: GetGameUser;
    preCheatCallClaims: GetGameClaim[];
    cheatCallSuccess: boolean;
}