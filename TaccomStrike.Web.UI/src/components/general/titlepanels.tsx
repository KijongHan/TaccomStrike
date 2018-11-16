import * as React from "react";
import { TitlePanelStyling, TitlePanelComponent } from "./titlepanel";
import { CardComponent, CardComponentStyling } from "./card";

import styled from "styled-components"

export interface TitlePanelsComponentProps
{
	titleWords: string[];
	titlePanelStylings: TitlePanelStyling[];

	titlePanelsStyling: TitlePanelsStyling;
}

export interface TitlePanelsComponentState
{
	titleWords: string[];
	titlePanelStylings: TitlePanelStyling[];

	titlePanelsStyling: TitlePanelsStyling;
}

export interface TitlePanelsStyling
{
	heightPercentage: number;
}

const TitlesPanel = styled.div`
	height: ${(p: TitlePanelsStyling) => p.heightPercentage}%;

	overflow: hidden;
	-webkit-perspective: 800px;
	perspective: 800px;
	margin-bottom: 50px;
	padding-bottom: 10px;
`;

export class TitlePanelsComponent extends React.Component<TitlePanelsComponentProps, TitlePanelsComponentState>
{
	constructor(props: TitlePanelsComponentProps)
	{
		super(props);
		this.state =
			{
				titleWords: props.titleWords,
				titlePanelStylings: props.titlePanelStylings,
				titlePanelsStyling: props.titlePanelsStyling,
			};
	}

	render()
	{
		let titlePanelComponents = this.state.titleWords.map((titleWord: string, index: number) =>
		{
			return (
				<TitlePanelComponent
					title={titleWord}
					titlePanelStyling={this.state.titlePanelStylings[index]}>
				</TitlePanelComponent>);
		})

		return (
			<TitlesPanel
				heightPercentage={this.state.titlePanelsStyling.heightPercentage}>
				{titlePanelComponents}
			</TitlesPanel>
		);
	}

	componentDidUpdate(prevProps: TitlePanelsComponentProps, prevState: TitlePanelsComponentState)
	{
		if (this.props.titlePanelStylings !== prevProps.titlePanelStylings)
		{
			this.setState({ titlePanelStylings: this.props.titlePanelStylings });
		}

		if (this.props.titlePanelsStyling !== prevProps.titlePanelsStyling)
		{
			this.setState({ titlePanelsStyling: this.props.titlePanelsStyling });
		}
	}
}