import * as React from "react";
import { TitleComponent } from "./title";
import { CardComponent, CardStyleProps } from "./card";

import styled from "styled-components"

export interface TitlePanelComponentProps
{
	title: string;
	titlePanelStyling: TitlePanelStyling;
}

export interface TitlePanelComponentState
{
	titleLetters: string[];
	cardStyling: CardStyleProps;
	titlePanelStyling: TitlePanelStyling;
}

export interface TitlePanelStyling
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
		let titleLetters: string [] = [];
		for (let i = 0; i < props.title.length; i++)
		{
			titleLetters.push(props.title.charAt(i));
		}

		let cardStyling: CardStyleProps =
		{
			widthPercentage: 100 / titleLetters.length,
			heightPercentage: 100
		};

		this.state =
		{
			titleLetters: titleLetters,
			cardStyling: cardStyling,
			titlePanelStyling: props.titlePanelStyling
		};
	}

	render()
	{
		let cardComponents = this.state.titleLetters.map((titleLetter: string, index: number) =>
		{
			var titlePanel = new TitleComponent({ titleLetter: titleLetter });
			return <CardComponent panel={titlePanel} cardStyling={this.state.cardStyling} />;
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

	componentDidUpdate(prevProps: TitlePanelComponentProps, prevState: TitlePanelComponentState)
	{
		if (this.props.titlePanelStyling !== prevProps.titlePanelStyling)
		{
			this.setState({ titlePanelStyling: this.props.titlePanelStyling });
		}
	}
}