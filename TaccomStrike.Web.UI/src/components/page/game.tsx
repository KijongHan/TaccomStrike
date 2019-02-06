import { BasePageComponent, BasePageComponentState, BasePageComponentProps } from "./base";
import * as React from "react";
import { GamePageStyle } from "../pagestyles/game";
import { GetGameState } from "../../models/rest/getgamestate";
import styled, { consolidateStreamedStyles } from "styled-components";
import { GetGameCard } from "../../models/rest/getgamecard";
import { CardComponent, CardSlideAnimation } from "../general/card";
import { DisplayStyle, Position } from "../../styles/displaystyle";
import { GetGameUser } from "../../models/rest/getgameuser";
import { PerspectiveStyle } from "../../styles/perspectivestyle";
import { GameCardComponent, GameCardComponentStyle } from "../game/gamecard";
import { GameBoardComponent, GameBoardComponentStyle, GameBoardSeatComponentStyle } from "../game/gameboard";
import { GameActionComponent, GameActionComponentStyle } from "../game/gameaction";
import { stat } from "fs";
import { isNullOrUndefined, isNull } from "util";
import { GetGameClaim } from "../../models/rest/getgameclaim";
import { GetGameCheat } from "../../models/rest/getgamecheat";
import { ButtonComponent, ButtonComponentStyle } from "../general/button";

const GamePage = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
	font-family: 'Cormorant Upright', serif;
`;

const GameBoardPanel = styled.div`
    width: 100%;
    height: 75%;
`;

const GameUserHandPanel = styled.div`
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap
    width: 100%;
    height: 25%;
    position: relative;
`;

const GameFinishPanel = styled.div`
    position: fixed;
    height: 30%;
    width: 30%;
    color: white;
    background-color: rgba(0, 0, 0, 1);
    margin-left: 35%;
    top: 30%;
    padding: 10px 10px 10px 10px;
`;

export class GamePageComponentState extends BasePageComponentState 
{
    selectedCards: GetGameCard[];
    selectedClaimRank: string;
}

export interface GamePageComponentProps extends BasePageComponentProps 
{
    gameState: GetGameState;
    gameCheat: GetGameCheat;
    gameWinner: GetGameUser;
    
    submitClaimButtonClickHandler: (claims: GetGameCard[], actual: GetGameCard[]) => void;
    callCheatButtonClickHandler: () => void;
    finishButtonClickHandler: () => void;
}

export class GamePageComponent extends BasePageComponent<GamePageComponentProps, GamePageComponentState> 
{
    constructor(props: GamePageComponentProps) 
    {
        super(props);
        this.state = 
        {
            pageStyle: new GamePageStyle().large(),
            selectedCards: [],
            selectedClaimRank: null
        }
    }

    render() 
    {
        let hand = this.getHandComponent();
        let gameBoard = this.getBoardComponent();
        let gameAction = this.getActionComponent();
        let gameFinish = this.getFinishComponent();

        return (
            <GamePage>
                <GameBoardPanel>
                    {gameBoard}
                    {gameAction}
                </GameBoardPanel>
                {hand}
                {gameFinish}
            </GamePage>
        );
    }

    getFinishComponent = () => 
    {
        if(!isNullOrUndefined(this.props.gameWinner)) 
        {
            let style = new ButtonComponentStyle();
            style.displayStyle = new DisplayStyle({
                position: Position.absolute,
                bottomPixels: 10,
                widthPercentage: 80,
                marginLeftPercentage: 10,
                heightPercentage: 25
            });
            return (
                <GameFinishPanel>
                    {`The game has ended. The winner is ${this.props.gameWinner.user.username}`}
                    <ButtonComponent
                        buttonText="Finish"
                        buttonComponentStyle={style}
                        buttonClickHandler={this.props.finishButtonClickHandler}>
                    </ButtonComponent>
                </GameFinishPanel>
            );
        }
    }

    getActionComponent = () => 
    {
        let gameActionComponentStyle = new GameActionComponentStyle();
        gameActionComponentStyle.cardComponentStyle.displayStyle.position = Position.fixed;
        gameActionComponentStyle.cardComponentStyle.displayStyle.heightPercentage = 70;
        gameActionComponentStyle.cardComponentStyle.displayStyle.widthPercentage = 25;
        gameActionComponentStyle.cardComponentStyle.displayStyle.topPixels = 0;
        gameActionComponentStyle.cardComponentStyle.displayStyle.rightPixels = 0;
        return (
            <GameActionComponent
                loggedInUser={this.props.loggedInUser}
                gameState={this.props.gameState}
                gameCheat={this.props.gameCheat}
                gameActionComponentStyle={gameActionComponentStyle}
                submitClaimButtonClickHandler={this.submitClaimButtonClickHandler}
                claimRankSelectedOnChangeHandler={this.claimRankSelectedOnChangeHandler}
                callCheatButtonClickHandler={this.props.callCheatButtonClickHandler}>
            </GameActionComponent>
        );
    }

    getBoardComponent = () => 
    {
        let gameBoardComponentStyle = new GameBoardComponentStyle();
        gameBoardComponentStyle.displayStyle.widthPercentage = 12;
        gameBoardComponentStyle.displayStyle.heightPercentage = 30;
        let gameBoardSeatComponentStyle = new GameBoardSeatComponentStyle();
        gameBoardSeatComponentStyle.displayStyle.widthPercentage = 90;
        gameBoardSeatComponentStyle.displayStyle.heightPercentage = 75;

        let gameBoard = (
            <GameBoardComponent
                loggedInUser={this.props.loggedInUser}
                gameState={this.props.gameState}
                gameBoardComponentStyle={gameBoardComponentStyle}
                gameBoardSeatComponentStyle={gameBoardSeatComponentStyle}>
            </GameBoardComponent>
        );
        return gameBoard;
    }

    getHandComponent = () => 
    {
        let leftPixels = 0;
        let hand = this.props.gameState.hand.map((value: GetGameCard, index: number) => {
            let cardStyle = {
                displayStyle: new DisplayStyle({
                    heightPercentage: 70,
                    widthPxiels: 100,
                    position: Position.relative,
                    leftPixels: leftPixels,
                    bottomPercentage: -28
                }),
                perspectiveStyle: new PerspectiveStyle({
                    
                })
            }
            if(index===this.props.gameState.hand.length-1) 
            {
                cardStyle.displayStyle.marginRightPixels = leftPixels;
            }
            leftPixels -= 70;

            let hoverAnimation = new CardSlideAnimation({
                slideFrom: 0,
                slideTo: -10,
                slideDuration: 250,
                slideDelay: 0
            });
            let gameCardStyle = new GameCardComponentStyle();
            gameCardStyle.cardComponentStyle = cardStyle;
            gameCardStyle.cardHoverAnimation = hoverAnimation;
            
            let selected = false;
            if(this.state.selectedCards.some((selectedCard: GetGameCard, index: number) => {
                return value.rank===selectedCard.rank && value.suit===selectedCard.suit;
            })) 
            {
                selected = true;
            }
            return (
                <GameCardComponent
                    gameCardClickHandler={this.gameCardClickHandler}
                    isSelected={selected}
                    key={value.rank+value.suit}
                    gameCard={value}
                    gameCardComponentStyle={gameCardStyle}>
                </GameCardComponent>
            );
        });
        return (
            <GameUserHandPanel>
                {hand}
            </GameUserHandPanel>
        )
    }

    gameCardClickHandler = (gameCard: GetGameCard) => 
    {
        for(let i = 0; i < this.state.selectedCards.length; i++) 
        {
            let value = this.state.selectedCards[i];
            if(gameCard.rank===value.rank && gameCard.suit===value.suit) 
            {
                this.setState((state: GamePageComponentState) => {
                    let newSelectedCards = state.selectedCards.map(a => Object.assign({}, a));
                    newSelectedCards.splice(i, 1);
                    return {selectedCards: newSelectedCards};
                });
                return;
            }
        }
        if(this.state.selectedCards.length===4) 
        {
            return;
        }

        this.setState((state: GamePageComponentState) => {
            return {selectedCards: state.selectedCards.concat(gameCard)}
        });
    }
    
    claimRankSelectedOnChangeHandler = (value: string) => 
    {
        this.setState({selectedClaimRank: value});
    }

    submitClaimButtonClickHandler = () => 
    {
        if(isNullOrUndefined(this.state.selectedClaimRank) || this.state.selectedCards.length===0) 
        {
            return;
        }

        let claims = this.state.selectedCards.map((value: GetGameCard) => {
            let claim = new GetGameCard();
            claim.rank = this.state.selectedClaimRank;
            claim.suit = value.suit;
            return claim;
        });
        let actual = this.state.selectedCards;
        this.setState({
            selectedCards: [],
            selectedClaimRank: null
        });
        this.props.submitClaimButtonClickHandler(claims, actual);
    }
}