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
    enabled: boolean;

    constructor(displayName: string, enabled: boolean, comboButtonClickHandler: () => void) 
    {
        this.displayName = displayName;
        this.comboButtonClickHandler = comboButtonClickHandler;
        this.enabled = enabled;
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

export class ComboButtonComponentState 
{
    comboButtons: ComboButtonItem[];
}

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
        this.state = {
            comboButtons: this.props.comboButtons
        }
    }

    render() 
    {

        let width = (1/this.props.comboButtons.length) * 100;
        let buttons = this.state.comboButtons.map((value: ComboButtonItem) => {
            let style = new ButtonComponentStyle();
            style.displayStyle = new DisplayStyle({
                heightPercentage: 100,
                widthPercentage: width,
                floatLeft: true
            });
            let buttonClickHandler = () => {
                let newComboButtonItems = this.state.comboButtons.map(item => Object.assign({}, item));
                newComboButtonItems.forEach((item: ComboButtonItem) => {
                    item.enabled = false;
                });
                let clickedButton = newComboButtonItems.find((item: ComboButtonItem, index: number, obj: ComboButtonItem[]) => {
                    return value.displayName===item.displayName;
                });
                clickedButton.enabled = true;
                this.setState({
                    comboButtons: newComboButtonItems
                });
            };

            return (
                <ButtonComponent
                    enabled={value.enabled}
                    buttonText={value.displayName}
                    buttonComponentStyle={style}
                    buttonClickHandler={buttonClickHandler}>
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