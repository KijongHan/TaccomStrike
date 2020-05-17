import * as React from "react";
import { CardComponent, CardComponentStyle, CardRotationAnimation } from "./card";

import styled from "styled-components"
import { DisplayStyle } from "../../styles/displaystyle";
import { PerspectiveStyle } from "../../styles/perspectivestyle";
import { ColorStyle } from "../../styles/colorstyle";
import { isNullOrUndefined } from "util";

export class TitlePanelComponentProps
{
	titleWord: string;
	titlePanelStyling: TitlePanelStyle;
}

export class TitlePanelComponentState
{
	titleLetters: string[];
	cardFlipAnimations: CardRotationAnimation[];
	cardStyle: CardComponentStyle;
}

export class TitlePanelStyle
{
	displayStyle: DisplayStyle;
	fontSize?: string;
}

const TitleCharacter = styled.div`
	width: 100%;
	height: 100%;
	font-size: ${(p: TitlePanelStyle) => isNullOrUndefined(p.fontSize) ? '7em' : p.fontSize };
	line-height: ${(p: TitlePanelStyle) => p.displayStyle.getHeightString()};
	text-align: center;

	color: ${ColorStyle.pallet2};
	background-color: ${ColorStyle.pallet5}
	border-width: 1px;
	border-style: solid;
	border-color: ${ColorStyle.pallet2};
`;

const TitlePanel = styled.div`
	width: ${(p: TitlePanelStyle) => p.displayStyle.getWidthString()};
	height: ${(p: TitlePanelStyle) => p.displayStyle.getHeightString()};
	float: ${(p: TitlePanelStyle) => p.displayStyle.getFloatString()};
	margin: ${(p: TitlePanelStyle) => p.displayStyle.getMarginString()};
	transform: rotateX(-4deg);
`;

export class TitlePanelComponent extends React.Component<TitlePanelComponentProps, TitlePanelComponentState>
{
	constructor(props: TitlePanelComponentProps)
	{
		super(props);
		let titleLetters: string[] = [];
		let cardFlipAnimations: CardRotationAnimation[] = [];

		for (let i = 0; i < props.titleWord.length; i++)
		{
			let cardFlipAnimation = new CardRotationAnimation();
			cardFlipAnimation.rotationFrom = 180;
			cardFlipAnimation.rotationTo = 359.99;
			cardFlipAnimation.rotationDirection = 1;
			cardFlipAnimation.rotationDelay = (i/3)*1000;
			cardFlipAnimation.rotationDuration = 500;

			titleLetters.push(props.titleWord.charAt(i));
			cardFlipAnimations.push(cardFlipAnimation);
		}

		let cardStyling: CardComponentStyle =
		{
			displayStyle: new DisplayStyle({widthPercentage: 100/titleLetters.length, heightPercentage:100}),
			perspectiveStyle: new PerspectiveStyle({perspective: 1200, rotateY: 180})
		};

		this.state =
		{
			titleLetters: titleLetters,
			cardStyle: cardStyling,
			cardFlipAnimations: cardFlipAnimations
		};
	}

	render()
	{
		let cardComponents = this.state.titleLetters.map((titleLetter: string, index: number) =>
		{
			let titlePanel = (
				<TitleCharacter
					key={index}
					displayStyle={this.props.titlePanelStyling.displayStyle}
					fontSize={this.props.titlePanelStyling.fontSize}>
					{titleLetter}
				</TitleCharacter>);

			let cardFlipAnimation = this.state.cardFlipAnimations[index];
			let hoverAnimation = new CardRotationAnimation({
				rotationFrom: 0,
				rotationTo: 359.99,
				rotationDirection: 1,
				rotationDelay: 0,
				rotationDuration: 500
			});
			return <CardComponent
				key = {index}
				front={titlePanel}
				cardStyle={this.state.cardStyle}
				rotationAnimation={cardFlipAnimation}
				hoverAnimation={hoverAnimation}/>;
		})

		return (
			<TitlePanel
				displayStyle={this.props.titlePanelStyling.displayStyle}
				fontSize={this.props.titlePanelStyling.fontSize}>
				{cardComponents}
			</TitlePanel>
		);
	}
}