import * as React from "react";

import styled from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";
import { isNullOrUndefined } from "util";
import { ColorStyle } from "../../styles/colorstyle";

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
	width: 80%;
    background-color: rgba(255, 255, 255, 0.5);
    border-style: solid;
    border-width: 2px;
	border-color: ${ColorStyle.pallet2};
	color: ${ColorStyle.pallet1};
    font-size: 1.2em;
`;

const InputValidationSuccess = styled.div`
	background-color: green;
`;

const InputValidationFail = styled.div`
	background-color: red;
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
	inputValidation?: () => InputValidationResult;
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
					<InputValidationSuccess>
						Success
					</InputValidationSuccess>
				)
			}
			else 
			{
				validationElement = (
					<InputValidationFail>
						{this.state.inputValidationResult.message}
					</InputValidationFail>
				);
			}
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
			let handlerID = window.setTimeout(() => {
				this.setState({
					inputValidationResult: this.props.inputValidation()
				});
			}, this.props.validationWait);
			this.setState({
				inputValidationTimer: handlerID
			})
		}
	}
}