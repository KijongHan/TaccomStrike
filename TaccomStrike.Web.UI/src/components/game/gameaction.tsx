import * as React from "react";
import styled from "styled-components";
import { CardComponentStyle, CardComponent } from "../general/card";
import { DisplayStyle } from "../../styles/displaystyle";
import { ButtonComponent, ButtonComponentStyle } from "../general/button";
import { GetUser } from "../../models/rest/getuser";
import { GetGameState } from "../../models/rest/getgamestate";
import { ComboButtonComponent, ComboButtonComponentStyle, ComboButtonItem } from "../general/combobutton";
import { string } from "prop-types";
import { isNullOrUndefined } from "util";
import { LabelledListComponent, ListItem, LabelledListComponentStyle } from "../general/labelledlist";
import { LabelledInputComponentStyle } from "../general/labelledinput";
import { CardRank } from "../../services/game/gameservice";

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

    claimRankSelectedOnChangeHandler: (value: string) => void;
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

        let gameActionComponent: JSX.Element;
        if(this.props.loggedInUser.userID===this.props.gameState.userTurn.user.userID) 
        {
            let claimOptions: JSX.Element;
            if(isNullOrUndefined(this.props.gameState.lowerBoundRank)
                &&isNullOrUndefined(this.props.gameState.middleBoundRank)
                &&isNullOrUndefined(this.props.gameState.upperBoundRank)) 
            {
                let listItems = Object.keys(CardRank).map((key: any) => {
                    return new ListItem(CardRank[key], CardRank[key]);
                });
                let labelledListComponentStyle = new LabelledListComponentStyle(new DisplayStyle({
                    heightPercentage: 10,
                    widthPercentage: 80
                }));
                claimOptions=(
                    <LabelledListComponent
                        labelledListComponentStyle={labelledListComponentStyle}
                        listOnChangeHandler={this.props.claimRankSelectedOnChangeHandler}
                        labelValue={""}
                        listItems={listItems}>
                    </LabelledListComponent>
                )
            }
            else 
            {
                let comboButtonComponentStyle = new ComboButtonComponentStyle(new DisplayStyle({
                    widthPercentage: 80,
                    heightPercentage: 10
                }));
                let comboButtons = [
                    new ComboButtonItem(this.props.gameState.lowerBoundRank, null),
                    new ComboButtonItem(this.props.gameState.middleBoundRank, null),
                    new ComboButtonItem(this.props.gameState.upperBoundRank, null)
                ]
                claimOptions=(
                    <ComboButtonComponent
                        comboButtons={comboButtons}
                        comboButtonComponentStyle={comboButtonComponentStyle}>
                    </ComboButtonComponent>
                );
            }

            gameActionComponent = (
                <GameActionElement>
                    {claimOptions}
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