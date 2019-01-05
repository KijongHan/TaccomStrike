import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@aspnet/signalr";
import { ChatUserConnected } from "../../models/hub/chatuserconnected";
import { number } from "prop-types";
import { GameLobbyJoin } from "../../models/hub/gamelobbyjoin";
import { isNull, isNullOrUndefined } from "util";

export class ChatConnectionsService 
{
    static chatConnection: HubConnection;

    static chatUserConnectedHandlers: ((chatUserConnected: ChatUserConnected) => void)[] = [];

    static initializeChatConnections = () => 
    {
        ChatConnectionsService.chatConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:50248" + "/chat")
            .build();    
        ChatConnectionsService.initializeChatEventHandlers();
        return ChatConnectionsService.chatConnection.start();
    }

    static deinitializeChatConnections = () => 
    {
        if(isNullOrUndefined(ChatConnectionsService.chatConnection)) 
        {
            return;
        }

        if(ChatConnectionsService.chatConnection.state===HubConnectionState.Connected) 
        {
            ChatConnectionsService.deinitializeChatEventHandlers();
            ChatConnectionsService.chatConnection.stop();
        }
    }

    static deinitializeChatEventHandlers = () => 
    {
        ChatConnectionsService.chatUserConnectedHandlers = [];
    }

    static initializeChatEventHandlers = () => 
    {
        ChatConnectionsService.chatConnection.on("ChatUserConnected", (apiObject: ChatUserConnected) => {
            console.log(apiObject);
            ChatConnectionsService
                .chatUserConnectedHandlers
                .forEach((handler: (chatUserConnected: ChatUserConnected) => void, index: number) => {
                    handler(apiObject);
                });
        });
        ChatConnectionsService.chatConnection.on("ChatSendMessage", (apiObject: any) => {
            console.log(apiObject);
        });
    }

    static addChatUserConnectedHandler = (chatUserConnectedHandler: (chatUserConnected: ChatUserConnected) => void) => 
    {
        ChatConnectionsService
            .chatUserConnectedHandlers
            .forEach((handler: (ChatUserConnected: ChatUserConnected) => void, index: number) => {
                if(handler === chatUserConnectedHandler) 
                {
                    return;
                }
            });

        ChatConnectionsService.chatUserConnectedHandlers.push(chatUserConnectedHandler);
    }

    static removeChatUserConnectedHandler = (chatUserConnectedHandler: (chatUserConnected: ChatUserConnected) => void) => 
    {
        ChatConnectionsService
            .chatUserConnectedHandlers
            .forEach((handler: (ChatUserConnected: ChatUserConnected) => void, index: number) => {
                if(handler === chatUserConnectedHandler) 
                {
                    ChatConnectionsService.chatUserConnectedHandlers.splice(index, 1);
                }
            });
    }
}