import * as React from "react";
import styled, { keyframes, consolidateStreamedStyles } from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";
import { GetUser } from "../../models/rest/getuser";

const GameBoard = styled.div`
    background-color: red;
    margin: auto;
    position: relative;
    top: 25%;
    border-radius: 50%;
    width: ${(p: GameBoardComponentStyle) => p.displayStyle.getWidthString()};
    height: ${(p: GameBoardComponentStyle) => p.displayStyle.getHeightString()};
`;

const GameBoardSeat = styled.div`
    position: absolute;
    background-color: blue;
    width: ${(p: GameBoardSeatComponentStyle) => p.displayStyle.getWidthString()};
    height: ${(p: GameBoardSeatComponentStyle) => p.displayStyle.getHeightString()};
`;

export class GameBoardComponentProps 
{
    players: GetUser[];

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
        return (
            <GameBoard
                displayStyle={this.props.gameBoardComponentStyle.displayStyle}>
                <GameBoardSeat
                    style={{top:-100, left:-100}}
                    displayStyle={this.props.gameBoardSeatComponentStyle.displayStyle}>
                </GameBoardSeat>
                <GameBoardSeat
                    style={{top:-100, right:-100}}
                    displayStyle={this.props.gameBoardSeatComponentStyle.displayStyle}>
                </GameBoardSeat>
                <GameBoardSeat
                    style={{bottom:-100, left:-100}}
                    displayStyle={this.props.gameBoardSeatComponentStyle.displayStyle}>
                </GameBoardSeat>
                <GameBoardSeat
                    style={{bottom:-100, right:-100}}
                    displayStyle={this.props.gameBoardSeatComponentStyle.displayStyle}>
                </GameBoardSeat>
            </GameBoard>
        );
    }
}