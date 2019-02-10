import * as React from "react";
import styled, { keyframes, consolidateStreamedStyles } from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";
import { GetUser } from "../../models/rest/getuser";
import { GetGameState } from "../../models/rest/getgamestate";
import { GetGameUser } from "../../models/rest/getgameuser";
import { isNullOrUndefined } from "util";
import { GetGameClaim } from "../../models/rest/getgameclaim";
import { GameClaimCardComponent } from "./gameclaimcard";
import { GetGameCheat } from "../../models/rest/getgamecheat";
import { GetGameCard } from "../../models/rest/getgamecard";

const BlueGameUserIcon = require("../../res/blue_gameuser.svg");
const YellowGameUserIcon = require("../../res/yellow_gameuser.svg");
const GreenGameUserIcon = require("../../res/green_gameuser.svg");
const PurpleGameUserIcon = require("../../res/purple_gameuser.svg");
const ArrowDownIcon = require("../../res/arrowdown.png");
const CardHandIcon = require("../../res/card_hand.png");
const CardDeckIcon = require("../../res/card_deck.png");

const ClaimPanel = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const GameBoard = styled.div`
    margin: auto;
    position: relative;
    top: 35%;
    border-radius: 50%;
    width: ${(p: GameBoardComponentStyle) => p.displayStyle.getWidthString()};
    height: ${(p: GameBoardComponentStyle) => p.displayStyle.getHeightString()};
`;

const GameBoardPlayerPanel = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const GameBoardPlayer = styled.div`
    background-color: white;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
`;

const GameBoardPlayerName = styled.div`
    width: 100%;
    text-align: center;
`;

const GameBoardPlayerCardHand = styled.div`
    width: 70%;
    height: 30%;
    background-size: 100% 100%;
    background-image: url(${CardHandIcon});
    display: flex;
`;

const GameBoardPlayerCardHandText = styled.p`
    height: 100%;
    margin: auto;
    color: white;
    text-align: center;
`;

const GameBoardClaimsCount = styled.div`
    width: 30%;
    height: 60%;
    background-size: 100% 100%;
    background-image: url(${CardDeckIcon});
    display: flex;
    margin: auto;
`;

const GameBoardClaimsCountText = styled.p`
    margin: auto;
    color: white;
    text-align: center;
`;

const GameBoardPlayerCardCountChangeAnimation1 = keyframes`
    0% {
        bottom: 20%;
        visibility: visible;
    }

    60% {
        bottom: 35%;
    }

    80% {
        bottom: 35%;
        opacity: 1;
    }

    100% {
        bottom: 35%;
        opacity: 0;
        visibility: hidden;
    }
`;

const GameBoardPlayerCardCountChange1 = styled.div`
    position: absolute;
    text-align: center;
    font-size: 1.5em;
    bottom: 20%;
    animation: ${GameBoardPlayerCardCountChangeAnimation1} 1.5s linear forwards;
`;

const GameBoardPlayerCardCountChangeAnimation2 = keyframes`
    0% {
        top: -10%;
        visibility: visible;
    }

    60% {
        top: -25%;
    }

    80% {
        top: -25%;
        opacity: 1;
    }

    100% {
        top: -25%;
        opacity: 0;
        visibility: hidden;
    }
`;

const GameBoardPlayerCardCountChange2 = styled.div`
    position: absolute;
    text-align: center;
    font-size: 1.5em;
    top: -10%;
    animation: ${GameBoardPlayerCardCountChangeAnimation2} 1.5s linear forwards;
`;

const GameBoardVacantSeat = styled.div`
    position: absolute;
    width: ${(p: GameBoardSeatComponentStyle) => p.displayStyle.getWidthString()};
    height: ${(p: GameBoardSeatComponentStyle) => p.displayStyle.getHeightString()};
`;

const GameUserSelectionAnimation = keyframes`
    0% {
        top: -27%;
    }

    50% {
        top: -34%;
    }

    100% {
        top: -27%;
    }
`;

const GameUserSelectedIcon = styled.div`
    position: absolute;
    top: -27%;
    height: 25%;
    width: 25%;
    background-size: 100% 100%;
    background-image: url(${ArrowDownIcon});
    animation: ${GameUserSelectionAnimation} 1s linear infinite;
`;

export class GameBoardComponentProps 
{
    loggedInUser: GetUser;
    gameState: GetGameState;
    gameCheat: GetGameCheat;

    gameBoardComponentStyle: GameBoardComponentStyle;
    gameBoardSeatComponentStyle: GameBoardSeatComponentStyle;
}

export class GameBoardComponentState {}

export class GameBoardComponentStyle 
{
    displayStyle: DisplayStyle;

    constructor() 
    {
        this.displayStyle = new DisplayStyle();
    }
}

export class GameBoardSeatComponentStyle 
{
    displayStyle: DisplayStyle;

    constructor() 
    {
        this.displayStyle = new DisplayStyle();
    }
}

export class GameBoardComponent extends React.Component<GameBoardComponentProps, GameBoardComponentState>
{
    constructor(props: GameBoardComponentProps) 
    {
        super(props);
    }

    render()
    {
        let gameUserIDToGameUserMapping = new Map<number, GetGameUser>();
        this.props.gameState.players.forEach((player: GetGameUser) => {
            gameUserIDToGameUserMapping.set(player.gameUserID, player)
        });

        let playerOne: JSX.Element;
        if(gameUserIDToGameUserMapping.has(1))
        {
            let selection: JSX.Element;
            if(this.props.gameState.userTurn.gameUserID===1) 
            {
                selection = (
                    <GameUserSelectedIcon></GameUserSelectedIcon>
                );
            }

            let handCountChange: JSX.Element;
            if(!isNullOrUndefined(this.props.gameState.claims) && this.props.gameState.claims.length > 0 && this.props.gameState.claims[this.props.gameState.claims.length-1].claimUser.gameUserID===1) 
            {
                handCountChange = (
                    <GameBoardPlayerCardCountChange1>
                        - {this.props.gameState.claims[this.props.gameState.claims.length-1].claims.length}
                    </GameBoardPlayerCardCountChange1>
                );
            }

            playerOne = (
                <GameBoardPlayerPanel>
                    <GameBoardPlayerName>
                        {gameUserIDToGameUserMapping.get(1).user.userID === this.props.loggedInUser.userID ? "You" : gameUserIDToGameUserMapping.get(1).user.username}
                    </GameBoardPlayerName>
                    <GameBoardPlayer
                        style={{backgroundImage: `url(${BlueGameUserIcon})`}}>                     
                        {selection}
                    </GameBoardPlayer>
                    <GameBoardPlayerCardHand
                        style={{marginTop: '50%'}}>
                        {handCountChange}
                        <GameBoardPlayerCardHandText>
                            {gameUserIDToGameUserMapping.get(1).handCount}
                        </GameBoardPlayerCardHandText>
                    </GameBoardPlayerCardHand>
                </GameBoardPlayerPanel>
            );
        }
        let playerTwo: JSX.Element;
        if(gameUserIDToGameUserMapping.has(2))
        {
            let selection: JSX.Element;
            if(this.props.gameState.userTurn.gameUserID===2) 
            {
                selection = (
                    <GameUserSelectedIcon></GameUserSelectedIcon>
                );
            }

            let handCountChange: JSX.Element;
            if(!isNullOrUndefined(this.props.gameState.claims) && this.props.gameState.claims.length > 0 && this.props.gameState.claims[this.props.gameState.claims.length-1].claimUser.gameUserID===2) 
            {
                handCountChange = (
                    <GameBoardPlayerCardCountChange1>
                        - {this.props.gameState.claims[this.props.gameState.claims.length-1].claims.length}
                    </GameBoardPlayerCardCountChange1>
                );
            }

            playerTwo = (
                <GameBoardPlayerPanel>
                    <GameBoardPlayerCardHand
                        style={{marginTop: '50%'}}>
                        {handCountChange}
                        <GameBoardPlayerCardHandText>
                            {gameUserIDToGameUserMapping.get(2).handCount}
                        </GameBoardPlayerCardHandText>
                    </GameBoardPlayerCardHand>
                    <GameBoardPlayer
                        style={{backgroundImage: `url(${GreenGameUserIcon})`}}>
                        {selection}                     
                    </GameBoardPlayer>
                    <GameBoardPlayerName>
                        {gameUserIDToGameUserMapping.get(2).user.userID === this.props.loggedInUser.userID ? "You" : gameUserIDToGameUserMapping.get(2).user.username}
                    </GameBoardPlayerName>
                </GameBoardPlayerPanel>
            );
        }
        let playerThree: JSX.Element;
        if(gameUserIDToGameUserMapping.has(3))
        {
            let selection: JSX.Element;
            if(this.props.gameState.userTurn.gameUserID===3) 
            {
                selection = (
                    <GameUserSelectedIcon></GameUserSelectedIcon>
                );
            }

            let handCountChange: JSX.Element;
            if(!isNullOrUndefined(this.props.gameState.claims) && this.props.gameState.claims.length > 0 && this.props.gameState.claims[this.props.gameState.claims.length-1].claimUser.gameUserID===3) 
            {
                handCountChange = (
                    <GameBoardPlayerCardCountChange2>
                        - {this.props.gameState.claims[this.props.gameState.claims.length-1].claims.length}
                    </GameBoardPlayerCardCountChange2>
                );
            }

            playerThree = (
                <GameBoardPlayerPanel>
                    <GameBoardPlayerName>
                        {gameUserIDToGameUserMapping.get(3).user.userID === this.props.loggedInUser.userID ? "You" : gameUserIDToGameUserMapping.get(3).user.username}
                    </GameBoardPlayerName>
                    <GameBoardPlayer
                        style={{backgroundImage: `url(${YellowGameUserIcon})`}}>
                        {selection}
                    </GameBoardPlayer>
                    <GameBoardPlayerCardHand
                        style={{marginBottom: '50%'}}>
                        {handCountChange}
                        <GameBoardPlayerCardHandText>
                            {gameUserIDToGameUserMapping.get(3).handCount}
                        </GameBoardPlayerCardHandText>
                    </GameBoardPlayerCardHand>
                </GameBoardPlayerPanel>
            );
        }
        let playerFour: JSX.Element;
        if(gameUserIDToGameUserMapping.has(4))
        {
            let selection: JSX.Element;
            if(this.props.gameState.userTurn.gameUserID===4) 
            {
                selection = (
                    <GameUserSelectedIcon></GameUserSelectedIcon>
                );
            }

            let handCountChange: JSX.Element;
            if(!isNullOrUndefined(this.props.gameState.claims) && this.props.gameState.claims.length > 0 && this.props.gameState.claims[this.props.gameState.claims.length-1].claimUser.gameUserID===4) 
            {
                handCountChange = (
                    <GameBoardPlayerCardCountChange2>
                        - {this.props.gameState.claims[this.props.gameState.claims.length-1].claims.length}
                    </GameBoardPlayerCardCountChange2>
                );
            }

            playerFour = (
                <GameBoardPlayerPanel>
                    <GameBoardPlayerCardHand
                        style={{marginBottom: '50%'}}>
                        {handCountChange}
                        <GameBoardPlayerCardHandText>
                            {gameUserIDToGameUserMapping.get(4).handCount}
                        </GameBoardPlayerCardHandText>
                    </GameBoardPlayerCardHand>
                    <GameBoardPlayer
                        style={{backgroundImage: `url(${PurpleGameUserIcon})`}}>
                        {selection}                     
                    </GameBoardPlayer>
                    <GameBoardPlayerName>
                        {gameUserIDToGameUserMapping.get(4).user.userID === this.props.loggedInUser.userID ? "You" : gameUserIDToGameUserMapping.get(4).user.username}
                    </GameBoardPlayerName>
                </GameBoardPlayerPanel>
            );
        }
        let claimsCount: JSX.Element;
        let claimCard: JSX.Element;
        
        if(!isNullOrUndefined(this.props.gameCheat)) 
        {
            let claimsCount = this.props.gameCheat.preCheatClaims.length;
            claimCard = (
                <GameClaimCardComponent
                    actualCards={this.props.gameCheat.preCheatClaims[claimsCount-1].actual}
                    claimCount={this.props.gameCheat.preCheatClaims[claimsCount-1].claims.length}
                    claimRank={this.props.gameCheat.preCheatClaims[claimsCount-1].claims[0].rank}>
                </GameClaimCardComponent>
            );
        }

        if(!isNullOrUndefined(this.props.gameState.claims) && this.props.gameState.claims.length > 0) 
        {
            let claimsCardCount = 0;
            this.props.gameState.claims.forEach((item: GetGameClaim) => {
                claimsCardCount += item.claims.length;
            });

            let lastClaim = this.props.gameState.claims[this.props.gameState.claims.length-1];

            claimsCount = (
                <GameBoardClaimsCount>
                    <GameBoardClaimsCountText>
                        {claimsCardCount}
                    </GameBoardClaimsCountText>
                </GameBoardClaimsCount>
            );
            claimCard = (
                <GameClaimCardComponent
                    claimCount={lastClaim.claims.length}
                    claimRank={lastClaim.claims[0].rank}>
                </GameClaimCardComponent>
            );
        }
        
        let claims = (
            <ClaimPanel>
                {claimsCount}
                {claimCard}
            </ClaimPanel>
        );

        return (
            <GameBoard
                displayStyle={this.props.gameBoardComponentStyle.displayStyle}>
                <GameBoardVacantSeat
                    style={{top:-100, left:-120}}
                    displayStyle={this.props.gameBoardSeatComponentStyle.displayStyle}>
                    {playerOne}
                </GameBoardVacantSeat>
                <GameBoardVacantSeat
                    style={{top:-100, right:-120}}
                    displayStyle={this.props.gameBoardSeatComponentStyle.displayStyle}>
                    {playerTwo}
                </GameBoardVacantSeat>
                <GameBoardVacantSeat
                    style={{bottom:-100, left:-120}}
                    displayStyle={this.props.gameBoardSeatComponentStyle.displayStyle}>
                    {playerThree}
                </GameBoardVacantSeat>
                <GameBoardVacantSeat
                    style={{bottom:-100, right:-120}}
                    displayStyle={this.props.gameBoardSeatComponentStyle.displayStyle}>
                    {playerFour}
                </GameBoardVacantSeat>
                {claims}
            </GameBoard>
        );
    }
}