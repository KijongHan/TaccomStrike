import { GetGameUser } from "./getgameuser";
import { GetGameCard } from "./getgamecard";
import { GetGameClaim } from "./getgameclaim";
import { GamePhase } from "../enums/gamephase";

export class GetGameState 
{
    userTurn: GetGameUser;
    hand: GetGameCard[];
    players: GetGameUser[];
    claims: GetGameClaim[];

    lowerBoundRank: string;
    middleBoundRank: string;
    upperBoundRank: string;

    currentGamePhase: GamePhase;
    turnPhaseDuration: number;
    callPhaseDuration: number;
    preparationPhaseDuration: number;

    actionHistory: string[];
}