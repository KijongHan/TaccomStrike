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

export class LabelledInputComponentProps<T>
{
	initialValue: T;
	labelValue: string;
	componentStyle: LabelledInputComponentStyle;
}

export class LabelledInputComponentState
{
	labelValue: string;
	componentStyle: LabelledInputComponentStyle;
}

export class LabelledInputComponentStyle
{
	displayStyle: DisplayStyle;
}

export class LabelledInputComponent<T> extends React.Component<LabelledInputComponentProps<T>, LabelledInputComponentState>
{
	constructor(props: LabelledInputComponentProps<T>)
	{
		super(props);
		this.state = {
			labelValue: props.labelValue,
			componentStyle: props.componentStyle
		};
	}

	render()
	{
		return (
			<LabelledInputComponentElement
				displayStyle={this.state.componentStyle.displayStyle}>
				<LabelComponentElement>{this.state.labelValue}</LabelComponentElement>
				<InputComponentElement value={String(this.props.initialValue)}></InputComponentElement>
			</LabelledInputComponentElement>
		);
	}
}