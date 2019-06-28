import * as React from "react";
import styled from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";

const Timer = styled.div`
    margin: ${(p: TimerComponentStyle) => p.displayStyle.getMarginString()};
    width: ${(p: TimerComponentStyle) => p.displayStyle.getWidthString()};
    height: ${(p: TimerComponentStyle) => p.displayStyle.getHeightString()};
`;

export class TimerComponentProps 
{
    timerComponentStyle: TimerComponentStyle;
}

export class TimerComponentState 
{
    currentInterval: number;
}

export class TimerComponentStyle 
{
    displayStyle: DisplayStyle;
}

export class TimerComponent extends React.Component<TimerComponentProps, TimerComponentState> 
{
    constructor(props: TimerComponentProps) 
    {
        super(props);
    }

    render() 
    {
        return (
            <Timer
                displayStyle={this.props.timerComponentStyle.displayStyle}>
            </Timer>
        );
    }
}