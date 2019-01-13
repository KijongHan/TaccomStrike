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

const GamePage = styled.div`
	height: 100%;
	font-family: 'Cormorant Upright', serif;
`;

const GameCard = styled.div`
    height: 100%;
    width: 100%;
    border: 1px solid black;
`;

const GameUserHandPanel = styled.div`
    overflow-y: auto;
    overflow-x: scroll;
    white-space: nowrap
`;

const GameUserOpponent = styled.div`
    height: 60px;
    width: 50px;
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
        let opponentPlayers = this.props.gameState.players.filter((value: GetGameUser) => {
            console.log(this.props.loggedInUser)
            return value.user.userID!==this.props.loggedInUser.userID;
        });
        console.log(opponentPlayers);
        let opponentPlayersComponents = opponentPlayers.map((value: GetGameUser) => {
            return (
                <GameUserOpponent>
                    {value.user.username}
                    {value.handCount}
                </GameUserOpponent>
            );
        });
        
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

        return (
            <GamePage>
                {opponentPlayersComponents}
                <GameUserHandPanel>
                    {hand}
                </GameUserHandPanel>
            </GamePage>
        );
    }
}