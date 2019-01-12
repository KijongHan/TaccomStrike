import { BasePageComponent, BasePageComponentState, BasePageComponentProps } from "./base";
import * as React from "react";
import { GamePageStyle } from "../pagestyles/game";
import { GetGameState } from "../../models/rest/getgamestate";
import styled from "styled-components";
import { GetGameCard } from "../../models/rest/getgamecard";
import { CardComponent } from "../general/card";
import { DisplayStyle } from "../../styles/displaystyle";
import { GetGameUser } from "../../models/rest/getgameuser";
import { PerspectiveStyle } from "../../styles/perspectivestyle";

const GamePage = styled.div`
	height: 100%;
	font-family: 'Cormorant Upright', serif;
`;

const GameCard = styled.div`
    height: 100%;
    width: 100%;
    border: 1px solid black;
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

        let hand = this.props.gameState.hand.map((value: GetGameCard) => {
            let cardFace = (
                <GameCard>
                    {value.rank} {value.suit}
                </GameCard>
            );
            let cardStyle = {
                displayStyle: new DisplayStyle({
                    heightPixels: 50,
                    widthPxiels: 40
                }),
                perspectiveStyle: new PerspectiveStyle({
                    
                })
            }
            return (
                <CardComponent
                    key={value.rank+value.suit}
                    front={cardFace}
                    cardStyle={cardStyle}
                    rotationAnimation={null}>
                </CardComponent>
            );
        });

        return (
            <GamePage>
                {opponentPlayersComponents}
                {hand}
            </GamePage>
        );
    }
}