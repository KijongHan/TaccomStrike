import * as React from "react";

import styled from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";

const LabelledInputComponentElement = styled.div`
	width: ${(p: LabelledInputComponentStyle) => p.displayStyle.getWidthString()};
	margin: ${(p: LabelledInputComponentStyle) => p.displayStyle.getMarginString()};
`;

const LabelComponentElement = styled.div`
	width: 40%;
	padding-left: 5px;
	background-color: rgba(255, 255, 255, 0.65);
	font-size: 1.25em;
`;

const InputComponentElement = styled.input`
	width: 80%;
    background-color: rgba(255, 255, 255, 0.5);
    border-style: solid;
    border-width: 2px;
    border-color: rgba(255, 255, 255, 0.65);
    font-size: 1.2em;
`;

export class LabelledInputComponentProps
{
	inputType?: string;
	inputValue: string;
	labelValue: string;
	componentStyle: LabelledInputComponentStyle;

	inputOnChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;

	constructor() 
	{
		this.inputType = "text";
	}
}

export class LabelledInputComponentState {}

export class LabelledInputComponentStyle
{
	displayStyle: DisplayStyle;
}

export class LabelledInputComponent extends React.Component<LabelledInputComponentProps, LabelledInputComponentState>
{
	constructor(props: LabelledInputComponentProps)
	{
		super(props);
	}

	render()
	{
		return (
			<LabelledInputComponentElement
				displayStyle={this.props.componentStyle.displayStyle}>
				<LabelComponentElement>{this.props.labelValue}</LabelComponentElement>
				<InputComponentElement 
					type={this.props.inputType}
					value={this.props.inputValue}
					onChange={this.props.inputOnChangeHandler}></InputComponentElement>
			</LabelledInputComponentElement>
		);
	}
}