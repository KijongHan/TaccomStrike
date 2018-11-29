import * as React from "react";
import styled from "styled-components";
import { DisplayStyling } from "../../styling/displaystyling";

export interface ButtonComponentProps
{
	buttonText: string;
	buttonClickHandler: () => void;

	buttonComponentStyling: ButtonComponentStyle
}

export interface ButtonComponentState
{
	buttonComponentStyling: ButtonComponentStyle
}

export interface ButtonComponentStyle
{
	layoutStyling: DisplayStyling;
}

const ButtonElement = styled.div`
	font-weight: bold;
	text-align: center;
	background-color: rgba(255, 255, 255, 0.1);
	color: rgba(255, 255, 255, 0.75);
	-webkit-box-shadow: 0px 0px 0.2px 2px rgba(255,255,255,0.7);
	-moz-box-shadow: 0px 0px 0.2px 2px rgba(255,255,255,0.7);
	box-shadow: 0px 0px 0.2px 2px rgba(255,255,255,0.7);

	float: ${(p: ButtonComponentStyle) => p.layoutStyling.getFloatString()};
	width: ${(p: ButtonComponentStyle) => p.layoutStyling.getWidthString()};
	height: ${(p: ButtonComponentStyle) => p.layoutStyling.getHeightString()};
	line-height: ${(p: ButtonComponentStyle) => p.layoutStyling.getHeightString()};
	margin: ${(p: ButtonComponentStyle) => p.layoutStyling.getMarginString()};
	
	&:hover {
		background-color: rgba(255, 255, 255, 0.25);
		cursor: pointer;
	}
`;

export class ButtonComponent extends React.Component<ButtonComponentProps, ButtonComponentState>
{
	constructor(props: ButtonComponentProps)
	{
		super(props);
		this.state = {
			buttonComponentStyling: props.buttonComponentStyling
		};
	}

	render()
	{
		return (
			<ButtonElement
				layoutStyling={this.state.buttonComponentStyling.layoutStyling}
				onClick={this.props.buttonClickHandler}>
				{this.props.buttonText}
			</ButtonElement>
		); 
	}

	componentDidUpdate(prevProps: ButtonComponentProps, prevState: ButtonComponentState)
	{
		if (this.props.buttonComponentStyling !== prevProps.buttonComponentStyling)
		{
			this.setState({ buttonComponentStyling: this.props.buttonComponentStyling });
		}
	}
}