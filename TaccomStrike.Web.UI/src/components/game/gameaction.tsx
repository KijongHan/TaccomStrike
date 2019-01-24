import * as React from "react";
import styled from "styled-components";
import { CardComponentStyle, CardComponent } from "../general/card";
import { DisplayStyle } from "../../styles/displaystyle";
import { ButtonComponent, ButtonComponentStyle } from "../general/button";

const GameActionElement = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(200, 200, 200);
`;

export class GameActionComponentProps 
{
    gameActionComponentStyle: GameActionComponentStyle;

    submitClaimButtonClickHandler: () => void;
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
        let style = new ButtonComponentStyle();
        style.displayStyle.widthPercentage = 80;
        style.displayStyle.heightPixels = 50;
        let gameActionComponent = (
            <GameActionElement>
                <ButtonComponent
                    buttonText="Submit Claim"
                    buttonComponentStyle={style}
                    buttonClickHandler={this.props.submitClaimButtonClickHandler}>
                </ButtonComponent>
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