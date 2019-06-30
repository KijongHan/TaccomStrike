import { GetGameUser } from "../rest/getgameuser";
import { CardRank } from "../enums/cardrank";

export class GameAction {}

export class GameActionSubmitClaim extends GameAction
{
    gameUser: GetGameUser;
    claim: CardRank;
    claimCount: number;
}

export class GameActionCallCheat extends GameAction
{
    gameUser: GetGameUser;
}

export class GameActionCheatResult extends GameAction 
{
    callCheatSuccess: boolean;
    cheatCaller: GetGameUser;
    lastClaimer: GetGameUser;
    actualRanks: CardRank[];
}