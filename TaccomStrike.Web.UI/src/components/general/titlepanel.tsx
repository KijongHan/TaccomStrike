import * as React from "react";
import { CardComponent, CardComponentStyling, CardOrientation, CardFlipAnimation } from "./card";

import styled from "styled-components"
import { DisplayStyling } from "../../styling/layout";

export class TitlePanelComponentProps
{
	title: string;
	titlePanelStyling: TitlePanelStyling;
}

export class TitlePanelComponentState
{
	titleLetters: string[];
	cardFlipAnimations: CardFlipAnimation[];

	cardStyling: CardComponentStyling;
	titlePanelStyling: TitlePanelStyling;
}

export class TitlePanelStyling
{
	widthPercentage: number;
	heightPercentage: number;
	marginLeftPercentage: number;
	floatLeft: boolean;
}

const TitlePanel = styled.div`
	width: ${(p: TitlePanelStyling) => p.widthPercentage}%;
	height: ${(p: TitlePanelStyling) => p.heightPercentage}%;
	float: ${(p: TitlePanelStyling) => p.floatLeft ? 'left' : 'none'};
	margin-left: ${(p: TitlePanelStyling) => p.marginLeftPercentage}%;
	transform: rotateX(-4deg);
`;

export class TitlePanelComponent extends React.Component<TitlePanelComponentProps, TitlePanelComponentState>
{
	constructor(props: TitlePanelComponentProps)
	{
		super(props);
		let titleLetters: string[] = [];
		let cardFlipAnimations: CardFlipAnimation[] = [];

		for (let i = 0; i < props.title.length; i++)
		{
			let cardFlipAnimation = new CardFlipAnimation();
			cardFlipAnimation.flipDelay = i;
			cardFlipAnimation.flipDuration = 2;

			titleLetters.push(props.title.charAt(i));
			cardFlipAnimations.push(cardFlipAnimation);
		}

		let cardStyling: CardComponentStyling =
		{
			displayStyling: new DisplayStyling({widthPercentage: 100/titleLetters.length, heightPercentage:100})
		};

		this.state =
		{
			titleLetters: titleLetters,
			cardStyling: cardStyling,
			titlePanelStyling: props.titlePanelStyling,
			cardFlipAnimations: cardFlipAnimations
		};
	}

	render()
	{
		let cardComponents = this.state.titleLetters.map((titleLetter: string, index: number) =>
		{
			let titlePanel = (
				<div>
					{titleLetter}
				</div>);
			let cardFlipAnimation = this.state.cardFlipAnimations[index];
			console.log("What is this" + cardFlipAnimation);
			return <CardComponent panel={titlePanel} cardStyling={this.state.cardStyling} cardOrientation={CardOrientation.Back} flipAnimation={cardFlipAnimation}/>;
		})

		return (
			<TitlePanel
				widthPercentage={this.state.titlePanelStyling.widthPercentage}
				heightPercentage={this.state.titlePanelStyling.heightPercentage}
				marginLeftPercentage={this.state.titlePanelStyling.marginLeftPercentage}
				floatLeft={this.state.titlePanelStyling.floatLeft}>
				{cardComponents}
			</TitlePanel>
		);
	}

	componentDidMount()
	{

	}

	componentDidUpdate(prevProps: TitlePanelComponentProps, prevState: TitlePanelComponentState)
	{
		if (this.props.titlePanelStyling !== prevProps.titlePanelStyling)
		{
			this.setState({ titlePanelStyling: this.props.titlePanelStyling });
		}
	}
}