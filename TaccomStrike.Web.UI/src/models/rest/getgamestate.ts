import { GetGameUser } from "./getgameuser";
import { GetGameCard } from "./getgamecard";
import { GetGameClaim } from "./getgameclaim";
import { GamePhase } from "../../services/game/gameservice";

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

    actionHistory: string[];
}