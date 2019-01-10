import * as React from "react";
import styled, { keyframes } from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";
import { isNullOrUndefined } from "util";
import { PerspectiveStyle } from "../../styles/perspectivestyle";
import { setInterval } from "timers";

const CardFront = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	visibility: ${(p: CardFrontStyle) => p.displayFront ? 'visible' : 'hidden'};
	transform: rotateY(${(p: CardFrontStyle) => p.rotation}deg);
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
	visibility: ${(p: CardBackStyle) => p.displayBack ? 'visible' : 'hidden'};
	transform: rotateY(${(p: CardBackStyle) => p.rotation}deg);
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

export enum CardRotationDirection 
{
	Postive,
	Negative
}

export interface CardComponentStyle
{
	displayStyle: DisplayStyle;
	perspectiveStyle: PerspectiveStyle;
}

export class CardBackStyle
{
	displayBack: boolean;
	rotation: number;
}

export class CardFrontStyle
{
	displayFront: boolean;
	rotation: number;
}

export class CardRotationAnimation
{
	rotationAngle: number;
	rotationDuration: number;
	rotationDelay: number;
}

export interface CardComponentProps
{
	panel: JSX.Element;
	cardStyle: CardComponentStyle;

	rotationAnimation: CardRotationAnimation;
}

export interface CardComponentState 
{
	currentRotation: number;
}

export class CardComponent extends React.Component<CardComponentProps, CardComponentState>
{
	constructor(props: CardComponentProps)
	{
		super(props);
		this.state = {
			currentRotation: props.cardStyle.perspectiveStyle.rotateY
		}
		if(!isNullOrUndefined(props.rotationAnimation)) 
		{
			this.delayedRotateCard(props.rotationAnimation.rotationAngle, 1, props.rotationAnimation.rotationDuration, props.rotationAnimation.rotationDelay);
		}
	}

	render()
	{
		let displayFront = true;
		let displayBack = false;

		if(this.state.currentRotation>=0 && this.state.currentRotation<90) 
		{
			displayFront = true;
			displayBack = false;
		}
		if(this.state.currentRotation>90 && this.state.currentRotation <=270) 
		{
			displayFront = false;
			displayBack = true;
		}
		return (
			<Card
				displayStyle={this.props.cardStyle.displayStyle}
				perspectiveStyle={this.props.cardStyle.perspectiveStyle}>
				<CardFront
					displayFront={displayFront}
					rotation={this.state.currentRotation}>
					{this.props.panel}
				</CardFront>
				<CardBack
					displayBack={displayBack}
					rotation={this.state.currentRotation}>
				</CardBack>
			</Card>
		);
	}

	delayedRotateCard(toAngle: number, direction: number, durationMiliseconds: number, delayMiliseconds: number) 
	{
		console.log(delayMiliseconds);
		let rotationTimeout;
		if (!rotationTimeout)
		{
			rotationTimeout = setTimeout(() =>
			{
				rotationTimeout = null;
				this.rotateCard(toAngle, direction, durationMiliseconds);
			}, delayMiliseconds);
		}
	}

	rotateCard(toAngle: number, direction: number, durationMiliseconds: number)
	{
		let rotationAngles = toAngle - this.state.currentRotation;
		let rotationsPerMilisecond = rotationAngles / durationMiliseconds;
		let rotationsPerInterval = rotationsPerMilisecond * 10;

		if(direction>1) {
			direction = 1;
		}
		if(direction<-1) {
			direction = -1;
		}
		let handleID = setInterval(() => {
			if(direction===1 && this.state.currentRotation>=toAngle) 
			{
				this.setState({currentRotation: toAngle});
				clearInterval(handleID);
			}
			else 
			{
				console.log("rotate");
				let nextRotation = this.state.currentRotation + (rotationsPerInterval * direction);
				if(nextRotation < 0) {
					nextRotation = 365 + nextRotation;
				}
				this.setState({currentRotation: nextRotation});
			}
		}, 10);
	}
}