import * as React from "react";
import { TitlePanelStyle, TitlePanelComponent } from "./titlepanel";
import { CardComponent, CardComponentStyle } from "./card";

import styled from "styled-components"
import { DisplayStyle } from "../../styles/displaystyle";

export interface TitlePanelsComponentProps
{
	titleWords: string[];
	titlePanelStyles: TitlePanelStyle[];

	titlePanelsStyle: TitlePanelsStyle;
}

export interface TitlePanelsComponentState
{
	titleWords: string[];
	titlePanelStyles: TitlePanelStyle[];

	titlePanelsStyle: TitlePanelsStyle;
}

export class TitlePanelsStyle
{
	displayStyling: DisplayStyle;
}

const TitlesPanel = styled.div`
	height: ${(p: TitlePanelsStyle) => p.displayStyling.getHeightString()};
	overflow: hidden;
	margin-bottom: 50px;
	padding-top: 15px;
	padding-bottom: 10px;
	-webkit-perspective: 800px;
	perspective: 800px;
`;

export class TitlePanelsComponent extends React.Component<TitlePanelsComponentProps, TitlePanelsComponentState>
{
	constructor(props: TitlePanelsComponentProps)
	{
		super(props);
		this.state =
			{
				titleWords: props.titleWords,
				titlePanelStyles: props.titlePanelStyles,
				titlePanelsStyle: props.titlePanelsStyle,
			};
	}

	render()
	{
		let titlePanelComponents = this.state.titleWords.map((titleWord: string, index: number) =>
		{
			return (
				<TitlePanelComponent
					title={titleWord}
					titlePanelStyling={this.state.titlePanelStyles[index]}>
				</TitlePanelComponent>);
		})

		return (
			<TitlesPanel
				displayStyling={this.state.titlePanelsStyle.displayStyling}>
				{titlePanelComponents}
			</TitlesPanel>
		);
	}

	componentDidUpdate(prevProps: TitlePanelsComponentProps, prevState: TitlePanelsComponentState)
	{
		if (this.props.titlePanelStyles !== prevProps.titlePanelStyles)
		{
			this.setState({ titlePanelStyles: this.props.titlePanelStyles });
		}

		if (this.props.titlePanelsStyle !== prevProps.titlePanelsStyle)
		{
			this.setState({ titlePanelsStyle: this.props.titlePanelsStyle });
		}
	}
}