import { BasePageComponent, BasePageComponentProps, BasePageComponentState } from "./base";
import * as React from "react";
import { GamePageComponent } from "./game";
import { LobbyPageComponent } from "./lobby";
import { GetGameLobby } from "../../models/rest/getgamelobby";
import { GetGameState } from "../../models/rest/getgamestate";
import { isNullOrUndefined } from "util";
import { GameConnectionsService } from "../../services/hub/gameconnections";
import { GameLobbyStartGame } from "../../models/hub/gamelobbystart";
import { GameLobbyLeaveGame } from "../../models/hub/gamelobbyleave";
import { GameLobbyJoin } from "../../models/hub/gamelobbyjoin";
import { GameLobbySendMessage } from "../../models/hub/gamelobbysendmessage";
import { CreateGameLobby } from "../../models/rest/creategamelobby";
import { GameLobbiesService } from "../../services/rest/gamelobbies";
import { GetGameCard } from "../../models/rest/getgamecard";
import { GameClaim } from "../../models/hub/gameclaim";
import { GameCallCheat } from "../../models/hub/gamecallcheat";
import { GetGameUser } from "../../models/rest/getgameuser";
import { GetGameCheat } from "../../models/rest/getgamecheat";
import { GameFinish } from "../../models/hub/gamefinish";

export interface PlayPageComponentProps extends BasePageComponentProps 
{
    messageContentPanelRef: React.RefObject<any>;
    createGameLobby: CreateGameLobby;

    currentGameLobbyMessage: string;
    currentGameLobby: GetGameLobby;
    currentGameLobbyMessages: GameLobbySendMessage[];
    currentGameState: GetGameState;
    currentGameCheat: GetGameCheat;
    currentGameWinner: GetGameUser;

    createGameButtonClickHandler: () => void;
    maxLobbyLimitListOnChangeHandler: (input: string) => void;
    gameLobbyNameInputOnChangeHandler: (input: string) => void;
    lobbyListItemClickHandler: (gameLobbyID: number) => void;
    sendMessageButtonClickHandler: (message: string) => void;
    startGameButtonClickHandler: () => void;
    leaveGameButtonClickHandler: () => void;
    gameLobbyStartGameHandler: (gameLobbyStartGame: GameLobbyStartGame) => void;
    gameLobbyLeaveGameHandler: (gameLobbyLeaveGame: GameLobbyLeaveGame) => void;
    gameLobbyJoinHandler: (gameLobbyJoin: GameLobbyJoin) => void;
    gameLobbySendMessageHandler: (gameLobbySendMessage: GameLobbySendMessage) => void;
    submitClaimButtonClickHandler: (claims: GetGameCard[], actual: GetGameCard[]) => void;
    gameClaimHandler: (gameClaim: GameClaim) => void;
    callCheatButtonClickHandler: () => void;
    gameCallCheatHandler: (gameCallCheat: GameCallCheat) => void;
    gameFinishHandler: (gameFinish: GameFinish) => void;
    finishButtonClickHandler: () => void;
    gameConnectionOnCloseHandler: () => void;
    gameModeListOnChangeHandler: (input: string) => void;
}

export class PlayPageComponentState extends BasePageComponentState {}

export class PlayPageComponent extends BasePageComponent<PlayPageComponentProps, PlayPageComponentState> 
{
    constructor(props: PlayPageComponentProps) 
    {
        super(props);
        if(isNullOrUndefined(props.loggedInUser)) 
        {
            props.history.push("/login");
            return;
        }

        this.state = 
        {
            pageStyle: null,
            useMobileStyle: null
        };
    }

    render() 
    {
        if(isNullOrUndefined(this.props.loggedInUser)) 
        {
            return null;
        }

        if(isNullOrUndefined(this.props.currentGameState)) 
        {
            return (
                <LobbyPageComponent
                    history={this.props.history}
                    location={this.props.location}
                    match={this.props.match}
                    
                    messageContentPanelRef={this.props.messageContentPanelRef}
                    loggedInUser={this.props.loggedInUser}
                    currentGameLobby={this.props.currentGameLobby}
                    currentGameLobbyMessages={this.props.currentGameLobbyMessages}
                    currentGameLobbyMessage={this.props.currentGameLobbyMessage}
                    createGameLobby={this.props.createGameLobby}

                    lobbyListItemClickHandler={this.props.lobbyListItemClickHandler}
                    sendMessageButtonClickHandler={this.props.sendMessageButtonClickHandler}
                    startGameButtonClickHandler={this.props.startGameButtonClickHandler}
                    leaveGameButtonClickHandler={this.props.leaveGameButtonClickHandler}
                    createGameButtonClickHandler={this.props.createGameButtonClickHandler}
                    gameLobbyNameInputOnChangeHandler={this.props.gameLobbyNameInputOnChangeHandler}
                    gameModeListOnChangeHandler={this.props.gameModeListOnChangeHandler}>
                </LobbyPageComponent>
            );
        }
        else 
        {
            return (
                <GamePageComponent
                    history={this.props.history}
                    location={this.props.location}
                    match={this.props.match}
                    
                    messageContentPanelRef={this.props.messageContentPanelRef}
                    loggedInUser={this.props.loggedInUser}
                    gameLobbyMessages={this.props.currentGameLobbyMessages}
                    gameLobby={this.props.currentGameLobby}
                    gameState={this.props.currentGameState}
                    gameCheat={this.props.currentGameCheat}
                    gameWinner={this.props.currentGameWinner}

                    sendMessageButtonClickHandler={this.props.sendMessageButtonClickHandler}
                    submitClaimButtonClickHandler={this.props.submitClaimButtonClickHandler}
                    callCheatButtonClickHandler={this.props.callCheatButtonClickHandler}
                    finishButtonClickHandler={this.props.finishButtonClickHandler}>
                </GamePageComponent>
            );
        }
    }

    gameLobbySendMessageHandler = (gameLobbySendMessage: GameLobbySendMessage) => 
    {
        this.gameLobbySendMessageHandler(gameLobbySendMessage);
    }
}