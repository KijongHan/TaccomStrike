import * as React from "react";
import styled from "styled-components";
import { GetGameCard } from "../../models/rest/getgamecard";
import { CardComponent, CardComponentStyle, CardSlideAnimation, CardRotationAnimation } from "../general/card";
import { DisplayStyle } from "../../styles/displaystyle";
import { PerspectiveStyle } from "../../styles/perspectivestyle";
import { isNullOrUndefined } from "util";
import { string } from "prop-types";

const RedDiamond = require("../../res/red_diamond.png");
const RedHeart = require("../../res/red_heart.png");
const BlackSpade = require("../../res/black_spade.png");
const BlackClover = require("../../res/black_clover.png");
const CardDeckIcon = require("../../res/card_deck.png");

const GameCardFace = styled.div`
    height: 100%;
    width: 100%;
    border: 1px solid black;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
`;

const GameCardFaceText = styled.div`
    margin: auto;
    text-align: center;
`;

const GameCardBack = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 1);
    display: flex;
`;

const GameCardBackText = styled.p`
    color: white;
    margin: auto;
    text-align: center;
    font-family: "Times New Roman"
`;

const GameBoardClaimsCount = styled.div`
    width: 30%;
    height: 35%;
    background-size: 100% 100%;
    background-image: url(${CardDeckIcon});
    display: flex;
    margin: auto;
`;

const GameBoardClaimsCountText = styled.p`
    margin: auto;
    text-align: center;
    font-family: "Times New Roman"
`;

export class GameClaimCardComponentState 
{
    rotationAnimation: CardRotationAnimation;
    staticAnimation: CardRotationAnimation;
}

export class GameClaimCardComponentProps 
{
    claimCount: number;
    claimRank: string;
    actualCards?: GetGameCard[];
    claimsCardCount?: number;
}

export class GameClaimCardComponent extends React.Component<GameClaimCardComponentProps, GameClaimCardComponentState> 
{
    constructor(props: GameClaimCardComponentProps) 
    {
        super(props);
        this.state = {
            rotationAnimation: new CardRotationAnimation({
                rotationFrom: 180,
                rotationTo: 359.99,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 500
            }),
            staticAnimation: new CardRotationAnimation({
                rotationFrom: 180,
                rotationTo: 180,
                rotationDuration: 1,
                rotationDelay: 0,
                rotationDirection: 1
            })
        };
    }

    render() 
    {
        let cardStyle: CardComponentStyle =
		{
			displayStyle: new DisplayStyle({widthPercentage: 50, heightPercentage: 75, marginString: 'auto'}),
			perspectiveStyle: new PerspectiveStyle({perspective: 1200, rotateY: 180})
        };
        let cardFront: JSX.Element;

        let rotationAnimation: CardRotationAnimation;
        if(!isNullOrUndefined(this.props.actualCards)) 
        {
            let rankToCountMapping = new Map<string, number>();
            this.props.actualCards.forEach((value: GetGameCard) => {
                if(rankToCountMapping.has(value.rank)) 
                {
                    rankToCountMapping.set(value.rank, rankToCountMapping.get(value.rank)+1)
                }
                else 
                {
                    rankToCountMapping.set(value.rank, 1);
                }
            });

            let texts: JSX.Element[] = []; 
            rankToCountMapping.forEach((value: number, key: string) => {
                texts.push(
                    (
                        <div>
                            (×{value}) {key}
                        </div>
                    )
                );
            });
            rotationAnimation = this.state.rotationAnimation;
            cardFront = (
                <GameCardFace>
                    <GameCardFaceText>
                        {texts}
                    </GameCardFaceText>
                </GameCardFace>
            );
        }
        else 
        {
            rotationAnimation = this.state.staticAnimation;
        }

        let cardBack = (
            <GameCardBack>
                <GameCardBackText>
                    (×{this.props.claimCount}) {this.props.claimRank}
                </GameCardBackText>
                <GameBoardClaimsCount>
                    <GameBoardClaimsCountText>
                        {this.props.claimsCardCount}
                    </GameBoardClaimsCountText>
                </GameBoardClaimsCount>
            </GameCardBack>
        );

        return (
            <CardComponent
                front={cardFront}
                back={cardBack}
                cardStyle={cardStyle}
                rotationAnimation={rotationAnimation}>
            </CardComponent>
        );
    }
}