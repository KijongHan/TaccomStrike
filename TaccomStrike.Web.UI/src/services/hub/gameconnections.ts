import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { GameLobbyJoin } from "../../models/hub/gamelobbyjoin";
import { GetGameLobby } from "../../models/rest/getgamelobby";
import { GameLobbySendMessage } from "../../models/hub/gamelobbysendmessage";

export class GameConnectionsService
{
    static gameConnection: HubConnection;

    static gameLobbyJoinHandlers: ((gameLobbyJoin: GameLobbyJoin) => void)[] = [];
    static gameLobbySendMessageHandlers: ((gameLobbySendMessage: GameLobbySendMessage) => void)[] = [];

    static initializeGameConnections = () => 
    {
        GameConnectionsService.gameConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:50248" + "/game")
            .build();
            GameConnectionsService.initializeGameEventHandlers();
        return GameConnectionsService.gameConnection.start();
    }

    static initializeGameEventHandlers = () => 
    {
        GameConnectionsService.gameConnection.on("GameLobbyJoin", (apiObject: GameLobbyJoin) => {
            console.log(apiObject);
            GameConnectionsService
                .gameLobbyJoinHandlers
                .forEach((handler: (gameLobbyJoin: GameLobbyJoin) => void, index: number) => {
                    handler(apiObject);
                });
        });
        GameConnectionsService.gameConnection.on("GameLobbySendMessage", (apiObject: GameLobbySendMessage) => {
            console.log(apiObject);
            GameConnectionsService
                .gameLobbySendMessageHandlers
                .forEach((handler: (gameLobbySendMessage: GameLobbySendMessage) => void, index: number) => {
                    handler(apiObject);
                });
        });
    }

    static addGameLobbyJoinHandler = (gameLobbyJoinHandler: (gameLobbyJoin: GameLobbyJoin) => void) => 
    {
        GameConnectionsService
            .gameLobbyJoinHandlers
            .forEach((handler: (gameLobbyJoin: GameLobbyJoin) => void, index: number) => {
                if(handler === gameLobbyJoinHandler) 
                {
                    return;
                }
            });

            GameConnectionsService.gameLobbyJoinHandlers.push(gameLobbyJoinHandler);
    }

    static removeGameLobbyJoinHandler = (gameLobbyJoinHandler: (gameLobbyJoin: GameLobbyJoin) => void) => 
    {
        GameConnectionsService
            .gameLobbyJoinHandlers
            .forEach((handler: (gameLobbyJoin: GameLobbyJoin) => void, index: number) => {
                if(handler === gameLobbyJoinHandler) 
                {
                    GameConnectionsService.gameLobbyJoinHandlers.splice(index, 1);
                }
            });
    }

    static addGameLobbySendMessageHandler = (gameLobbySendMessageHandler: (gameLobbySendMessage: GameLobbySendMessage) => void) => 
    {
        GameConnectionsService
            .gameLobbySendMessageHandlers
            .forEach((handler: (gameLobbySendMessage: GameLobbySendMessage) => void, index: number) => {
                if(handler === gameLobbySendMessageHandler) 
                {
                    return;
                }
            });

            GameConnectionsService.gameLobbySendMessageHandlers.push(gameLobbySendMessageHandler);
    }

    static removeGameLobbySendMessageHandler = (gameLobbySendMessageHandler: (gameLobbySendMessage: GameLobbySendMessage) => void) => 
    {
        GameConnectionsService
            .gameLobbySendMessageHandlers
            .forEach((handler: (gameLobbySendMessage: GameLobbySendMessage) => void, index: number) => {
                if(handler === gameLobbySendMessageHandler) 
                {
                    GameConnectionsService.gameLobbySendMessageHandlers.splice(index, 1);
                }
            });
    }

    static gameLobbyJoin(gameLobbyId: any)
    {
        GameConnectionsService.gameConnection.invoke("GameLobbyJoin", gameLobbyId);
    }

    static gameLobbySendMessage(gameLobbyMessage: string, gameLobbyId: any)
    {
        GameConnectionsService.gameConnection.invoke("GameLobbySendMessage", gameLobbyMessage, gameLobbyId);
    }
}