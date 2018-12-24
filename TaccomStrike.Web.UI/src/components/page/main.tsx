import * as React from "react";
import { BasePageComponent, BasePageComponentProps, BasePageComponentState } from "./base";
import { ChatConnectionsService } from "../../services/hub/chatconnections";
import { ChatUserConnected } from "../../models/hub/chatuserconnected";
import { MainPageStyle } from "../pagestyles/main";
import styled from "styled-components";
import { ChatRoomsService } from "../../services/rest/chatrooms";
import { GetChatRoom } from "../../models/rest/getchatroom";

const MainPage = styled.div`
	height: 100%;
	font-family: 'Cormorant Upright', serif;
`;

export interface MainPageComponentProps extends BasePageComponentProps {}

export class MainPageComponentState extends BasePageComponentState {}

export class MainPageComponent extends BasePageComponent<MainPageComponentProps, MainPageComponentState> 
{
	constructor(props: MainPageComponentProps) 
	{
		super(props);
		ChatConnectionsService
			.initializeChatConnections()
			.then(() => {
				console.log("Connection Succeeded");
				this.state = { pageStyle: new MainPageStyle() };
				ChatConnectionsService.addChatUserConnectedHandler(this.chatUserConnectedHandler);

				ChatRoomsService.getChatRooms().then((response: GetChatRoom[]) => {console.log(response);});
			})
			.catch(() => {
				console.log("Connection Failed");
			});
	}

    render() 
    {
        return (
			<MainPage>
				
			</MainPage>
		);
	}
	
	chatUserConnectedHandler = (chatUserConnected: ChatUserConnected) => 
	{
		console.log("Chat User Conected");
	}
}