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
	slideFrom: number;
	slideTo: number;
	slideDuration: number;
	slideDelay: number;

	constructor(init?: Partial<CardSlideAnimation>) 
	{
		Object.assign(this, init);
	}
}

export interface CardComponentProps
{
	front: JSX.Element;
	back?: JSX.Element;
	cardStyle: CardComponentStyle;
	isSelected?: boolean;

	rotationAnimation?: CardRotationAnimation;
	slideAnimation?: CardSlideAnimation;

	hoverAnimation?: CardRotationAnimation | CardSlideAnimation;
}

export interface CardComponentState 
{
	currentRotation: number;
	currentTopOffset: number;

	animationHandlerID: number;
	animationDelayHandlerID: number;
}

export class CardComponent extends React.Component<CardComponentProps, CardComponentState>
{
	constructor(props: CardComponentProps)
	{
		super(props);
		this.state = {
			currentRotation: props.cardStyle.perspectiveStyle.rotateY,
			currentTopOffset: 0,
			animationHandlerID: null,
			animationDelayHandlerID: null
		}
	}

	getBack = (displayBack: boolean) => 
	{
		let topOffset: number;
		let bottomOffset: number;

		if(isNullOrUndefined(this.props.isSelected) || this.props.isSelected===false)
		{
			topOffset = this.state.currentTopOffset;
			bottomOffset = -1 * this.state.currentTopOffset
		}
		else if(this.props.isSelected===true && this.props.hoverAnimation instanceof CardSlideAnimation)
		{
			window.clearInterval(this.state.animationHandlerID);
			topOffset = this.props.hoverAnimation.slideTo;
			bottomOffset = -1 * this.props.hoverAnimation.slideTo;
		}
		if(isNullOrUndefined(this.props.back)) 
		{
			return (
				<CardBackCover
					displayBack={displayBack}
					style={{
						transform: `rotateY(${180 + this.state.currentRotation}deg)`,
						top: `${topOffset}%`,
						bottom: `${bottomOffset}%`
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
						top: `${topOffset}%`,
						bottom: `${bottomOffset}%`
					}}>
					{this.props.back}
				</CardBack>
			);
		}
	}

	getFront = (displayFront: boolean) => 
	{
		let topOffset: number;
		let bottomOffset: number;

		if(isNullOrUndefined(this.props.isSelected) || this.props.isSelected===false)
		{
			topOffset = this.state.currentTopOffset;
			bottomOffset = -1 * this.state.currentTopOffset
		}
		else if(this.props.isSelected===true && this.props.hoverAnimation instanceof CardSlideAnimation)
		{
			window.clearInterval(this.state.animationHandlerID);
			topOffset = this.props.hoverAnimation.slideTo;
			bottomOffset = -1 * this.props.hoverAnimation.slideTo;
		}
		return (
			<CardFront
				displayFront={displayFront}
				style={{
					transform: `rotateY(${this.state.currentRotation}deg)`,
					top: `${topOffset}%`,
					bottom: `${bottomOffset}%`
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
			if(this.props.hoverAnimation instanceof CardRotationAnimation) 
			{
				this.delayedRotateCard(this.props.hoverAnimation);
			}
			if(this.props.hoverAnimation instanceof CardSlideAnimation) 
			{
				this.delayedSlideCard(this.props.hoverAnimation);
			}
		}
	}

	onMouseLeaveEventHandler = () => 
	{
		if(!isNullOrUndefined(this.props.hoverAnimation)) 
		{
			if(this.props.hoverAnimation instanceof CardRotationAnimation) 
			{
				window.clearTimeout(this.state.animationDelayHandlerID);
				window.clearInterval(this.state.animationHandlerID);
				this.setState({currentRotation: this.props.hoverAnimation.rotationFrom});
			}
			if(this.props.hoverAnimation instanceof CardSlideAnimation) 
			{
				window.clearTimeout(this.state.animationDelayHandlerID);
				window.clearInterval(this.state.animationHandlerID);
				this.setState({currentTopOffset: this.props.hoverAnimation.slideFrom});
			}
		}
	}

	delayedRotateCard = (rotationAnimation: CardRotationAnimation) =>
	{
		if(!isNullOrUndefined(this.state.animationDelayHandlerID)) 
		{
			window.clearTimeout(this.state.animationDelayHandlerID);
		}
		if(!isNullOrUndefined(this.state.animationHandlerID)) 
		{
			window.clearInterval(this.state.animationHandlerID);
		}

		let handlerID = window.setTimeout(() =>
		{
			this.setState({
				currentRotation: rotationAnimation.rotationFrom,
				animationDelayHandlerID: null
			});
			this.rotateCard(rotationAnimation.rotationTo, rotationAnimation.rotationDirection, rotationAnimation.rotationDuration);
		}, rotationAnimation.rotationDelay);
		this.setState({animationDelayHandlerID: handlerID});
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
				clearInterval(this.state.animationHandlerID);
				this.setState({animationHandlerID: null});
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
		this.setState({animationHandlerID: handlerID});
	}

	delayedSlideCard = (cardSlideAnimation: CardSlideAnimation) => 
	{
		if(!isNullOrUndefined(this.state.animationDelayHandlerID)) 
		{
			window.clearTimeout(this.state.animationDelayHandlerID);
		}
		if(!isNullOrUndefined(this.state.animationHandlerID)) 
		{
			window.clearInterval(this.state.animationHandlerID);
		}

		let handlerID = window.setTimeout(() =>
		{
			this.setState({
				currentTopOffset: cardSlideAnimation.slideFrom,
				animationDelayHandlerID: null
			});
			this.slideCard(cardSlideAnimation.slideTo, cardSlideAnimation.slideDuration);
		}, cardSlideAnimation.slideDelay);
		this.setState({animationDelayHandlerID: handlerID});
	}

	slideCard = (to: number, durationMiliseconds: number) => 
	{
		let slideDistance = to - this.state.currentRotation;
		let distancePerMilisecond = slideDistance / durationMiliseconds;
		let distancePerInterval = distancePerMilisecond * 15;

		let handlerID = window.setInterval(() => {
			if(this.state.currentTopOffset<=to)
			{
				this.setState({currentTopOffset: to});
				clearInterval(this.state.animationHandlerID);
				this.setState({animationHandlerID: null});
			}
			else if(this.state.currentTopOffset !== to)
			{
				let nextDistance = this.state.currentTopOffset + distancePerInterval;
				this.setState({currentTopOffset: nextDistance});
			}
		}, 15);
		this.setState({animationHandlerID: handlerID});
	}

	componentDidUpdate(prevProps: CardComponentProps) 
	{
		if(prevProps.rotationAnimation !== this.props.rotationAnimation && !isNullOrUndefined(this.props.rotationAnimation)) 
		{
			this.delayedRotateCard(this.props.rotationAnimation);
		}
		if(prevProps.slideAnimation !== this.props.slideAnimation && !isNullOrUndefined(this.props.slideAnimation)) 
		{
			this.delayedSlideCard(this.props.slideAnimation);
		}
	}

	componentDidMount() 
	{
		if(!isNullOrUndefined(this.props.rotationAnimation)) 
		{
			this.delayedRotateCard(this.props.rotationAnimation);
		}
		if(!isNullOrUndefined(this.props.slideAnimation)) 
		{
			this.delayedSlideCard(this.props.slideAnimation);
		}
	}
}