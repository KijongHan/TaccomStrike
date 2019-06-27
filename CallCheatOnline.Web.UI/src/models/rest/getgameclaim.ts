import { GetGameCard } from "./getgamecard";
import { GetGameUser } from "./getgameuser";

export class GetGameClaim 
{
    claims: GetGameCard[];
    actual: GetGameCard[];
    claimUser: GetGameUser;
}