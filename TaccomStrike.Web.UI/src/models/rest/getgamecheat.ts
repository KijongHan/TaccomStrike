import { GetGameUser } from "./getgameuser";
import { GetGameClaim } from "./getgameclaim";

export class GetGameCheat 
{
    cheatCallSuccessful: boolean;
    cheatCaller: GetGameUser;
    lastClaimUser: GetGameUser;
    preCheatClaims: GetGameClaim[];
}