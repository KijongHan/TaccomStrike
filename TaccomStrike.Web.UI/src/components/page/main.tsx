import * as React from "react";
import { BasePageComponent, BasePageComponentProps, BasePageComponentState } from "./base";
import { ConnectionsService } from "../../services/connections";
import { ChatUserConnected } from "../../models/hub/chatuserconnected";
import { MainPageStyle } from "../pagestyles/main";

export interface MainPageComponentProps extends BasePageComponentProps {}

export class MainPageComponentState extends BasePageComponentState {}

export class MainPageComponent extends BasePageComponent<MainPageComponentProps, MainPageComponentState> 
{
	constructor(props: MainPageComponentProps) 
	{
		super(props);
		ConnectionsService
			.initializeConnections()
			.then(() => {
				console.log("Connection Succeeded");
				this.state = { pageStyle: new MainPageStyle() };
				ConnectionsService.addChatUserConnectedHandler(this.chatUserConnectedHandler);
			})
			.catch(() => {
				console.log("Connection Failed");
			});
	}

    render() 
    {
        return (<div>HI</div>);
	}
	
	chatUserConnectedHandler = (chatUserConnected: ChatUserConnected) => 
	{
		console.log("Chat User Conected");
	}
}