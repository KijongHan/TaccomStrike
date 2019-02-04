import * as React from "react";
import styled from "styled-components";
import { CardComponent, CardComponentStyle, CardSlideAnimation, CardRotationAnimation } from "../general/card";
import { GetGameCard } from "../../models/rest/getgamecard";

const RedDiamond = require("../../res/red_diamond.png");
const RedHeart = require("../../res/red_heart.png");
const BlackSpade = require("../../res/black_spade.png");
const BlackClover = require("../../res/black_clover.png");

const GameCardFace = styled.div`
    height: 100%;
    width: 100%;
    border: 1px solid black;
    background-color: rgba(255, 255, 255, 1);
`;

const GameCardIcon = styled.div`
    width: 30px;
    height: 38px;
    line-height: 30px;
    text-align: center;
    color: white;
    font-weight: bold;
    background-size: 100% 100%;
`;

export class GameCardComponentProps 
{
    gameCard: GetGameCard;
    gameCardComponentStyle: GameCardComponentStyle;
    gameCardClickHandler: (gameCard: GetGameCard) => void;
    isSelected: boolean;
}

export class GameCardComponentState {}

export class GameCardComponentStyle 
{
    cardComponentStyle: CardComponentStyle;
    cardHoverAnimation: CardSlideAnimation | CardRotationAnimation;
}

export class GameCardComponent extends React.Component<GameCardComponentProps, GameCardComponentState> 
{
    constructor(props: GameCardComponentProps) 
    {
        super(props);
    }

    render()
    {
        let gameCardIcon1: JSX.Element;
        let gameCardIcon2: JSX.Element;

        if(this.props.gameCard.suit==="Heart") {
            gameCardIcon1 = (
                <GameCardIcon
                    style={{
                        backgroundImage: `url(${RedHeart})`
                    }}>
                    {this.props.gameCard.rank}
                </GameCardIcon>
            );
            gameCardIcon2 = (
                <GameCardIcon
                    style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        transform: "rotateX(180deg)",
                        backgroundImage: `url(${RedHeart})`
                    }}>
                    {this.props.gameCard.rank}
                </GameCardIcon>
            );
        }
        if(this.props.gameCard.suit==="Diamond") {
            gameCardIcon1 = (
                <GameCardIcon
                    style={{
                        backgroundImage: `url(${RedDiamond})`
                    }}>
                    {this.props.gameCard.rank}
                </GameCardIcon>
            );
            gameCardIcon2 = (
                <GameCardIcon
                    style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        transform: "rotateX(180deg)",
                        backgroundImage: `url(${RedDiamond})`
                    }}>
                    {this.props.gameCard.rank}
                </GameCardIcon>
            );
        }
        if(this.props.gameCard.suit==="Spade") {
            gameCardIcon1 = (
                <GameCardIcon
                    style={{
                        backgroundImage: `url(${BlackSpade})`
                    }}>
                    {this.props.gameCard.rank}
                </GameCardIcon>
            );
            gameCardIcon2 = (
                <GameCardIcon
                    style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        transform: "rotateX(180deg)",
                        backgroundImage: `url(${BlackSpade})`
                    }}>
                    {this.props.gameCard.rank}
                </GameCardIcon>
            );
        }
        if(this.props.gameCard.suit==="Clover") {
            gameCardIcon1 = (
                <GameCardIcon
                    style={{
                        backgroundImage: `url(${BlackClover})`
                    }}>
                    {this.props.gameCard.rank}
                </GameCardIcon>
            );
            gameCardIcon2 = (
                <GameCardIcon
                    style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        transform: "rotateX(180deg)",
                        backgroundImage: `url(${BlackClover})`
                    }}>
                    {this.props.gameCard.rank}
                </GameCardIcon>
            );
        }
        let gameCardFace = (
            <GameCardFace
                onClick={this.gameCardClickHandler}>
                {gameCardIcon1}
                {gameCardIcon2}
            </GameCardFace>
        );

        let cardStyle = this.props.gameCardComponentStyle.cardComponentStyle
        let hoverAnimation = this.props.gameCardComponentStyle.cardHoverAnimation
        
        return (
            <CardComponent
                isSelected={this.props.isSelected}
                front={gameCardFace}
                cardStyle={cardStyle}
                hoverAnimation={hoverAnimation}>
            </CardComponent>
        );
    }

    gameCardClickHandler = () => 
    {
        this.props.gameCardClickHandler(this.props.gameCard);
    }
}