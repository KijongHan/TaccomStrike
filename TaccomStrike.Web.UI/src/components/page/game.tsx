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
import { GameActionComponent, GameActionComponentStyle } from "../game/gameaction";

const GamePage = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
	font-family: 'Cormorant Upright', serif;
`;

const GameBoardPanel = styled.div`
    width: 100%;
    height: 80%;
`;

const GameUserHandPanel = styled.div`
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap
    width: 100%;
    height: 20%;
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
                    heightPercentage: 98,
                    widthPxiels: 100,
                    position: Position.relative,
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
        gameBoardComponentStyle.displayStyle.widthPercentage = 12;
        gameBoardComponentStyle.displayStyle.heightPercentage = 30;
        let gameBoardSeatComponentStyle = new GameBoardSeatComponentStyle();
        gameBoardSeatComponentStyle.displayStyle.widthPercentage = 60;
        gameBoardSeatComponentStyle.displayStyle.heightPercentage = 100;

        let gameActionComponentStyle = new GameActionComponentStyle();
        gameActionComponentStyle.cardComponentStyle.displayStyle.position = Position.fixed;
        gameActionComponentStyle.cardComponentStyle.displayStyle.heightPercentage = 70;
        gameActionComponentStyle.cardComponentStyle.displayStyle.widthPercentage = 25;
        gameActionComponentStyle.cardComponentStyle.displayStyle.topPixels = 0;
        gameActionComponentStyle.cardComponentStyle.displayStyle.rightPixels = 0;
        return (
            <GamePage>
                <GameBoardPanel>
                    <GameBoardComponent
                        loggedInUser={this.props.loggedInUser}
                        gameState={this.props.gameState}
                        gameBoardComponentStyle={gameBoardComponentStyle}
                        gameBoardSeatComponentStyle={gameBoardSeatComponentStyle}>
                    </GameBoardComponent>
                    <GameActionComponent
                        gameActionComponentStyle={gameActionComponentStyle}>
                    </GameActionComponent>
                </GameBoardPanel>
                <GameUserHandPanel>
                    {hand}
                </GameUserHandPanel>
            </GamePage>
        );
    }
}