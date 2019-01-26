import * as React from "react";
import styled from "styled-components";
import { CardComponentStyle, CardComponent } from "../general/card";
import { DisplayStyle } from "../../styles/displaystyle";
import { ButtonComponent, ButtonComponentStyle } from "../general/button";
import { GetUser } from "../../models/rest/getuser";
import { GetGameState } from "../../models/rest/getgamestate";
import { ComboButtonComponent, ComboButtonComponentStyle, ComboButtonItem } from "../general/combobutton";

const GameActionElement = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(200, 200, 200);
`;

export class GameActionComponentProps 
{
    loggedInUser: GetUser;
    gameState: GetGameState;

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
        style.displayStyle.heightPercentage = 10;

        let comboButtonComponentStyle = new ComboButtonComponentStyle(new DisplayStyle({
            widthPercentage: 80,
            heightPercentage: 10
        }));
        let comboButtons = [
            new ComboButtonItem(this.props.gameState.lowerBoundRank, null),
            new ComboButtonItem(this.props.gameState.middleBoundRank, null),
            new ComboButtonItem(this.props.gameState.upperBoundRank, null)
        ]

        let gameActionComponent: JSX.Element;
        if(this.props.loggedInUser.userID===this.props.gameState.userTurn.user.userID) 
        {
            gameActionComponent = (
                <GameActionElement>
                    <ComboButtonComponent
                        comboButtons={comboButtons}
                        comboButtonComponentStyle={comboButtonComponentStyle}>
                    </ComboButtonComponent>
                    <ButtonComponent
                        buttonText="Submit Claim"
                        buttonComponentStyle={style}
                        buttonClickHandler={this.props.submitClaimButtonClickHandler}>
                    </ButtonComponent>
                </GameActionElement>
            );
        }
        else 
        {
            gameActionComponent = (
                <GameActionElement>
                </GameActionElement>
            );
        }
        
        return (
			<CardComponent
				front={gameActionComponent}
				cardStyle={this.props.gameActionComponentStyle.cardComponentStyle}
				rotationAnimation={null}>
			</CardComponent>
		);
    }
}