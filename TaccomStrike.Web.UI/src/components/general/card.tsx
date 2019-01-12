import * as React from "react";
import styled, { keyframes, consolidateStreamedStyles } from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";
import { isNullOrUndefined, isNull } from "util";
import { PerspectiveStyle } from "../../styles/perspectivestyle";

const CardFront = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	visibility: ${(p: CardFrontStyle) => p.displayFront ? 'visible' : 'hidden'};
`;

const CardBackCover = styled.div`
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
`;

const CardBack = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
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
}

export class CardFrontStyle
{
	displayFront: boolean;
}

export class CardRotationAnimation
{
	rotationFrom: number;
	rotationTo: number;
	rotationDuration: number;
	rotationDelay: number;
}

export interface CardComponentProps
{
	front: JSX.Element;
	back?: JSX.Element;
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
			this.delayedRotateCard(props.rotationAnimation.rotationFrom, props.rotationAnimation.rotationTo, 1, props.rotationAnimation.rotationDuration, props.rotationAnimation.rotationDelay);
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

		let back: JSX.Element;
		if(isNullOrUndefined(this.props.back)) 
		{
			back = (
				<CardBackCover
					displayBack={displayBack}
					style={{transform: `rotateY(${180 + this.state.currentRotation}deg)`}}>
				</CardBackCover>
			);
		}
		else 
		{
			back = (
				<CardBack
					displayBack={displayBack}
					style={{transform: `rotateY(${180 + this.state.currentRotation}deg)`}}>
					{this.props.back}
				</CardBack>
			);
		}
		return (
			<Card
				displayStyle={this.props.cardStyle.displayStyle}
				perspectiveStyle={this.props.cardStyle.perspectiveStyle}>
				<CardFront
					displayFront={displayFront}
					style={{transform: `rotateY(${this.state.currentRotation}deg)`}}>
					{this.props.front}
				</CardFront>
				{back}
			</Card>
		);
	}

	delayedRotateCard(fromAngle: number, toAngle: number, direction: number, durationMiliseconds: number, delayMiliseconds: number) 
	{
		let rotationTimeout;
		if (!rotationTimeout)
		{
			rotationTimeout = setTimeout(() =>
			{
				this.setState({currentRotation: fromAngle});
				rotationTimeout = null;
				this.rotateCard(toAngle, direction, durationMiliseconds);
			}, delayMiliseconds);
		}
	}

	rotateCard(toAngle: number, direction: number, durationMiliseconds: number)
	{
		let rotationAngles = toAngle - this.state.currentRotation;
		let rotationsPerMilisecond = rotationAngles / durationMiliseconds;
		let rotationsPerInterval = rotationsPerMilisecond * 15;

		if(direction>1) {
			direction = 1;
		}
		if(direction<-1) {
			direction = -1;
		}

		let handlerID = window.setInterval(() => {
			if(direction===1 && this.state.currentRotation>=toAngle) 
			{
				this.setState({currentRotation: toAngle});
				clearInterval(handlerID);
			}
			else if(this.state.currentRotation !== toAngle)
			{
				let nextRotation = this.state.currentRotation + (rotationsPerInterval * direction);
				if(nextRotation < 0) {
					nextRotation = 365 + nextRotation;
				}
				this.setState({currentRotation: nextRotation});
			}
		}, 15);
	}

	componentDidUpdate(prevProps: CardComponentProps) 
	{
		if(prevProps.rotationAnimation !== this.props.rotationAnimation && !isNullOrUndefined(this.props.rotationAnimation)) 
		{
			console.log("component did update");
			console.log(this.props.rotationAnimation);
			this.delayedRotateCard(this.props.rotationAnimation.rotationFrom, this.props.rotationAnimation.rotationTo, 1, this.props.rotationAnimation.rotationDuration, this.props.rotationAnimation.rotationDelay);
		}
	}
}