import * as React from "react";
import styled from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";
import { ButtonComponentStyle, ButtonComponent } from "./button";
import { isNullOrUndefined } from "util";

const ComboButton = styled.div`
    margin: ${(p: ComboButtonComponentStyle) => p.displayStyle.getMarginString()};
    height: ${(p: ComboButtonComponentStyle) => p.displayStyle.getHeightString()};
    width: ${(p: ComboButtonComponentStyle) => p.displayStyle.getWidthString()};
`;

export class ComboButtonItem 
{
    displayName: string;
    comboButtonClickHandler: () => void;

    constructor(displayName: string, comboButtonClickHandler: () => void) 
    {
        this.displayName = displayName;
        this.comboButtonClickHandler = comboButtonClickHandler;
    }
}

export class ComboButtonComponentStyle 
{
    displayStyle: DisplayStyle;

    constructor(displayStyle?: DisplayStyle) 
    {
        if(isNullOrUndefined(displayStyle)) 
        {
            this.displayStyle = new DisplayStyle();
        }
        else 
        {
            this.displayStyle = displayStyle;
        }
    }
}

export class ComboButtonComponentState {}

export class ComboButtonComponentProps 
{
    comboButtons: ComboButtonItem[];
    comboButtonComponentStyle: ComboButtonComponentStyle;
}

export class ComboButtonComponent extends React.Component<ComboButtonComponentProps, ComboButtonComponentState> 
{
    constructor(props: ComboButtonComponentProps) 
    {
        super(props);    
    }

    render() 
    {
        let width = (1/this.props.comboButtons.length) * 100;
        let buttons = this.props.comboButtons.map((value: ComboButtonItem) => {
            let style = new ButtonComponentStyle();
            style.displayStyle = new DisplayStyle({
                heightPercentage: 100,
                widthPercentage: width,
                floatLeft: true
            });

            return (
                <ButtonComponent
                    buttonText={value.displayName}
                    buttonComponentStyle={style}
                    buttonClickHandler={value.comboButtonClickHandler}>
                </ButtonComponent>
            );
        });

        return (
            <ComboButton
                displayStyle={this.props.comboButtonComponentStyle.displayStyle}>
                {buttons}
            </ComboButton>
        )
    }
}