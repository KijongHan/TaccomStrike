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
	listItems: ListItem[];
	labelValue: string;
	componentStyle: LabelledListComponentStyle;

	listOnChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export class LabelledListComponentState {}

export class LabelledListComponentStyle
{
	displayStyle: DisplayStyle;
}

export class ListItem 
{
	displayName: string;
	itemValue: string;
}

export class LabelledListComponent extends React.Component<LabelledInputComponentProps, LabelledListComponentState>
{
	constructor(props: LabelledInputComponentProps)
	{
		super(props);
	}

	render()
	{
		let listItemOptions = this.props
			.listItems
			.map((value: ListItem, index: number) => {
				return (
					<option
						key={value.itemValue}
						value={value.itemValue}>
						{value.displayName}
					</option>
				);
			});
		return (
			<LabelledListComponentElement
				displayStyle={this.props.componentStyle.displayStyle}>
				<LabelComponentElement>{this.props.labelValue}</LabelComponentElement>
				<ListComponentElement
					onChange={this.props.listOnChangeHandler}>
                    {listItemOptions}
                </ListComponentElement>
			</LabelledListComponentElement>
		);
	}
}