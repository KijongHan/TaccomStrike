import * as React from "react";
import styled from "styled-components";
import { DisplayStyling } from "../../styling/layout";

export interface ButtonComponentProps
{
	buttonText: string;
	buttonClickHandler: () => void;

	buttonComponentStyling: ButtonComponentStyling
}

export interface ButtonComponentState
{
	buttonComponentStyling: ButtonComponentStyling
}

export interface ButtonComponentStyling
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

	float: ${(p: ButtonComponentStyling) => p.layoutStyling.getFloatString()};
	width: ${(p: ButtonComponentStyling) => p.layoutStyling.getWidthString()};
	height: ${(p: ButtonComponentStyling) => p.layoutStyling.getHeightString()};

	margin: ${(p: ButtonComponentStyling) => p.layoutStyling.getMarginString()};
`;

export class ButtonComponent extends React.Component<ButtonComponentProps, ButtonComponentState>
{
	constructor(props: ButtonComponentProps)
	{
		super(props);
		this.state =
		{
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