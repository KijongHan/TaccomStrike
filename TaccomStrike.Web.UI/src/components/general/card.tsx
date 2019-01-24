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
	position: ${(p: CardComponentStyle) => p.displayStyle.getPositionString()};
	display: inline-block;
	left: ${(p: CardComponentStyle) => p.displayStyle.getLeftString()};
	top: ${(p: CardComponentStyle) => p.displayStyle.getTopString()};
	bottom: ${(p: CardComponentStyle) => p.displayStyle.getBottomString()};
	right: ${(p: CardComponentStyle) => p.displayStyle.getRightString()};
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

export class CardComponentStyle
{
	displayStyle: DisplayStyle;
	perspectiveStyle: PerspectiveStyle;

	constructor() 
	{
		this.displayStyle = new DisplayStyle();
		this.perspectiveStyle = new PerspectiveStyle();
	}
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
	rotationDirection: number;
	rotationDuration: number;
	rotationDelay: number;

	constructor(init?: Partial<CardRotationAnimation>) 
	{
		Object.assign(this, init);
	}
}

export class CardSlideAnimation 
{
	slideTop: number;
	slideLeft: number;
	slideRight: number;
	slideBottom: number;
	slideDuration: number;
	slideDelay: number;
}

export interface CardComponentProps
{
	front: JSX.Element;
	back?: JSX.Element;
	cardStyle: CardComponentStyle;

	rotationAnimation?: CardRotationAnimation;
	slideAnimation?: CardSlideAnimation;

	hoverAnimation?: CardRotationAnimation | CardSlideAnimation;
}

export interface CardComponentState 
{
	currentRotation: number;
	currentTopOffset: number;

	rotationAnimationHandlerID: number;
	slideAnimationHandlerID: number;
	rotationTimeoutHandlerID: number;
	slideTimeoutHandlerID: number;
}

export class CardComponent extends React.Component<CardComponentProps, CardComponentState>
{
	constructor(props: CardComponentProps)
	{
		super(props);
		this.state = {
			currentRotation: props.cardStyle.perspectiveStyle.rotateY,
			currentTopOffset: 0,
			rotationAnimationHandlerID: null,
			slideAnimationHandlerID: null,
			rotationTimeoutHandlerID: null,
			slideTimeoutHandlerID: null
		}
	}

	getBack = (displayBack: boolean) => 
	{
		if(isNullOrUndefined(this.props.back)) 
		{
			return (
				<CardBackCover
					displayBack={displayBack}
					style={{
						transform: `rotateY(${180 + this.state.currentRotation}deg)`,
						top: `${this.state.currentTopOffset}`
					}}>
				</CardBackCover>
			);
		}
		else 
		{
			return (
				<CardBack
					displayBack={displayBack}
					style={{
						transform: `rotateY(${180 + this.state.currentRotation}deg)`,
						top: `${this.state.currentTopOffset}`
					}}>
					{this.props.back}
				</CardBack>
			);
		}
	}

	getFront = (displayFront: boolean) => 
	{
		return (
			<CardFront
				displayFront={displayFront}
				style={{
					transform: `rotateY(${this.state.currentRotation}deg)`,
					top: `${this.state.currentTopOffset}`
				}}>
				{this.props.front}
			</CardFront>
		);
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

		let back = this.getBack(displayBack);
		let front = this.getFront(displayFront);
		
		return (
			<Card
				onMouseEnter={this.onMouseEnterEventHandler}
				onMouseLeave={this.onMouseLeaveEventHandler}
				displayStyle={this.props.cardStyle.displayStyle}
				perspectiveStyle={this.props.cardStyle.perspectiveStyle}>
				{front}
				{back}
			</Card>
		);
	}

	onMouseEnterEventHandler = () => 
	{
		if(!isNullOrUndefined(this.props.hoverAnimation)) 
		{
			console.log(this.props.hoverAnimation);
			if(this.props.hoverAnimation instanceof CardRotationAnimation) 
			{
				console.log("here");
				this.delayedRotateCard(this.props.hoverAnimation);
			}
		}
	}

	onMouseLeaveEventHandler = () => 
	{
		if(!isNullOrUndefined(this.props.hoverAnimation)) 
		{
			if(this.props.hoverAnimation instanceof CardRotationAnimation) 
			{
				console.log("leave");
				window.clearTimeout(this.state.rotationTimeoutHandlerID);
				window.clearInterval(this.state.rotationAnimationHandlerID);
				this.setState({currentRotation: this.props.hoverAnimation.rotationFrom});
			}
		}
	}

	delayedRotateCard = (rotationAnimation: CardRotationAnimation) =>
	{
		if(!isNullOrUndefined(this.state.rotationTimeoutHandlerID)) 
		{
			window.clearTimeout(this.state.rotationTimeoutHandlerID);
		}
		if(!isNullOrUndefined(this.state.rotationAnimationHandlerID)) 
		{
			window.clearInterval(this.state.rotationAnimationHandlerID);
		}

		let handlerID = window.setTimeout(() =>
		{
			this.setState({
				currentRotation: rotationAnimation.rotationFrom,
				rotationTimeoutHandlerID: null
			});
			this.rotateCard(rotationAnimation.rotationTo, rotationAnimation.rotationDirection, rotationAnimation.rotationDuration);
		}, rotationAnimation.rotationDelay);
		this.setState({rotationTimeoutHandlerID: handlerID});
	}

	rotateCard = (toAngle: number, direction: number, durationMiliseconds: number) =>
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
				clearInterval(this.state.rotationAnimationHandlerID);
				this.setState({rotationAnimationHandlerID: null});
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
		this.setState({rotationAnimationHandlerID: handlerID});
	}

	slideCard = () => 
	{
		
	}

	componentDidUpdate(prevProps: CardComponentProps) 
	{
		if(prevProps.rotationAnimation !== this.props.rotationAnimation && !isNullOrUndefined(this.props.rotationAnimation)) 
		{
			this.delayedRotateCard(this.props.rotationAnimation);
		}
	}

	componentDidMount() 
	{
		if(!isNullOrUndefined(this.props.rotationAnimation)) 
		{
			this.delayedRotateCard(this.props.rotationAnimation);
		}
	}
}