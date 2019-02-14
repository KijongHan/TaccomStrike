import * as React from "react";

import styled, { keyframes } from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";
import { isNullOrUndefined } from "util";
import { ColorStyle } from "../../styles/colorstyle";

const ValidationSuccessIcon = require("../../res/tick.png");
const ValidationFailIcon = require("../../res/cross.png");

const LabelledInputComponentElement = styled.div`
	width: ${(p: LabelledInputComponentStyle) => p.displayStyle.getWidthString()};
	margin: ${(p: LabelledInputComponentStyle) => p.displayStyle.getMarginString()};
`;

const LabelComponentElement = styled.div`
	width: 40%;
	padding-left: 5px;
	background-color: ${ColorStyle.pallet2};;
	color: ${ColorStyle.pallet1};
	font-size: 1.25em;
`;

const InputComponentElement = styled.input`
	width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    border-style: solid;
    border-width: 2px;
	border-color: ${ColorStyle.pallet2};
	color: ${ColorStyle.pallet1};
    font-size: 1.2em;
`;

const InputValidationPanel = styled.div`
	margin-top: 5px;
	margin-bottom: 15px;
	width: 100%;
	overflow: hidden;
	display: flex;
	align-items: center;
`;

const InputValidationIconAnimation = keyframes`
	0% {
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
`;

const InputValidationTextAnimation = keyframes`
	0% {
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
`;


const InputValidationSuccess = styled.div`
	height: 20px;
	width: 20px;
	background-color: #008000;
	animation: ${InputValidationIconAnimation} 0.5s linear forwards;
`;

const InputValidationFail = styled.div`
	height: 20px;
	width: 20px;
	background-color: #ff0000;
	animation: ${InputValidationIconAnimation} 0.5s linear forwards;
`;

const InputValidationSuccessText = styled.div`
	color: #008000;
	margin-left: 5px;
	animation: ${InputValidationTextAnimation} 1s linear forwards;
`;

const InputValidationFailText = styled.div`
	color: #ff0000;
	margin-left: 5px;
	animation: ${InputValidationTextAnimation} 1s linear forwards;
`;

export class InputValidationResult 
{
	success: boolean;
	message: string;

	constructor(success: boolean, message: string) 
	{
		this.success = success;
		this.message = message;
	}
}

export class LabelledInputComponentProps
{
	inputType?: string;
	validationWait?: number;
	inputValidation?: () => Promise<InputValidationResult>;
	inputValue: string;
	labelValue: string;
	componentStyle: LabelledInputComponentStyle;

	inputOnChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;

	constructor() 
	{
		this.inputType = "text";
	}
}

export class LabelledInputComponentState 
{
	inputValidationResult: InputValidationResult;
	inputValidationTimer: number;
}

export class LabelledInputComponentStyle
{
	displayStyle: DisplayStyle;

	constructor(displayStyle?: DisplayStyle) 
	{
		isNullOrUndefined(displayStyle) ? this.displayStyle=new DisplayStyle : this.displayStyle=displayStyle;
	}
}

export class LabelledInputComponent extends React.Component<LabelledInputComponentProps, LabelledInputComponentState>
{
	constructor(props: LabelledInputComponentProps)
	{
		super(props);
		this.state = {
			inputValidationResult: null,
			inputValidationTimer: null
		}
	}

	render()
	{
		let validationElement: JSX.Element;
		if(!isNullOrUndefined(this.props.inputValidation) && !isNullOrUndefined(this.state.inputValidationResult)) 
		{
			if(this.state.inputValidationResult.success) 
			{
				validationElement = (
					<InputValidationPanel>
						<InputValidationSuccess></InputValidationSuccess>
						<InputValidationSuccessText>{this.state.inputValidationResult.message}</InputValidationSuccessText>
					</InputValidationPanel>
				)
			}
			else 
			{
				validationElement = (
					<InputValidationPanel>
						<InputValidationFail></InputValidationFail>
						<InputValidationFailText>{this.state.inputValidationResult.message}</InputValidationFailText>
					</InputValidationPanel>
				);
			}
		}

		if(isNullOrUndefined(this.props.inputValue) || this.props.inputValue==="") 
		{
			validationElement = null;
		}

		return (
			<LabelledInputComponentElement
				displayStyle={this.props.componentStyle.displayStyle}>
				<LabelComponentElement>
					{this.props.labelValue}
				</LabelComponentElement>
				<InputComponentElement
					type={this.props.inputType}
					value={this.props.inputValue}
					onChange={this.inputOnChangeHandler}>
				</InputComponentElement>
				{validationElement}
			</LabelledInputComponentElement>
		);
	}

	inputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => 
	{
		this.props.inputOnChangeHandler(event);
		if(!isNullOrUndefined(this.props.inputValidation)) 
		{
			window.clearTimeout(this.state.inputValidationTimer)
			if(event.target.value==="") 
			{
				this.setState({
					inputValidationResult: null
				});
			}
			else 
			{
				let handlerID = window.setTimeout(() => {
					this.props.inputValidation().then((value: InputValidationResult) => {
						this.setState({
							inputValidationResult: value
						});
					});
				}, this.props.validationWait);
				this.setState({
					inputValidationTimer: handlerID
				});
			}
		}
	}
}