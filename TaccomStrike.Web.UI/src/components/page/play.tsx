import { BasePageComponent, BasePageComponentProps, BasePageComponentState } from "./base";
import * as React from "react";
import { GamePageComponent } from "./game";
import { LobbyPageComponent } from "./lobby";
import { GetGameLobby } from "../../models/rest/getgamelobby";
import { GetGameState } from "../../models/rest/getgamestate";
import { isNullOrUndefined } from "util";
import { GameConnectionsService } from "../../services/hub/gameconnections";
import { EnvironmentUtil } from "../../utils/environment";
import { GameLobbyStartGame } from "../../models/hub/gamelobbystart";
import { GameLobbyLeaveGame } from "../../models/hub/gamelobbyleave";
import { GameLobbyJoin } from "../../models/hub/gamelobbyjoin";
import { GameLobbySendMessage } from "../../models/hub/gamelobbysendmessage";
import { CreateGameLobby } from "../../models/rest/creategamelobby";
import { GameLobbiesService } from "../../services/rest/gamelobbies";

export interface PlayPageComponentProps extends BasePageComponentProps {}

export class PlayPageComponentState extends BasePageComponentState 
{
    gameLobbies: GetGameLobby[];
    createGameLobby: CreateGameLobby;

    currentGameLobbyMessage: string;
    currentGameLobby: GetGameLobby;
    currentGameLobbyMessages: GameLobbySendMessage[];
    currentGameState: GetGameState;
}

export class PlayPageComponent extends BasePageComponent<PlayPageComponentProps, PlayPageComponentState> 
{
    constructor(props: PlayPageComponentProps) 
    {
        super(props);
        this.state = 
        {
            currentGameLobby: null,
            currentGameState: null,
            currentGameLobbyMessages: [],
            pageStyle: null,

            gameLobbies: [],
            createGameLobby: new CreateGameLobby(),
            currentGameLobbyMessage: null
        };
        this.retrieveGameLobbies();

        GameConnectionsService
            .initializeGameConnections()
            .then(() => {
                GameConnectionsService.addGameLobbyJoinHandler(this.gameLobbyJoinHandler);
                GameConnectionsService.addGameLobbySendMessageHandler(this.gameLobbySendMessageHandler);
                GameConnectionsService.addGameLobbyStartGameHandler(this.gameLobbyStartGameHandler);
            });
    }

    render() 
    {
        if(isNullOrUndefined(this.state.currentGameState)) 
        {
            return (
                <LobbyPageComponent
                    history={this.props.history}
                    location={this.props.location}
                    match={this.props.match}
                    
                    currentGameLobby={this.state.currentGameLobby}
                    currentGameLobbyMessages={this.state.currentGameLobbyMessages}
                    currentGameLobbyMessage={this.state.currentGameLobbyMessage}
                    createGameLobby={this.state.createGameLobby}
                    gameLobbies={this.state.gameLobbies}

                    lobbyListItemClickHandler={this.lobbyListItemClickHandler}
                    sendMessageButtonClickHandler={this.sendMessageButtonClickHandler}
                    startGameButtonClickHandler={this.startGameButtonClickHandler}
                    createGameButtonClickHandler={this.createGameButtonClickHandler}
                    gameLobbyNameInputOnChangeHandler={this.gameLobbyNameInputOnChangeHandler}
                    maxLobbyLimitListOnChangeHandler={this.maxLobbyLimitListOnChangeHandler}
                    refreshButtonClickHandler={this.refreshButtonClickHandler}>
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
                    
                    gameState={this.state.currentGameState}>
                </GamePageComponent>
            );
        }
    }

    retrieveGameLobbies = () => 
    {
        GameLobbiesService
            .getChatRooms()
            .then((value: GetGameLobby[]) => {
                this.setState({
                    gameLobbies: value
                })
            });
    }

    refreshButtonClickHandler = () => 
    {
        this.retrieveGameLobbies();
    }

    createGameButtonClickHandler = () => 
    {
        if(isNullOrUndefined(this.state.createGameLobby.gameLobbyName) || this.state.createGameLobby.gameLobbyName==="") 
        {
            return;
        }

        GameLobbiesService
            .createGameLobby(this.state.createGameLobby)
            .then((value: GetGameLobby) => {
                console.log(value);
                GameConnectionsService.gameLobbyJoin(value.gameLobbyID);
            });
    }

    maxLobbyLimitListOnChangeHandler = (input: string) => 
	{
        let newCreateGameLobby = Object.assign({}, this.state.createGameLobby);
        newCreateGameLobby.maxRoomLimit = Number(input);
        this.setState({createGameLobby: newCreateGameLobby});
	}

    gameLobbyNameInputOnChangeHandler = (input: string) => 
    {
        let newCreateGameLobby = Object.assign({}, this.state.createGameLobby);
        newCreateGameLobby.gameLobbyName = input;
		this.setState({createGameLobby: newCreateGameLobby});
    }

    lobbyListItemClickHandler = (gameLobbyID: number) => 
    {
        if(isNullOrUndefined(this.state.currentGameLobby)) 
        {
            GameConnectionsService.gameLobbyJoin(gameLobbyID);
        }
    }

    sendMessageButtonClickHandler = (message: string) => 
    {
        GameConnectionsService.gameLobbySendMessage(message, this.state.currentGameLobby.gameLobbyID);
    }

    startGameButtonClickHandler = () => 
    {
        if(isNullOrUndefined(this.state.currentGameLobby)) 
        {
            return;
        }
        if(this.state.currentGameLobby.host.userId !== EnvironmentUtil.loggedInUser.userId) 
        {
            return;
        }
        GameConnectionsService.gameLobbyStartGame(this.state.currentGameLobby.gameLobbyID);
    }

    gameLobbyStartGameHandler = (gameLobbyStartGame: GameLobbyStartGame) => 
    {
        this.setState({currentGameState: gameLobbyStartGame.gameState});
    }

    gameLobbyLeaveGameHandler = (gameLobbyLeaveGame: GameLobbyLeaveGame) => 
    {
        let currentGameLobby = this.state.currentGameLobby;
        currentGameLobby.players = gameLobbyLeaveGame.players;
        this.setState({currentGameLobby: currentGameLobby});    
    }

    gameLobbyJoinHandler = (gameLobbyJoin: GameLobbyJoin) => 
    {
        this.setState({currentGameLobby: gameLobbyJoin.gameLobby});
    }

    gameLobbySendMessageHandler = (gameLobbySendMessage: GameLobbySendMessage) => 
    {
        let currentList = this.state.currentGameLobbyMessages;
        this.setState({currentGameLobbyMessages: currentList.concat(gameLobbySendMessage)});
    }
}