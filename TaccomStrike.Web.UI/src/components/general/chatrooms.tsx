import * as React from "react";
import { ButtonComponent, ButtonComponentStyle } from "./button";
import styled from "styled-components";

export class ChatRoomsComponentProps 
{

}

export class ChatRoomsComponentState 
{

}

export class ChatRoomsComponent extends React.Component<ChatRoomsComponentProps, ChatRoomsComponentState> 
{
    constructor(props: ChatRoomsComponentProps) 
    {
        super(props);
    }

    render() 
    {
        return (<div>HI</div>);
    }
}