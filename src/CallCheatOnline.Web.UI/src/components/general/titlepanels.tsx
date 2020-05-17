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

export interface TitlePanelsComponentState {}

export class TitlePanelsStyle
{
	displayStyling: DisplayStyle;
}

const TitlesPanel = styled.div`
	height: ${(p: TitlePanelsStyle) => p.displayStyling.getHeightString()};
	margin: ${(p: TitlePanelsStyle) => p.displayStyling.getMarginString()};
	overflow: hidden;
	margin-bottom: 50px;
	padding-top: 30px;
	padding-bottom: 30px;
	-webkit-perspective: 800px;
	perspective: 800px;
`;

export class TitlePanelsComponent extends React.Component<TitlePanelsComponentProps, TitlePanelsComponentState>
{
	constructor(props: TitlePanelsComponentProps)
	{
		super(props);
	}

	render()
	{
		let titlePanelComponents = this.props.titleWords.map((titleWord: string, index: number) =>
		{
			return (
				<TitlePanelComponent
					key={index}
					titleWord={titleWord}
					titlePanelStyling={this.props.titlePanelStyles[index]}>
				</TitlePanelComponent>);
		})

		return (
			<TitlesPanel
				displayStyling={this.props.titlePanelsStyle.displayStyling}>
				{titlePanelComponents}
			</TitlesPanel>
		);
	}
}