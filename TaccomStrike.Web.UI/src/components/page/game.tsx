import { BasePageComponent, BasePageComponentState, BasePageComponentProps } from "./base";
import * as React from "react";
import { GamePageStyle } from "../pagestyles/game";
import { GetGameState } from "../../models/rest/getgamestate";
import styled from "styled-components";
import { GetGameCard } from "../../models/rest/getgamecard";
import { CardSlideAnimation } from "../general/card";
import { DisplayStyle, Position } from "../../styles/displaystyle";
import { GetGameUser } from "../../models/rest/getgameuser";
import { PerspectiveStyle } from "../../styles/perspectivestyle";
import { GameHandCardComponent, GameHandCardComponentStyle } from "../game/gamehandcard";
import { GameBoardComponent } from "../game/gameboard";
import { GameActionComponent } from "../game/gameaction";
import { isNullOrUndefined } from "util";
import { GetGameCheat } from "../../models/rest/getgamecheat";
import { ButtonComponent, ButtonComponentStyle } from "../general/button";
import { ColorStyle } from "../../styles/colorstyle";
import { GetGameLobby } from "../../models/rest/getgamelobby";
import { GameLobbyComponent } from "../general/gamelobby";
import { GameLobbySendMessage } from "../../models/hub/gamelobbysendmessage";
import { GamePhase } from "../../models/enums/gamephase";
import { GetGameResult } from "../../models/rest/getgameresult";

const GamePage = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    font-family: 'Cormorant Upright', serif;
`;

const GamePageInner = styled.div`
    height: 96%;
    width: 98%;
    margin-top: 1%;
    margin-left: 1%;
    background-color: ${ColorStyle.pallet2};
`;

const GameBoardPanel = styled.div`
    width: 100%;
    height: 75%;
    position: relative;
`;

const GamePreparationPanel = styled.div`
    position: fixed;
    display: flex;
    top: 0;
    bottom: 0; 
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.7);
`;

const GamePreparationText = styled.div`
    margin: auto;
    text-align: center;
    font-size: 2em;
    font-weight: bold;
`;

const GameUserHandPanel = styled.div`
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap
    width: 100%;
    height: ${(p: DisplayStyleProps) => p.displayStyle.getHeightString()};
    position: relative;
`;

const GameFinishPanel = styled.div`
    font-family: 'Times New Roman';
    position: fixed;
    height: 30%;
    width: 30%;
    color: white;
    background-color: rgba(0, 0, 0, 1);
    margin-left: 35%;
    top: 30%;
    padding: 10px 10px 10px 10px;
`;

class DisplayStyleProps 
{
    displayStyle: DisplayStyle;
}

export class GamePageComponentState extends BasePageComponentState 
{
    selectedCards: GetGameCard[];
    selectedClaimRank: string;

    preparationDuration: number;
    preparationTimer: number;
}

export interface GamePageComponentProps extends BasePageComponentProps 
{
    gameLobbyMessages: GameLobbySendMessage[];
    gameLobby: GetGameLobby;
    gameState: GetGameState;
    gameCheat: GetGameCheat;
    gameResult: GetGameResult;

    messageContentPanelRef: React.RefObject<any>;
    
    sendMessageButtonClickHandler: (message: string) => void;
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
            useMobileStyle: true,

            selectedCards: [],
            selectedClaimRank: null,

            preparationDuration: null,
            preparationTimer: null
        }
    }

    render() 
    {
        if(isNullOrUndefined(this.state.pageStyle)) 
        {
            return <div></div>
        }

        let hand = this.getHandComponent();
        let gameBoard = this.getBoardComponent();
        let gameAction = this.getActionComponent();
        let gameFinish = this.getFinishComponent();
        let gameChat = this.getGameChat();

        let gamePreparation: JSX.Element;
        if(this.props.gameState.currentGamePhase===GamePhase.PreparationPhase) 
        {
            let currentPhaseDurationSeconds = Math.floor(this.state.preparationDuration / 1000)
            gamePreparation = (
                <GamePreparationPanel>
                    <GamePreparationText>
                        Game will begin in.. {currentPhaseDurationSeconds}
                    </GamePreparationText>
                </GamePreparationPanel>
            );
        }

        return (
            <GamePage
                tabIndex={0}>
                <GamePageInner>
                    <GameBoardPanel>
                        {gameChat}
                        {gameBoard}
                        {gameAction}
                    </GameBoardPanel>
                    {hand}
                    {gameFinish}
                </GamePageInner>
                {gamePreparation}
            </GamePage>
        );
    }
    
    componentDidMount() 
    {
        super.componentDidMount();
        this.startPreparationTimer();
    }

    componentDidUpdate(prevProps: GamePageComponentProps) 
    {
        if(prevProps.gameState.currentGamePhase!==this.props.gameState.currentGamePhase && this.props.gameState.currentGamePhase===GamePhase.PreparationPhase) 
        {
            this.startPreparationTimer();
        }
    }

    startPreparationTimer = ()  =>
    {
        if(this.state.preparationTimer!==null) 
        {
            window.clearInterval(this.state.preparationTimer);
        }

        let duration = this.props.gameState.preparationPhaseDuration
        this.setState({preparationDuration: duration});
        let handlerID = window.setInterval(() => {
            if(this.state.preparationDuration<=0) 
            {
                this.setState({preparationDuration: 0});
                window.clearInterval(this.state.preparationTimer);
                this.setState({preparationTimer: null});
            }
            else 
            {
                let nextInterval = this.state.preparationDuration - 15;
                this.setState({preparationDuration: nextInterval});
            }
        }, 15);
        this.setState({preparationTimer: handlerID});0.
    }

    getGameChat = () => 
    {
        return (
            <GameLobbyComponent
                messageContentPanelRef={this.props.messageContentPanelRef}
                loggedInUser={this.props.loggedInUser}
                gameLobbyComponentStyle={(this.state.pageStyle as GamePageStyle).gameLobbyComponentStyle}
                currentGameLobby={this.props.gameLobby}
                currentGameLobbyMessages={this.props.gameLobbyMessages}
                createGameLobby={null}
                gameLobbyNameInputOnChangeHandler={null}
                gameModeListOnChangeHandler={null}
                startGameButtonClickHandler={null}
                leaveGameButtonClickHandler={null}
                createGameButtonClickHandler={null}
                sendMessageButtonHandler={this.props.sendMessageButtonClickHandler}>
            </GameLobbyComponent>
        );
    }

    getFinishComponent = () => 
    {
        if(!isNullOrUndefined(this.props.gameResult)) 
        {
            let style = new ButtonComponentStyle();
            style.displayStyle = new DisplayStyle({
                position: Position.absolute,
                bottomPixels: 10,
                widthPercentage: 80,
                marginLeftPercentage: 10,
                heightPercentage: 25
            });

            let userRank = this.props.gameResult.usersRanking.findIndex((value: GetGameUser) => value.user.userID===this.props.loggedInUser.userID);
            let userScore = this.props.gameResult.rankingScores.find((value: number, index, number) => index===userRank);
            return (
                <GameFinishPanel>
                    {`The winner is ${this.props.gameResult.usersRanking[0].user.username}`}
                    {`You finished ${userRank+1} ${userScore}`}
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
        return (
            <GameActionComponent
                loggedInUser={this.props.loggedInUser}
                gameState={this.props.gameState}
                gameCheat={this.props.gameCheat}
                gameActionComponentStyle={(this.state.pageStyle as GamePageStyle).gameActionComponentStyle}
                submitClaimButtonClickHandler={this.submitClaimButtonClickHandler}
                claimRankSelectedOnChangeHandler={this.claimRankSelectedOnChangeHandler}
                callCheatButtonClickHandler={this.props.callCheatButtonClickHandler}>
            </GameActionComponent>
        );
    }

    getBoardComponent = () => 
    {
        let gameBoard = (
            <GameBoardComponent
                loggedInUser={this.props.loggedInUser}
                gameCheat={this.props.gameCheat}
                gameState={this.props.gameState}
                gameBoardComponentStyle={(this.state.pageStyle as GamePageStyle).gameBoardComponentStyle}>
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
            let gameCardStyle = new GameHandCardComponentStyle();
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
                <GameHandCardComponent
                    gameCardClickHandler={this.gameCardClickHandler}
                    isSelected={selected}
                    key={value.rank+value.suit}
                    gameCard={value}
                    gameCardComponentStyle={gameCardStyle}>
                </GameHandCardComponent>
            );
        });
        return (
            <GameUserHandPanel
                displayStyle={(this.state.pageStyle as GamePageStyle).gameHandPanelStyle}>
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