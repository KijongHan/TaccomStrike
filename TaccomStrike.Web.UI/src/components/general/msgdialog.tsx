import * as React from "react";
import styled from "styled-components";
import { ButtonComponent, ButtonComponentStyle } from "./button";
import { Position, DisplayStyle } from "../../styles/displaystyle";
import { ColorStyle } from "../../styles/colorstyle";

const MessageDialogBackground = styled.div`
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color: rgba(0, 0, 0, 0.5);
`;

const MessageDialog = styled.div`
    position: fixed;
    height: 30%;
    width: 30%;
    color: white;
    background-color: ${ColorStyle.pallet5};
    margin-left: 35%;
    top: 30%;
    padding: 10px 10px 10px 10px;
`;

export class MessageDialogComponentProps 
{
    message: string;
    okayButtonClickHandler: () => void;
}

export class MessageDialogComponentState {}

export class MessageDialogComponent extends React.Component<MessageDialogComponentProps, MessageDialogComponentState>
{
    constructor(props: MessageDialogComponentProps) 
    {
        super(props);
    }

    render() 
    {
        let style = new ButtonComponentStyle();
            style.displayStyle = new DisplayStyle({
                position: Position.absolute,
                bottomPixels: 10,
                widthPercentage: 80,
                marginLeftPercentage: 10,
                heightPercentage: 25
            });

        return (
            <MessageDialogBackground>
                <MessageDialog>
                    {this.props.message}
                    <ButtonComponent
                        buttonText="Okay"
                        buttonComponentStyle={style}
                        buttonClickHandler={this.props.okayButtonClickHandler}>
                    </ButtonComponent>
                </MessageDialog>
            </MessageDialogBackground>
        );
    }
}