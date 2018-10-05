import * as React from "react";
import styled from "styled-components";

const CardFront = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
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
	transform: rotateY(180deg);
`;

const Card = styled.div`
	position: relative;
	float: left;
	width: ${(p: CardStyleProps) => p.widthPercentage}%;
	height: ${(p: CardStyleProps) => p.heightPercentage}%;
`;

export interface CardStyleProps
{
	widthPercentage: number;
	heightPercentage: number;

}

export interface CardComponentProps
{
	panel: React.Component;
	cardStyling: CardStyleProps;
}

export interface CardComponentState
{
	panel: React.Component;
	cardStyling: CardStyleProps;
}

export class CardComponent extends React.Component<CardComponentProps, CardComponentState>
{
	constructor(props: CardComponentProps)
	{
		super(props);
		this.state =
		{
			panel: props.panel,
			cardStyling: props.cardStyling
		};
	}

	render()
	{
		return (
			<Card
				widthPercentage={this.state.cardStyling.widthPercentage}
				heightPercentage={this.state.cardStyling.heightPercentage}>
				<CardFront>{this.state.panel.render()}</CardFront>
				<CardBack></CardBack>
			</Card>
		);
	}
}