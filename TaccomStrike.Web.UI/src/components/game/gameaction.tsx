import * as React from "react";
import styled from "styled-components";
import { CardComponentStyle, CardComponent } from "../general/card";
import { DisplayStyle } from "../../styles/displaystyle";

const GameActionElement = styled.div`
    width: 100%;
    height: 100%;
    background-color: blue;
`;

export class GameActionComponentProps 
{
    gameActionComponentStyle: GameActionComponentStyle;
}

export class GameActionComponentState {}

export class GameActionComponentStyle 
{
    cardComponentStyle: CardComponentStyle;

    constructor() 
    {
        this.cardComponentStyle = new CardComponentStyle();
    }
}

export class GameActionComponent extends React.Component<GameActionComponentProps, GameActionComponentState>
{
    constructor(props: GameActionComponentProps) 
    {
        super(props);
    }

    render() 
    {
        let gameActionComponent = (
            <GameActionElement>
            </GameActionElement>
        );
        return (
			<CardComponent
				front={gameActionComponent}
				cardStyle={this.props.gameActionComponentStyle.cardComponentStyle}
				rotationAnimation={null}>
			</CardComponent>
		);
    }
}