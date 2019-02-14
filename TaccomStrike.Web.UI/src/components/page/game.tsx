import { BasePageComponent, BasePageComponentState, BasePageComponentProps } from "./base";
import * as React from "react";
import { GamePageStyle } from "../pagestyles/game";
import { GetGameState } from "../../models/rest/getgamestate";
import styled from "styled-components";
import { GetGameCard } from "../../models/rest/getgamecard";
import { CardSlideAnimation } from "../general/card";
import { DisplayStyle, Position, Display } from "../../styles/displaystyle";
import { GetGameUser } from "../../models/rest/getgameuser";
import { PerspectiveStyle } from "../../styles/perspectivestyle";
import { GameHandCardComponent, GameHandCardComponentStyle } from "../game/gamehandcard";
import { GameBoardComponent, GameBoardComponentStyle, GameBoardSeatComponentStyle } from "../game/gameboard";
import { GameActionComponent, GameActionComponentStyle } from "../game/gameaction";
import { isNullOrUndefined, isNull } from "util";
import { GetGameCheat } from "../../models/rest/getgamecheat";
import { ButtonComponent, ButtonComponentStyle } from "../general/button";
import { ColorStyle } from "../../styles/colorstyle";
import { GetGameLobby } from "../../models/rest/getgamelobby";
import { GameLobbyComponent, GameLobbyComponentStyle } from "../general/gamelobby";
import { GetChatMessage } from "../../models/rest/getchatmessage";

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
    gameLobbyMessages: GetChatMessage[];
    gameLobby: GetGameLobby;
    gameState: GetGameState;
    gameCheat: GetGameCheat;
    gameWinner: GetGameUser;
    
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
        let gameChat = this.getGameChat();

        return (
            <GamePage>
                <GamePageInner>
                    <GameBoardPanel>
                        {gameChat}
                        {gameBoard}
                        {gameAction}
                    </GameBoardPanel>
                    {hand}
                    {gameFinish}
                </GamePageInner>
            </GamePage>
        );
    }

    getGameChat = () => 
    {
        let style = new GameLobbyComponentStyle();
        style.cardComponentStyle = {
            displayStyle: new DisplayStyle({
                position: Position.absolute,
                widthPercentage: 25,
                heightPercentage: 70,
                topPixels: 0,
                leftPixels: 0
            }),
            perspectiveStyle: new PerspectiveStyle()
        };
        style.gameLobbyNameLabelledInputStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };
        style.maxLobbyLimitLabelledListStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };
        style.createGameButtonStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };
        style.gameLobbyContentPanelStyle = {
            displayStyle: new DisplayStyle({
                heightPercentage: 70,
                widthPercentage: 100
            })
        };
        style.gameLobbyPlayersPanelStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };
        style.gameLobbyMessagesPanelStyle = {
            displayStyle: new DisplayStyle({
                heightPercentage: 98,
                widthPercentage: 99
            })
        };
        style.gameLobbyMessageButtonedInputStyle = {
            buttonedInputComponentPanelStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 99,
                    marginTopPixels: 35,
                    heightPixels: 40
                })
            },

            buttonComponentStyle: {
                displayStyle: new DisplayStyle({
                    floatLeft: true,
                    widthPercentage: 25,
                    heightPixels: 40
                })
            },

            inputComponentStyle: {
                displayStyle: new DisplayStyle({
                    floatLeft: true,
                    widthPercentage: 75,
                    heightPixels: 40
                })
            }
        };
        style.startGameButtonStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };
        style.leaveGameButtonStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };

        style.createGameLobbyFlipAnimation = {
            rotationFrom: 180,
            rotationTo: 359.9,
            rotationDirection: 1,
            rotationDelay: 0,
            rotationDuration: 1000
        };

        style.currentGameLobbyFlipAnimation ={
            rotationFrom: 180,
            rotationTo: 180,
            rotationDirection: 1,
            rotationDelay: 0,
            rotationDuration: 1000
        };

        return (
            <GameLobbyComponent
                loggedInUser={this.props.loggedInUser}
                gameLobbyComponentStyle={style}
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
        gameActionComponentStyle.cardComponentStyle.displayStyle.position = Position.absolute;
        gameActionComponentStyle.cardComponentStyle.displayStyle.heightPercentage = 100;
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
                gameCheat={this.props.gameCheat}
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