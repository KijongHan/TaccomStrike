import { BasePageComponent, BasePageComponentState, BasePageComponentProps } from "./base";
import * as React from "react";
import { GamePageStyle } from "../pagestyles/game";
import { GetGameState } from "../../models/rest/getgamestate";

export class GamePageComponentState extends BasePageComponentState {}

export interface GamePageComponentProps extends BasePageComponentProps 
{
    gameState: GetGameState;
}

export class GamePageComponent extends BasePageComponent<GamePageComponentProps, GamePageComponentState> 
{
    constructor(props: GamePageComponentProps) 
    {
        super(props);
        this.state = 
        {
            pageStyle: new GamePageStyle().large()
        }
    }

    render() 
    {
        return (
            <div>

            </div>
        );
    }
}