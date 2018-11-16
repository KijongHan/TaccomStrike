import * as React from "react";
import styled from "styled-components";
import { DisplayStyling } from "../../styling/layout";

const CardFront = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: ${(p: CardFrontStyling) => p.display ? 'initial' : 'none'};
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
	transform: ${(p: CardBackStyling) => p.flipped ? 'rotateY(180deg);' : 'rotateY(0deg);'};
	display: ${(p: CardBackStyling) => p.display ? 'initial' : 'none'};
`;

const Card = styled.div`
	position: relative;
	float: left;
	width: ${(p: CardComponentStyling) => p.displayStyling.getWidthString()};
	height: ${(p: CardComponentStyling) => p.displayStyling.getHeightString()};
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
}

export class CardFrontStyling
{
	display: boolean;
	flipped: boolean;
}

export interface CardComponentProps
{
	panel: JSX.Element;
	cardStyling: CardComponentStyling;

	cardOrientation: CardOrientation;
}

export interface CardComponentState
{
	panel: JSX.Element;
	cardStyling: CardComponentStyling;

	cardOrientation: CardOrientation;
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
			cardOrientation: props.cardOrientation
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

		return (
			<Card
				displayStyling={this.state.cardStyling.displayStyling}>
				<CardFront display={displayFront} flipped={cardFlipped}>{this.state.panel}</CardFront>
				<CardBack display={displayBack} flipped={cardFlipped}></CardBack>
			</Card>
		);
	}

	flip()
	{

	}

	componentDidUpdate(prevProps: CardComponentProps, prevState: CardComponentState)
	{
		if (this.props.cardStyling !== prevProps.cardStyling)
		{
			this.setState({ cardStyling: this.props.cardStyling, panel: this.props.panel });
		}
	}
}