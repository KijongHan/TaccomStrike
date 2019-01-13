import * as React from "react";
import styled from "styled-components";
import { CardComponent, CardComponentStyle } from "../general/card";
import { GetGameCard } from "../../models/rest/getgamecard";

export class GameCardComponentProps 
{
    gameCard: GetGameCard;
    gameCardComponentStyle: GameCardComponentStyle;
}

export class GameCardComponentState {}

export class GameCardComponentStyle 
{
    cardComponentStyle: CardComponentStyle;
}

const GameCardFace = styled.div`
    height: 100%;
    width: 100%;
    border: 1px solid black;
    background-color: rgba(255, 255, 255, 1);
`;

export class GameCardComponent extends React.Component<GameCardComponentProps, GameCardComponentState> 
{
    constructor(props: GameCardComponentProps) 
    {
        super(props);
    }

    render()
    {
        let gameCardFace = (
            <GameCardFace>
                {this.props.gameCard.rank}
                {this.props.gameCard.suit}
            </GameCardFace>
        );
        return (
            <CardComponent
                front={gameCardFace}
                cardStyle={this.props.gameCardComponentStyle.cardComponentStyle}
                rotationAnimation={null}>
            </CardComponent>
        );
    }
}