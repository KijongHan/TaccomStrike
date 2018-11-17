import * as React from "react";
import styled, { keyframes } from "styled-components";
import { DisplayStyling } from "../../styling/layout";
import { isNullOrUndefined } from "util";

const CardFront = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	${(p: CardFrontStyling) => isNullOrUndefined(p.flipAnimation) ? '' : `animation: ${CardFlip_2} ${p.flipAnimation.flipDuration / 2}s ${p.flipAnimation.flipDelay}s forwards`};
	visibility: ${(p: CardFrontStyling) => p.display ? 'visible' : 'hidden'};
	transform: ${(p: CardFrontStyling) => p.flipped ? 'rotateY(180deg);' : 'rotateY(0deg);'};
`;

const CardBack = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: black;
	border-style: solid;
	border-width: 4px;
	border-color: rgba(180, 180, 180, 0.7);
	${(p: CardBackStyling) => isNullOrUndefined(p.flipAnimation) ? '' : `animation: ${CardFlip_1} ${p.flipAnimation.flipDuration / 2}s ${p.flipAnimation.flipDelay}s forwards`};
	transform: ${(p: CardBackStyling) => p.flipped ? 'rotateY(180deg);' : 'rotateY(0deg);'};
	visibility: ${(p: CardBackStyling) => p.display ? 'visible' : 'hidden'};
`;

const Card = styled.div`
	position: relative;
	float: left;
	width: ${(p: CardComponentStyling) => p.displayStyling.getWidthString()};
	height: ${(p: CardComponentStyling) => p.displayStyling.getHeightString()};
`;

const CardFlip_1 = keyframes`
	0% {
		transform: rotateY(180deg);
	}
	
	50% {
		transform: rotateY(90deg);
		visibility: hidden;
	}

	100% {
		transform: rotateY(0deg);
		visibility: hidden;
	}
`;

const CardFlip_2 = keyframes`
	0% {
		transform: rotateY(180deg);
	}
	
	50% {
		transform: rotateY(90deg);
		visibility: visible;
	}

	100% {
		transform: rotateY(0deg);
		visibility: visible;
	}
`;

export enum CardOrientation
{
	Front,
	Back
}

export interface CardComponentStyling
{
	displayStyling: DisplayStyling;
}

export class CardBackStyling
{
	display: boolean;
	flipped: boolean;

	flipAnimation: CardFlipAnimation;
}

export class CardFrontStyling
{
	display: boolean;
	flipped: boolean;

	flipAnimation: CardFlipAnimation;
}

export class CardFlipAnimation
{
	flipDuration: number;
	flipDelay: number;
}

export interface CardComponentProps
{
	panel: JSX.Element;
	cardStyling: CardComponentStyling;

	cardOrientation: CardOrientation;
	flipAnimation: CardFlipAnimation;
}

export interface CardComponentState
{
	panel: JSX.Element;
	cardStyling: CardComponentStyling;

	cardOrientation: CardOrientation;
	flipAnimation: CardFlipAnimation;
}

export class CardComponent extends React.Component<CardComponentProps, CardComponentState>
{
	constructor(props: CardComponentProps)
	{
		super(props);
		this.state =
		{
			panel: props.panel,
			cardStyling: props.cardStyling,
			cardOrientation: props.cardOrientation,
			flipAnimation: props.flipAnimation
		};
	}

	render()
	{
		let displayBack: boolean;
		let displayFront: boolean;

		let cardFlipped: boolean;
		if (this.state.cardOrientation == CardOrientation.Front)
		{
			displayBack = false;
			displayFront = true;
			cardFlipped = false;
		}
		else
		{
			displayBack = true;
			displayFront = false;
			cardFlipped = true;
		}

		console.log("iluyg " + this.state.flipAnimation);
		return (
			<Card
				displayStyling={this.state.cardStyling.displayStyling}>
				<CardFront flipAnimation={this.state.flipAnimation} display={displayFront} flipped={cardFlipped}>{this.state.panel}</CardFront>
				<CardBack flipAnimation={this.state.flipAnimation} display={displayBack} flipped={cardFlipped}></CardBack>
			</Card>
		);
	}

	componentDidUpdate(prevProps: CardComponentProps, prevState: CardComponentState)
	{
		if (this.props.cardStyling !== prevProps.cardStyling)
		{
			this.setState({ cardStyling: this.props.cardStyling, panel: this.props.panel });
		}
		if (this.props.flipAnimation !== prevProps.flipAnimation)
		{
			this.setState({ flipAnimation: this.props.flipAnimation });
		}
	}
}