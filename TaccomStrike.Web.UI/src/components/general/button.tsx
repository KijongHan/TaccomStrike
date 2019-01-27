import * as React from "react";
import styled from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";
import { instanceOf } from "prop-types";
import { isNullOrUndefined } from "util";

const ButtonText = styled.p`
	margin: auto;
	text-align: center; 
`;

const ButtonElement = styled.div`
	font-weight: bold;
	text-align: center;
	background-color: rgba(255, 255, 255, 0.1);
	color: rgba(255, 255, 255, 0.75);
	-webkit-box-shadow: 0px 0px 1px 1px rgba(255,255,255,0.7);
	-moz-box-shadow: 0px 0px 1px 1px rgba(255,255,255,0.7);
	box-shadow: 0px 0px 1px 1px rgba(255,255,255,0.7);
	border-radius: 2px;

	float: ${(p: ButtonComponentStyle) => p.displayStyle.getFloatString()};
	width: ${(p: ButtonComponentStyle) => p.displayStyle.getWidthString()};
	height: ${(p: ButtonComponentStyle) => p.displayStyle.getHeightString()};
	line-height: ${(p: ButtonComponentStyle) => p.displayStyle.getHeightString()};
	margin: ${(p: ButtonComponentStyle) => p.displayStyle.getMarginString()};
	position: ${(p: ButtonComponentStyle) => p.displayStyle.getPositionString()};

	bottom: ${(p: ButtonComponentStyle) => p.displayStyle.getBottomString()};
	display: flex;

	&:hover {
		background-color: rgba(255, 255, 255, 0.25);
		cursor: pointer;
	}
`;

const DisabledButton = styled.div`
	font-weight: bold;
	text-align: center;
	background-color: rgba(255, 255, 255, 0.25);
	color: rgba(255, 255, 255, 0.75);
	-webkit-box-shadow: 0px 0px 1px 1px rgba(255,255,255,0.7);
	-moz-box-shadow: 0px 0px 1px 1px rgba(255,255,255,0.7);
	box-shadow: 0px 0px 1px 1px rgba(255,255,255,0.7);
	border-radius: 2px;

	float: ${(p: ButtonComponentStyle) => p.displayStyle.getFloatString()};
	width: ${(p: ButtonComponentStyle) => p.displayStyle.getWidthString()};
	height: ${(p: ButtonComponentStyle) => p.displayStyle.getHeightString()};
	line-height: ${(p: ButtonComponentStyle) => p.displayStyle.getHeightString()};
	margin: ${(p: ButtonComponentStyle) => p.displayStyle.getMarginString()};
	position: ${(p: ButtonComponentStyle) => p.displayStyle.getPositionString()};

	bottom: ${(p: ButtonComponentStyle) => p.displayStyle.getBottomString()};
	display: flex;
`;

export interface ButtonComponentProps
{
	buttonText: string;
	buttonComponentStyle: ButtonComponentStyle
	buttonClickHandler: () => void;

	enabled?: boolean;
}

export interface ButtonComponentState {}

export class ButtonComponentStyle
{
	displayStyle: DisplayStyle;

	constructor() 
	{
		this.displayStyle = new DisplayStyle();
	}
}

export class ButtonComponent extends React.Component<ButtonComponentProps, ButtonComponentState>
{
	constructor(props: ButtonComponentProps)
	{
		super(props);
	}

	render()
	{
		if(isNullOrUndefined(this.props.enabled)) 
		{
			return (
				<ButtonElement
					displayStyle={this.props.buttonComponentStyle.displayStyle}
					onClick={this.props.buttonClickHandler}>
					<ButtonText>
						{this.props.buttonText}
					</ButtonText>
				</ButtonElement>
			);
		}
		else if(this.props.enabled===true) 
		{
			return (
				<DisabledButton
					displayStyle={this.props.buttonComponentStyle.displayStyle}
					onClick={null}>
					<ButtonText>
						{this.props.buttonText}
					</ButtonText>
				</DisabledButton>
			);
		}
		else 
		{
			return (
				<ButtonElement
					displayStyle={this.props.buttonComponentStyle.displayStyle}
					onClick={this.props.buttonClickHandler}>
					<ButtonText>
						{this.props.buttonText}
					</ButtonText>
				</ButtonElement>
			);
		}
	}
}