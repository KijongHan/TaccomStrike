import * as React from "react";
import { CardComponent, CardComponentStyle, CardOrientation, CardFlipAnimation } from "./card";

import styled from "styled-components"
import { DisplayStyling } from "../../styling/displaystyling";

export class TitlePanelComponentProps
{
	title: string;
	titlePanelStyling: TitlePanelStyling;
}

export class TitlePanelComponentState
{
	titleLetters: string[];
	cardFlipAnimations: CardFlipAnimation[];

	cardStyling: CardComponentStyle;
	titlePanelStyling: TitlePanelStyling;
}

export class TitlePanelStyling
{
	displayStyling: DisplayStyling;
}

const TitleCharacter = styled.div`
	width: 100%;
	height: 100%;
	font-size: 7em;
	line-height: ${(p: TitlePanelStyling) => p.displayStyling.getHeightString()}
	text-align: center;

	color: rgba(255, 255, 255, 0.95);
	background-color: rgba(0, 0, 0, 0.35);
	-webkit-box-shadow: -4px 4px 1px 0px rgba(0,0,0,0.55);
	-moz-box-shadow: -4px 4px 1px 0px rgba(0,0,0,0.55);
	box-shadow: -4px 4px 1px 0px rgba(0,0,0,0.55);
`;

const TitlePanel = styled.div`
	width: ${(p: TitlePanelStyling) => p.displayStyling.getWidthString()};
	height: ${(p: TitlePanelStyling) => p.displayStyling.getHeightString()};
	float: ${(p: TitlePanelStyling) => p.displayStyling.getFloatString()};
	margin: ${(p: TitlePanelStyling) => p.displayStyling.getMarginString()};
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

		let cardStyling: CardComponentStyle =
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
				<TitleCharacter
					displayStyling={this.state.titlePanelStyling.displayStyling}>
					{titleLetter}
				</TitleCharacter>);

			let cardFlipAnimation = this.state.cardFlipAnimations[index];
			return <CardComponent
				panel={titlePanel}
				cardStyling={this.state.cardStyling}
				cardOrientation={CardOrientation.Back}
				flipAnimation={cardFlipAnimation}
				tiltAnimation={null}/>;
		})

		return (
			<TitlePanel
				displayStyling={this.state.titlePanelStyling.displayStyling}>
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