import * as React from "react";
import styled, { keyframes, consolidateStreamedStyles } from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";
import { GetUser } from "../../models/rest/getuser";
import { GetGameState } from "../../models/rest/getgamestate";
import { GetGameUser } from "../../models/rest/getgameuser";

const GameBoard = styled.div`
    background-color: red;
    margin: auto;
    position: relative;
    top: 25%;
    border-radius: 50%;
    width: ${(p: GameBoardComponentStyle) => p.displayStyle.getWidthString()};
    height: ${(p: GameBoardComponentStyle) => p.displayStyle.getHeightString()};
`;

const GameBoardPlayer = styled.div`
    background-color: white;
`;

const GameBoardVacantSeat = styled.div`
    position: absolute;
    background-color: blue;
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
                <GameBoardPlayer>
                    {gameUserIDToGameUserMapping.get(1).handCount}
                    {gameUserIDToGameUserMapping.get(1).user.userID === this.props.loggedInUser.userID ? "You" : gameUserIDToGameUserMapping.get(1).user.username}
                </GameBoardPlayer>
            );
        }
        let playerTwo: JSX.Element;
        if(gameUserIDToGameUserMapping.has(2))
        {
            playerTwo = (
                <GameBoardPlayer>
                    {gameUserIDToGameUserMapping.get(2).handCount}
                    {gameUserIDToGameUserMapping.get(2).user.userID === this.props.loggedInUser.userID ? "You" : gameUserIDToGameUserMapping.get(2).user.username}
                </GameBoardPlayer>
            );
        }
        let playerThree: JSX.Element;
        if(gameUserIDToGameUserMapping.has(3))
        {
            playerThree = (
                <GameBoardPlayer>
                    {gameUserIDToGameUserMapping.get(3).handCount}
                    {gameUserIDToGameUserMapping.get(3).user.userID === this.props.loggedInUser.userID ? "You" : gameUserIDToGameUserMapping.get(3).user.username}
                </GameBoardPlayer>
            );
        }
        let playerFour: JSX.Element;
        if(gameUserIDToGameUserMapping.has(4))
        {
            playerFour = (
                <GameBoardPlayer>
                    {gameUserIDToGameUserMapping.get(4).handCount}
                    {gameUserIDToGameUserMapping.get(4).user.userID === this.props.loggedInUser.userID ? "You" : gameUserIDToGameUserMapping.get(4).user.username}
                </GameBoardPlayer>
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