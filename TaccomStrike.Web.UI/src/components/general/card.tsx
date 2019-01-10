import * as React from "react";
import styled, { keyframes } from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";
import { isNullOrUndefined } from "util";
import { PerspectiveStyle } from "../../styles/perspectivestyle";

const CardFront = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	${
		(p: CardFrontStyle) => isNullOrUndefined(p.tiltAnimation) ? '' :
		`animation: ${CardTilt(p.startRotation, p.endRotation)} ${p.tiltAnimation.tiltDuration}s ${p.tiltAnimation.tiltDelay}s forwards`
	};
	${
		(p: CardFrontStyle) => isNullOrUndefined(p.flipAnimation) ? '' :
		`animation: ${CardFlip(180, 'visible')} ${p.flipAnimation.flipDuration / 2}s ${p.flipAnimation.flipDelay}s forwards`
	};
	visibility: ${(p: CardFrontStyle) => p.displayFront ? 'visible' : 'hidden'};
	transform: ${(p: CardFrontStyle) => p.flipped ? 'rotateY(180deg);' : 'rotateY(0deg);'};
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
	${
		(p: CardBackStyle) => isNullOrUndefined(p.tiltAnimation) ? '' :
		`animation: ${CardTilt(p.startRotation, p.endRotation)} ${p.tiltAnimation.tiltDuration}s ${p.tiltAnimation.tiltDelay}s forwards`
	};
	${
		(p: CardBackStyle) => isNullOrUndefined(p.flipAnimation) ? '' :
		`animation: ${CardFlip(180, 'hidden')} ${p.flipAnimation.flipDuration / 2}s ${p.flipAnimation.flipDelay}s forwards`
	};
	transform: ${(p: CardBackStyle) => p.flipped ? 'rotateY(180deg);' : 'rotateY(0deg);'};
	visibility: ${(p: CardBackStyle) => p.displayBack ? 'visible' : 'hidden'};
`;

const Card = styled.div`
	position: relative;
	float: left;
	width: ${(p: CardComponentStyle) => p.displayStyle.getWidthString()};
	height: ${(p: CardComponentStyle) => p.displayStyle.getHeightString()};
	margin: ${(p : CardComponentStyle) => p.displayStyle.getMarginString()};
	-webkit-perspective: ${(p : CardComponentStyle) => p.perspectiveStyle.getPerspectiveString()};
	perspective: ${(p : CardComponentStyle) => p.perspectiveStyle.getPerspectiveString()};
`;

function CardTilt(startRotation: number, endRotation: number)
{
	return keyframes`
		0% {
			transform: rotateY(${startRotation}deg);
		}

		100% {
			transform: rotateY(${endRotation}deg);
		}
	`;
}

function CardFlip(startRotation: number, endVisibility: string)
{
	return keyframes`
		0% {
			transform: rotateY(${startRotation}deg);
		}
	
		50% {
			transform: rotateY(90deg);
			visibility: ${endVisibility};
		}

		100% {
			transform: rotateY(0deg);
			visibility: ${endVisibility};
		}
	`;
}

export enum CardOrientation
{
	Front,
	Back
}

export interface CardComponentStyle
{
	displayStyle: DisplayStyle;
	perspectiveStyle: PerspectiveStyle;
}

export class CardBackStyle
{
	displayBack: boolean;
	flipped: boolean;

	flipAnimation: CardFlipAnimation;
	tiltAnimation: CardTiltAnimation;

	startRotation: number;
	endRotation: number;
}

export class CardFrontStyle
{
	displayFront: boolean;
	flipped: boolean;

	flipAnimation: CardFlipAnimation;
	tiltAnimation: CardTiltAnimation;

	startRotation: number;
	endRotation: number;
}

export class CardFlipAnimation
{
	flipDuration: number;
	flipDelay: number;
}

export class CardTiltAnimation
{
	tiltDuration: number;
	tiltDelay: number;
	tiltAngle: number;
}

export interface CardComponentProps
{
	panel: JSX.Element;
	cardStyle: CardComponentStyle;

	cardOrientation: CardOrientation;
	flipAnimation: CardFlipAnimation;
	tiltAnimation: CardTiltAnimation;
}

export interface CardComponentState {}

export class CardComponent extends React.Component<CardComponentProps, CardComponentState>
{
	constructor(props: CardComponentProps)
	{
		super(props);
	}

	render()
	{
		let displayBack: boolean;
		let displayFront: boolean;

		let cardFlipped: boolean;
		if (this.props.cardOrientation == CardOrientation.Front)
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

		let startRotation: number;
		let endRotation: number;
		if (this.props.tiltAnimation != null)
		{
			if (cardFlipped)
			{
				startRotation = 180;
			}
			else
			{
				startRotation = 0;
			}

			endRotation = this.props.tiltAnimation.tiltAngle + startRotation;
		}
		
		return (
			<Card
				displayStyle={this.props.cardStyle.displayStyle}
				perspectiveStyle={this.props.cardStyle.perspectiveStyle}>
				<CardFront
					flipAnimation={this.props.flipAnimation}
					tiltAnimation={this.props.tiltAnimation}
					displayFront={displayFront}
					flipped={cardFlipped}
					startRotation={startRotation}
					endRotation={endRotation}>{this.props.panel}
				</CardFront>
				<CardBack
					flipAnimation={this.props.flipAnimation}
					tiltAnimation={this.props.tiltAnimation}
					displayBack={displayBack}
					flipped={cardFlipped}
					startRotation={startRotation}
					endRotation={endRotation}></CardBack>
			</Card>
		);
	}
}