import * as React from "react";

import styled from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";

const LabelledListComponentElement = styled.div`
	width: ${(p: LabelledListComponentStyle) => p.displayStyle.getWidthString()};
	margin: ${(p: LabelledListComponentStyle) => p.displayStyle.getMarginString()};
`;

const LabelComponentElement = styled.div`
	width: 40%;
	padding-left: 5px;
	background-color: rgba(255, 255, 255, 0.65);
	font-size: 1.25em;
`;

const ListComponentElement = styled.select`
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
	componentStyle: LabelledListComponentStyle;

	listOnChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;

	constructor() 
	{
		this.inputType = "text";
	}
}

export class LabelledInputComponentState
{
	inputValue: string;
	labelValue: string;
	componentStyle: LabelledListComponentStyle;
}

export class LabelledListComponentStyle
{
	displayStyle: DisplayStyle;
}

export class LabelledInputComponent extends React.Component<LabelledInputComponentProps, LabelledInputComponentState>
{
	constructor(props: LabelledInputComponentProps)
	{
		super(props);
		this.state = {
			inputValue: props.inputValue,
			labelValue: props.labelValue,
			componentStyle: props.componentStyle
		};
	}

	render()
	{
		console.log("render input");
		return (
			<LabelledListComponentElement
				displayStyle={this.props.componentStyle.displayStyle}>
				<LabelComponentElement>{this.props.labelValue}</LabelComponentElement>
				<ListComponentElement
					onChange={this.props.listOnChangeHandler}>
                    <option value="Try"></option>
                </ListComponentElement>
			</LabelledListComponentElement>
		);
	}
	
	componentDidUpdate(prevProps: LabelledInputComponentProps, prevState: LabelledInputComponentState) 
	{
		if(this.props.inputValue !== prevProps.inputValue) 
		{
			this.setState({inputValue: this.props.inputValue});
		}
	}
}