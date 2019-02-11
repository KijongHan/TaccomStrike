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
import { GetGameClaim } from "../../models/rest/getgameclaim";
import { GetGameCard } from "../../models/rest/getgamecard";
import { GameClaim } from "../../models/hub/gameclaim";
import { GameCallCheat } from "../../models/hub/gamecallcheat";
import { GetGameUser } from "../../models/rest/getgameuser";
import { GetGameCheat } from "../../models/rest/getgamecheat";
import { GameFinish } from "../../models/hub/gamefinish";

export interface PlayPageComponentProps extends BasePageComponentProps {}

export class PlayPageComponentState extends BasePageComponentState 
{
    gameLobbies: GetGameLobby[];
    createGameLobby: CreateGameLobby;

    currentGameLobbyMessage: string;
    currentGameLobby: GetGameLobby;
    currentGameLobbyMessages: GameLobbySendMessage[];
    currentGameState: GetGameState;
    currentGameCheat: GetGameCheat;
    currentGameWinner: GetGameUser;
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
            currentGameCheat: null,
            currentGameWinner: null,
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
                GameConnectionsService.addGameLobbyLeaveGameHandler(this.gameLobbyLeaveGameHandler);
                GameConnectionsService.addGameClaimHandler(this.gameClaimHandler);
                GameConnectionsService.addGameCallCheatHandler(this.gameCallCheatHandler);
                GameConnectionsService.addGameFinishHandler(this.gameFinishHandler);
            })
            .catch(() => {
                this.props.history.push("/");
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
                    
                    loggedInUser={this.props.loggedInUser}
                    currentGameLobby={this.state.currentGameLobby}
                    currentGameLobbyMessages={this.state.currentGameLobbyMessages}
                    currentGameLobbyMessage={this.state.currentGameLobbyMessage}
                    createGameLobby={this.state.createGameLobby}
                    gameLobbies={this.state.gameLobbies}

                    lobbyListItemClickHandler={this.lobbyListItemClickHandler}
                    sendMessageButtonClickHandler={this.sendMessageButtonClickHandler}
                    startGameButtonClickHandler={this.startGameButtonClickHandler}
                    leaveGameButtonClickHandler={this.leaveGameButtonClickHandler}
                    createGameButtonClickHandler={this.createGameButtonClickHandler}
                    gameLobbyNameInputOnChangeHandler={this.gameLobbyNameInputOnChangeHandler}
                    refreshButtonClickHandler={this.refreshButtonClickHandler}>
                </LobbyPageComponent>
            );
        }
        else 
        {
            let gameLobbyMessages = this.state.currentGameLobbyMessages.map((value: GameLobbySendMessage) => {
                return value.chatMessage;
            });
            return (
                <GamePageComponent
                    history={this.props.history}
                    location={this.props.location}
                    match={this.props.match}
                    
                    loggedInUser={this.props.loggedInUser}
                    gameLobbyMessages={gameLobbyMessages}
                    gameLobby={this.state.currentGameLobby}
                    gameState={this.state.currentGameState}
                    gameCheat={this.state.currentGameCheat}
                    gameWinner={this.state.currentGameWinner}

                    sendMessageButtonClickHandler={this.sendMessageButtonClickHandler}
                    submitClaimButtonClickHandler={this.submitClaimButtonClickHandler}
                    callCheatButtonClickHandler={this.callCheatButtonClickHandler}
                    finishButtonClickHandler={this.finishButtonClickHandler}>
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
        if(this.state.currentGameLobby.host.userID !== this.props.loggedInUser.userID) 
        {
            return;
        }
        GameConnectionsService.gameLobbyStartGame(this.state.currentGameLobby.gameLobbyID);
    }

    leaveGameButtonClickHandler = () => 
    {
        if(isNullOrUndefined(this.state.currentGameLobby)) 
        {
            return;
        }
        GameConnectionsService.gameLobbyLeaveGame(this.state.currentGameLobby.gameLobbyID);
    }

    gameLobbyStartGameHandler = (gameLobbyStartGame: GameLobbyStartGame) => 
    {
        this.setState({currentGameState: gameLobbyStartGame.gameState});
    }

    gameLobbyLeaveGameHandler = (gameLobbyLeaveGame: GameLobbyLeaveGame) => 
    {
        if(this.props.loggedInUser.userID===gameLobbyLeaveGame.playerLeaving.userID) 
        {
            this.setState({currentGameLobby: null});
            this.setState({currentGameLobbyMessages: []});
            this.setState({currentGameLobbyMessage: null});
        }
        else 
        {
            let currentGameLobby = this.state.currentGameLobby;
            currentGameLobby.players = gameLobbyLeaveGame.players;
            this.setState({currentGameLobby: currentGameLobby});  
        }
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

    submitClaimButtonClickHandler = (claims: GetGameCard[], actual: GetGameCard[]) =>
    {
        GameConnectionsService.gameSubmitClaim(this.state.currentGameLobby.gameLobbyID, claims, actual);
    }

    gameClaimHandler = (gameClaim: GameClaim) =>
    {
        this.setState({currentGameState: gameClaim.gameState});
    }

    callCheatButtonClickHandler = () => 
    {
        GameConnectionsService.gameCallCheat(this.state.currentGameLobby.gameLobbyID);
    }

    gameCallCheatHandler = (gameCallCheat: GameCallCheat) => 
    {
        this.setState({
            currentGameCheat: gameCallCheat.gameCheat,
            currentGameState: gameCallCheat.gameState
        });
    }

    gameFinishHandler = (gameFinish: GameFinish) => 
    {
        this.setState({
            currentGameWinner: gameFinish.winner
        });
    }

    finishButtonClickHandler = () => 
    {
        this.setState({
            currentGameLobbyMessages: [],
            currentGameLobbyMessage: null,
            currentGameWinner: null,
            currentGameCheat: null,
            currentGameLobby: null,
            currentGameState: null
        });
    }
}