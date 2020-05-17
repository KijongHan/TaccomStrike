import { GetChatMessage } from "../rest/getchatmessage";
import { GameLobbyMessageType } from "../enums/gamelobbymessagetype";

export class GameLobbySendMessage 
{
    messageType: GameLobbyMessageType
    chatMessage: GetChatMessage;
}