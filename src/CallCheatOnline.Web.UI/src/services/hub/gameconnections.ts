const Config = require('Config');

import { HubConnection, HubConnectionBuilder, HubConnectionState, IHttpConnectionOptions } from "@aspnet/signalr";
import { GameLobbyJoin } from "../../models/hub/gamelobbyjoin";
import { GetGameLobby } from "../../models/rest/getgamelobby";
import { GameLobbySendMessage } from "../../models/hub/gamelobbysendmessage";
import { isNullOrUndefined } from "util";
import { GameLobbyLeaveGame } from "../../models/hub/gamelobbyleave";
import { GameLobbyStartGame } from "../../models/hub/gamelobbystart";
import { GetGameCard } from "../../models/rest/getgamecard";
import { GameClaim } from "../../models/hub/gameclaim";
import { GameCallCheat } from "../../models/hub/gamecallcheat";
import { GameFinish } from "../../models/hub/gamefinish";

export class GameConnectionsService
{
    static gameConnection: HubConnection;

    static gameLobbyStartGameHandlers: ((gameLobbyStartGame: GameLobbyStartGame) => void)[] = [];
    static gameLobbyLeaveGameHandlers: ((gameLobbyLeaveGame: GameLobbyLeaveGame) => void)[] = [];
    static gameLobbyJoinHandlers: ((gameLobbyJoin: GameLobbyJoin) => void)[] = [];
    static gameLobbySendMessageHandlers: ((gameLobbySendMessage: GameLobbySendMessage) => void)[] = [];

    static gameFinishHandlers: ((gameFinish: GameFinish) => void)[] = [];
    static gameClaimHandlers: ((gameClaim: GameClaim) => void)[] = [];
    static gameCallCheatHandlers: ((gameClaim: GameClaim) => void)[] = [];

    static onCloseHandler: () => void;

    static initializeGameConnections = () => 
    {
        GameConnectionsService.gameConnection = new HubConnectionBuilder()
            .withUrl(`${Config.apiUrl}/game`)
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

        GameConnectionsService.gameClaimHandlers = [];
        GameConnectionsService.gameCallCheatHandlers = [];
        GameConnectionsService.gameFinishHandlers = [];
    }

    static initializeGameEventHandlers = () => 
    {
        GameConnectionsService.gameConnection.on("GameLobbyJoin", (apiObject: GameLobbyJoin) => {
            GameConnectionsService
                .gameLobbyJoinHandlers
                .forEach((handler: (gameLobbyJoin: GameLobbyJoin) => void, index: number) => {
                    handler(apiObject);
                });
        });
        GameConnectionsService.gameConnection.on("GameLobbySendMessage", (apiObject: GameLobbySendMessage) => {
            GameConnectionsService
                .gameLobbySendMessageHandlers
                .forEach((handler: (gameLobbySendMessage: GameLobbySendMessage) => void, index: number) => {
                    handler(apiObject);
                });
        });
        GameConnectionsService.gameConnection.on("GameLobbyStartGame", (apiObject: GameLobbyStartGame) => {
            GameConnectionsService
                .gameLobbyStartGameHandlers
                .forEach((handler: (gameLobbyStartGame: GameLobbyStartGame) => void, index: number) => {
                    handler(apiObject);
                });
        })
        GameConnectionsService.gameConnection.on("GameLobbyLeaveGame", (apiObject: GameLobbyLeaveGame) => {
            GameConnectionsService
                .gameLobbyLeaveGameHandlers
                .forEach((handler: (gameLobbyLeaveGame: GameLobbyLeaveGame) => void, index: number) => {
                    handler(apiObject);
                });
        });
        GameConnectionsService.gameConnection.on("GameSubmitClaim", (apiObject: GameClaim) => {
            GameConnectionsService
                .gameClaimHandlers
                .forEach((handler: (gameClaim: GameClaim) => void, index: number) => {
                    handler(apiObject);
                });
        });
        GameConnectionsService.gameConnection.on("GameCallCheat", (apiObject: GameCallCheat) => {
            GameConnectionsService
                .gameCallCheatHandlers
                .forEach((handler: (gameCallCheat: GameCallCheat) => void, index: number) => {
                    handler(apiObject);
                });
        });
        GameConnectionsService.gameConnection.on("GameFinish", (apiObject: GameFinish) => {
            GameConnectionsService
                .gameFinishHandlers
                .forEach((handler: (gameFinish: GameFinish) => void, index: number) => {
                    handler(apiObject);
                });
        });
        GameConnectionsService.gameConnection.onclose(() => {
            prompt("You have been disconnected from the server");
            if(!isNullOrUndefined(GameConnectionsService.onCloseHandler)) 
            {
                GameConnectionsService.onCloseHandler();
            }
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

    static addGameClaimHandler = (gameClaimHandler: (gameClaim: GameClaim) => void) => 
    {
        GameConnectionsService
            .gameClaimHandlers
            .forEach((handler: (gameClaim: GameClaim) => void, index: number) => {
                if(handler === gameClaimHandler) 
                {
                    return;
                }
            });

            GameConnectionsService.gameClaimHandlers.push(gameClaimHandler);
    }

    static addGameCallCheatHandler = (gameCallCheatHandler: (gameCallCheat: GameCallCheat) => void) => 
    {
        GameConnectionsService
            .gameCallCheatHandlers
            .forEach((handler: (gameCallCheat: GameCallCheat) => void, index: number) => {
                if(handler === gameCallCheatHandler) 
                {
                    return;
                }
            });

            GameConnectionsService.gameCallCheatHandlers.push(gameCallCheatHandler);
    }

    static addGameFinishHandler = (gameFinishHandler: (gameFinish: GameFinish) => void) => 
    {
        GameConnectionsService
            .gameFinishHandlers
            .forEach((handler: (gameFinish: GameFinish) => void, index: number) => {
                if(handler === gameFinishHandler) 
                {
                    return;
                }
            });

            GameConnectionsService.gameFinishHandlers.push(gameFinishHandler);
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

    static gameSubmitClaim(gameLobbyId: number, claims: GetGameCard[], actual: GetGameCard[])
    {
        GameConnectionsService.gameConnection.invoke("GameSubmitClaim", gameLobbyId, claims, actual);
    }

    static gameCallCheat(gameLobbyId: number) 
    {
        GameConnectionsService.gameConnection.invoke("GameCallCheat", gameLobbyId);
    }

    static removeHandlers() 
    {
        if(!isNullOrUndefined(GameConnectionsService.gameConnection)) 
        {
            GameConnectionsService.gameConnection.off("GameLobbyJoin");
            GameConnectionsService.gameConnection.off("GameLobbySendMessage");
            GameConnectionsService.gameConnection.off("GameLobbyStartGame");
            GameConnectionsService.gameConnection.off("GameLobbyLeaveGame");
            GameConnectionsService.gameConnection.off("GameSubmitClaim");
            GameConnectionsService.gameConnection.off("GameCallCheat");
            GameConnectionsService.gameConnection.off("GameFinish");
        }
    }
}