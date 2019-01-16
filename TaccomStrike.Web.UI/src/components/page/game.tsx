import { BasePageComponent, BasePageComponentState, BasePageComponentProps } from "./base";
import * as React from "react";
import { GamePageStyle } from "../pagestyles/game";
import { GetGameState } from "../../models/rest/getgamestate";
import styled from "styled-components";
import { GetGameCard } from "../../models/rest/getgamecard";
import { CardComponent } from "../general/card";
import { DisplayStyle, Position } from "../../styles/displaystyle";
import { GetGameUser } from "../../models/rest/getgameuser";
import { PerspectiveStyle } from "../../styles/perspectivestyle";
import { GameCardComponent, GameCardComponentStyle } from "../game/gamecard";
import { GameBoardComponent, GameBoardComponentStyle, GameBoardSeatComponentStyle } from "../game/gameboard";

const GamePage = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
	font-family: 'Cormorant Upright', serif;
`;

const GameUserHandPanel = styled.div`
    position: absolute;
    bottom: 0;
    overflow-y: auto;
    overflow-x: scroll;
    white-space: nowrap
    width: 100%;
`;

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
        let leftPixels = 0;
        let hand = this.props.gameState.hand.map((value: GetGameCard, index: number) => {
            let cardStyle = {
                displayStyle: new DisplayStyle({
                    heightPixels: 150,
                    widthPxiels: 100,
                    position: Position.absolute,
                    leftPixels: leftPixels
                }),
                perspectiveStyle: new PerspectiveStyle({
                    
                })
            }
            if(index===this.props.gameState.hand.length-1) 
            {
                cardStyle.displayStyle.marginRightPixels = leftPixels;
            }
            leftPixels -= 70;

            let gameCardStyle = new GameCardComponentStyle();
            gameCardStyle.cardComponentStyle = cardStyle;

            return (
                <GameCardComponent
                    key={value.rank+value.suit}
                    gameCard={value}
                    gameCardComponentStyle={gameCardStyle}>
                </GameCardComponent>
            );
        });

        let gameBoardComponentStyle = new GameBoardComponentStyle();
        gameBoardComponentStyle.displayStyle.widthPxiels = 200;
        gameBoardComponentStyle.displayStyle.heightPixels = 200;
        let gameBoardSeatComponentStyle = new GameBoardSeatComponentStyle();
        gameBoardSeatComponentStyle.displayStyle.widthPxiels = 100;
        gameBoardSeatComponentStyle.displayStyle.heightPixels = 100;
        return (
            <GamePage>
                <GameBoardComponent
                    loggedInUser={this.props.loggedInUser}
                    gameState={this.props.gameState}
                    gameBoardComponentStyle={gameBoardComponentStyle}
                    gameBoardSeatComponentStyle={gameBoardSeatComponentStyle}>
                </GameBoardComponent>
                <GameUserHandPanel>
                    {hand}
                </GameUserHandPanel>
            </GamePage>
        );
    }
}