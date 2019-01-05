import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@aspnet/signalr";
import { GameLobbyJoin } from "../../models/hub/gamelobbyjoin";
import { GetGameLobby } from "../../models/rest/getgamelobby";
import { GameLobbySendMessage } from "../../models/hub/gamelobbysendmessage";
import { isNullOrUndefined } from "util";
import { GameLobbyLeaveGame } from "../../models/hub/gamelobbyleave";
import { GameLobbyStartGame } from "../../models/hub/gamelobbystart";

export class GameConnectionsService
{
    static gameConnection: HubConnection;

    static gameLobbyStartGameHandlers: ((gameLobbyStartGame: GameLobbyStartGame) => void)[] = [];
    static gameLobbyLeaveGameHandlers: ((gameLobbyLeaveGame: GameLobbyLeaveGame) => void)[] = [];
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

    static deinitializeGameConnections = () => 
    {
        if(isNullOrUndefined(GameConnectionsService.gameConnection)) 
        {
            return;
        }

        if(GameConnectionsService.gameConnection.state===HubConnectionState.Connected) 
        {
            GameConnectionsService.deinitializeGameEventHandlers();
            GameConnectionsService.gameConnection.stop();
        }
    }

    static deinitializeGameEventHandlers = () => 
    {
        GameConnectionsService.gameLobbyStartGameHandlers = [];
        GameConnectionsService.gameLobbyLeaveGameHandlers = [];
        GameConnectionsService.gameLobbyJoinHandlers = [];
        GameConnectionsService.gameLobbySendMessageHandlers = [];
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
        GameConnectionsService.gameConnection.on("GameLobbyStartGame", (apiObject: GameLobbyStartGame) => {
            console.log(apiObject);
            GameConnectionsService
                .gameLobbyStartGameHandlers
                .forEach((handler: (gameLobbyStartGame: GameLobbyStartGame) => void, index: number) => {
                    handler(apiObject);
                });
        })
        GameConnectionsService.gameConnection.on("GameLobbyLeaveGame", (apiObject: GameLobbyLeaveGame) => {
            console.log(apiObject);
            GameConnectionsService
                .gameLobbyLeaveGameHandlers
                .forEach((handler: (gameLobbyLeaveGame: GameLobbyLeaveGame) => void, index: number) => {
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

    static addGameLobbyStartGameHandler = (gameLobbyStartGameHandler: (gameLobbyStartGame: GameLobbyStartGame) => void) => 
    {
        GameConnectionsService
            .gameLobbyStartGameHandlers
            .forEach((handler: (gameLobbyStartGame: GameLobbyStartGame) => void, index: number) => {
                if(handler === gameLobbyStartGameHandler) 
                {
                    return;
                }
            });

            GameConnectionsService.gameLobbyStartGameHandlers.push(gameLobbyStartGameHandler);
    }

    static addGameLobbyLeaveGameHandler = (gameLobbyLeaveGameHandler: (gameLobbyLeaveGame: GameLobbyLeaveGame) => void) => 
    {
        GameConnectionsService
            .gameLobbyLeaveGameHandlers
            .forEach((handler: (gameLobbyLeaveGame: GameLobbyLeaveGame) => void, index: number) => {
                if(handler === gameLobbyLeaveGameHandler) 
                {
                    return;
                }
            });

            GameConnectionsService.gameLobbyLeaveGameHandlers.push(gameLobbyLeaveGameHandler);
    }

    static gameLobbyStartGame(gameLobbyId: number) 
    {
        GameConnectionsService.gameConnection.invoke("GameLobbyStartGame", gameLobbyId);
    }

    static gameLobbyLeaveGame(gameLobbyId: number) 
    {
        GameConnectionsService.gameConnection.invoke("GameLobbyLeaveGame", gameLobbyId);
    }

    static gameLobbyJoin(gameLobbyId: number)
    {
        GameConnectionsService.gameConnection.invoke("GameLobbyJoin", gameLobbyId);
    }

    static gameLobbySendMessage(gameLobbyMessage: string, gameLobbyId: number)
    {
        GameConnectionsService.gameConnection.invoke("GameLobbySendMessage", gameLobbyMessage, gameLobbyId);
    }
}