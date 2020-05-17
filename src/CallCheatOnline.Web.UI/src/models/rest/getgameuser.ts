import { GetUser } from "./getuser";
import { GameUserState } from "../enums/gameuserstate";

export class GetGameUser 
{
    state: GameUserState;
    gameUserID: number;
    user: GetUser;
    handCount: number;
}