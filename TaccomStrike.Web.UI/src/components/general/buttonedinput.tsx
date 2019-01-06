import * as React from "react";

import styled from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";
import { ButtonComponent, ButtonComponentStyle } from "./button";

const ButtonedInputComponentElement = styled.div`
	width: ${(p: ButtonedInputComponentPanelStyle) => p.displayStyle.getWidthString()};
    margin: ${(p: ButtonedInputComponentPanelStyle) => p.displayStyle.getMarginString()};
    height: ${(p: ButtonedInputComponentPanelStyle) => p.displayStyle.getHeightString()};
    display: inline-block;
    overflow: auto;
    border-style: solid;
    border-width: 2px;
    border-color: rgba(255, 255, 255, 0.65);
`;

const InputComponentElement = styled.input`
    width: ${(p: InputComponentStyle) => p.displayStyle.getWidthString()};
    float: ${(p: InputComponentStyle) => p.displayStyle.getFloatString()};
    height: ${(p: ButtonedInputComponentPanelStyle) => p.displayStyle.getHeightString()};
    background-color: rgba(255, 255, 255, 0.5);
    font-size: 1.2em;
    border: none;
	padding: 0 0 0 0;
	
	&:focus {
		caret-color: blue;
	}
`;

export class ButtonedInputComponentProps
{
	inputType?: string
	inputValue: string;
	componentStyle: ButtonedInputComponentStyle;

    inputOnChangeHandler: (inputValue: string) => void;
    buttonClickHandler: () => void;

	constructor() 
	{
		this.inputType = "text";
	}
}

export class ButtonedInputComponentState {}

export class ButtonedInputComponentStyle
{
    buttonedInputComponentPanelStyle: ButtonedInputComponentPanelStyle;
    inputComponentStyle: InputComponentStyle;
    buttonComponentStyle: ButtonComponentStyle;
}

export class ButtonedInputComponentPanelStyle
{
    displayStyle: DisplayStyle;
}

export class InputComponentStyle
{
    displayStyle: DisplayStyle;
}

export class ButtonedInputComponent extends React.Component<ButtonedInputComponentProps, ButtonedInputComponentState>
{
	constructor(props: ButtonedInputComponentProps)
	{
		super(props);
		this.state = {
			inputValue: props.inputValue,
            componentStyle: props.componentStyle
        };
	}

	render()
	{
		return (
			<ButtonedInputComponentElement
				displayStyle={this.props.componentStyle.buttonedInputComponentPanelStyle.displayStyle}>
                <InputComponentElement 
                    displayStyle={this.props.componentStyle.inputComponentStyle.displayStyle}
					type={this.props.inputType}
					value={this.props.inputValue}
					onChange={this.inputOnChangeHandler}>
                </InputComponentElement>
                <ButtonComponent
                    buttonText={"Send"}
                    buttonClickHandler={this.props.buttonClickHandler}
                    buttonComponentStyle={this.props.componentStyle.buttonComponentStyle}>
                </ButtonComponent>
			</ButtonedInputComponentElement>
		);
    }

    inputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
	{
		this.props.inputOnChangeHandler(event.target.value);
	}
}