import * as React from "react";
import styled, { keyframes, consolidateStreamedStyles } from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";
import { GetUser } from "../../models/rest/getuser";
import { GetGameState } from "../../models/rest/getgamestate";
import { GetGameUser } from "../../models/rest/getgameuser";

const PersonIcon = require("../../res/person.png");
const CardHandIcon = require("../../res/card_hand.png");

const GameBoard = styled.div`
    background-color: red;
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
    background-image: url(${PersonIcon});
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

const GameBoardVacantSeat = styled.div`
    position: absolute;
    width: ${(p: GameBoardSeatComponentStyle) => p.displayStyle.getWidthString()};
    height: ${(p: GameBoardSeatComponentStyle) => p.displayStyle.getHeightString()};
`;

export class GameBoardComponentProps 
{
    loggedInUser: GetUser;
    gameState: GetGameState;

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
            playerOne = (
                <GameBoardPlayerPanel>
                    <GameBoardPlayerName>
                        {gameUserIDToGameUserMapping.get(1).user.userID === this.props.loggedInUser.userID ? "You" : gameUserIDToGameUserMapping.get(1).user.username}
                    </GameBoardPlayerName>
                    <GameBoardPlayer>                     
                    </GameBoardPlayer>
                    <GameBoardPlayerCardHand
                        style={{marginTop: '50%'}}>
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
            playerTwo = (
                <GameBoardPlayerPanel>
                    <GameBoardPlayerCardHand
                        style={{marginTop: '50%'}}>
                        <GameBoardPlayerCardHandText>
                            {gameUserIDToGameUserMapping.get(2).handCount}
                        </GameBoardPlayerCardHandText>
                    </GameBoardPlayerCardHand>
                    <GameBoardPlayer>                     
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
            playerThree = (
                <GameBoardPlayerPanel>
                    <GameBoardPlayerName>
                        {gameUserIDToGameUserMapping.get(3).user.userID === this.props.loggedInUser.userID ? "You" : gameUserIDToGameUserMapping.get(3).user.username}
                    </GameBoardPlayerName>
                    <GameBoardPlayer>                     
                    </GameBoardPlayer>
                    <GameBoardPlayerCardHand
                        style={{marginBottom: '50%'}}>
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
            playerFour = (
                <GameBoardPlayerPanel>
                    <GameBoardPlayerCardHand
                        style={{marginBottom: '50%'}}>
                        <GameBoardPlayerCardHandText>
                            {gameUserIDToGameUserMapping.get(4).handCount}
                        </GameBoardPlayerCardHandText>
                    </GameBoardPlayerCardHand>
                    <GameBoardPlayer>                     
                    </GameBoardPlayer>
                    <GameBoardPlayerName>
                        {gameUserIDToGameUserMapping.get(4).user.userID === this.props.loggedInUser.userID ? "You" : gameUserIDToGameUserMapping.get(4).user.username}
                    </GameBoardPlayerName>
                </GameBoardPlayerPanel>
            );
        }
        return (
            <GameBoard
                displayStyle={this.props.gameBoardComponentStyle.displayStyle}>
                <GameBoardVacantSeat
                    style={{top:-100, left:-100}}
                    displayStyle={this.props.gameBoardSeatComponentStyle.displayStyle}>
                    {playerOne}
                </GameBoardVacantSeat>
                <GameBoardVacantSeat
                    style={{top:-100, right:-100}}
                    displayStyle={this.props.gameBoardSeatComponentStyle.displayStyle}>
                    {playerTwo}
                </GameBoardVacantSeat>
                <GameBoardVacantSeat
                    style={{bottom:-100, left:-100}}
                    displayStyle={this.props.gameBoardSeatComponentStyle.displayStyle}>
                    {playerThree}
                </GameBoardVacantSeat>
                <GameBoardVacantSeat
                    style={{bottom:-100, right:-100}}
                    displayStyle={this.props.gameBoardSeatComponentStyle.displayStyle}>
                    {playerFour}
                </GameBoardVacantSeat>
            </GameBoard>
        );
    }
}