import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { ChatUserConnected } from "../models/hub/chatuserconnected";
import { number } from "prop-types";

export class ConnectionsService 
{
    static chatConnection: HubConnection;
    static gameConnection: HubConnection;

    static chatUserConnectedHandlers: ((ChatUserConnected: ChatUserConnected) => void)[] = [];

    static initializeConnections = () => 
    {
        ConnectionsService.chatConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:50248" + "/chat")
            .build();
        ConnectionsService.gameConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:50248" + "/game")
            .build();
        
        ConnectionsService.initializeChatEventHandlers();
        return ConnectionsService.chatConnection.start();
    }

    static addChatUserConnectedHandler = (chatUserConenctedHandler: (chatUserConnected: ChatUserConnected) => void) => 
    {
        ConnectionsService.chatUserConnectedHandlers.push(chatUserConenctedHandler);
    }

    static initializeChatEventHandlers = () => 
    {
        ConnectionsService.chatConnection.on("ChatUserConnected", (apiObject: ChatUserConnected) => {
            console.log(apiObject);
            ConnectionsService.chatUserConnectedHandlers
                .forEach((handler: (chatUserConnected: ChatUserConnected) => void, index: number) => {
                    handler(apiObject);
                });
        });
        ConnectionsService.chatConnection.on("ChatSendMessage", (apiObject: any) => {
            console.log(apiObject);
        });
    }
}