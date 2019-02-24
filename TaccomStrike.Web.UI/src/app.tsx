import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import * as React from "react";
import { LoginPageComponent, LoginPageComponentProps } from "./components/page/login";
import { PlayPageComponent, PlayPageComponentProps } from "./components/page/play";
import { GetUser } from "./models/rest/getuser";
import { HomePageComponent, HomePageComponentProps } from "./components/page/home";
import { GetGameLobby } from "./models/rest/getgamelobby";
import { GameLobbySendMessage } from "./models/hub/gamelobbysendmessage";
import { GetGameState } from "./models/rest/getgamestate";
import { GetGameCheat } from "./models/rest/getgamecheat";
import { GetGameUser } from "./models/rest/getgameuser";
import { CreateGameLobby } from "./models/rest/creategamelobby";
import { GameLobbyLeaveGame } from "./models/hub/gamelobbyleave";
import { GameLobbyStartGame } from "./models/hub/gamelobbystart";
import { isNullOrUndefined } from "util";
import { GameConnectionsService } from "./services/hub/gameconnections";
import { GameLobbyJoin } from "./models/hub/gamelobbyjoin";
import { GameLobbiesService } from "./services/rest/gamelobbies";
import { GetGameCard } from "./models/rest/getgamecard";
import { GameClaim } from "./models/hub/gameclaim";
import { GameCallCheat } from "./models/hub/gamecallcheat";
import { GameFinish } from "./models/hub/gamefinish";

export class AppComponentState 
{
    loggedInUser: GetUser;

    createGameLobby: CreateGameLobby;

    currentGameLobbyMessage: string;
    currentGameLobby: GetGameLobby;
    currentGameLobbyMessages: GameLobbySendMessage[];
    currentGameState: GetGameState;
    currentGameCheat: GetGameCheat;
    currentGameWinner: GetGameUser;
}

export class AppComponent extends React.Component<{}, AppComponentState> 
{
    messageContentPanelRef: React.RefObject<any>;

    constructor(props: any) 
    {
        super(props);
        this.state = {
            loggedInUser: null,
            currentGameLobby: null,
            currentGameState: null,
            currentGameCheat: null,
            currentGameWinner: null,
            currentGameLobbyMessages: [],
            currentGameLobbyMessage: null,
            createGameLobby: new CreateGameLobby()
        };
        this.messageContentPanelRef = React.createRef();
    } 

	render() 
	{
		return (
			<BrowserRouter>
				<Switch>
                    <Route 
                        path="/login"
                        render={
                            (props: LoginPageComponentProps) => 
                            <LoginPageComponent
                                loggedInUser={this.state.loggedInUser}
                                userLoggedIn={this.userLoggedInHandler}
                                history={props.history}
                                location={props.location}
                                match={props.match}>    
                            </LoginPageComponent>}/>
                    <Route 
                        path="/play"
                        render={
                            (props: PlayPageComponentProps) =>
                            <PlayPageComponent
                                messageContentPanelRef={this.messageContentPanelRef}
                                loggedInUser={this.state.loggedInUser}
                                createGameLobby={this.state.createGameLobby}
                                currentGameLobbyMessage={this.state.currentGameLobbyMessage}
                                currentGameLobby={this.state.currentGameLobby}
                                currentGameLobbyMessages={this.state.currentGameLobbyMessages}
                                currentGameState={this.state.currentGameState}
                                currentGameCheat={this.state.currentGameCheat}
                                currentGameWinner={this.state.currentGameWinner}

                                createGameButtonClickHandler={this.createGameButtonClickHandler}
                                maxLobbyLimitListOnChangeHandler={this.maxLobbyLimitListOnChangeHandler}
                                gameLobbyNameInputOnChangeHandler={this.gameLobbyNameInputOnChangeHandler}
                                lobbyListItemClickHandler={this.lobbyListItemClickHandler}
                                sendMessageButtonClickHandler={this.sendMessageButtonClickHandler}
                                startGameButtonClickHandler={this.startGameButtonClickHandler}
                                leaveGameButtonClickHandler={this.leaveGameButtonClickHandler}
                                gameLobbyStartGameHandler={this.gameLobbyStartGameHandler}
                                gameLobbyLeaveGameHandler={this.gameLobbyLeaveGameHandler}
                                gameLobbyJoinHandler={this.gameLobbyJoinHandler}
                                gameLobbySendMessageHandler={this.gameLobbySendMessageHandler}
                                submitClaimButtonClickHandler={this.submitClaimButtonClickHandler}
                                gameClaimHandler={this.gameClaimHandler}
                                callCheatButtonClickHandler={this.callCheatButtonClickHandler}
                                gameCallCheatHandler={this.gameCallCheatHandler}
                                gameFinishHandler={this.gameFinishHandler}
                                finishButtonClickHandler={this.finishButtonClickHandler}
                                gameConnectionOnCloseHandler={this.gameConnectionOnCloseHandler}
                                gameModeListOnChangeHandler={this.gameModeListOnChangeHandler}
                                history={props.history}
                                location={props.location}
                                match={props.match}>
                            </PlayPageComponent>}/>
                    <Route 
                        path="/"
                        render={
                            (props: HomePageComponentProps) => 
                            <HomePageComponent
                                loggedInUser={this.state.loggedInUser}
                                history={props.history}
                                location={props.location}
                                match={props.match}>    
                            </HomePageComponent>}/>
                    <Redirect from="/home" to="/"/>
                    <Redirect from="/news" to="/"/>
				</Switch>
			</BrowserRouter>
		);
    }
    
    userLoggedInHandler = (user: GetUser) => 
    {
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
                GameConnectionsService.onCloseHandler = this.gameConnectionOnCloseHandler;
            })
            .catch(() => {
                window.location.href = "/";
            });
        this.setState({
            loggedInUser: user
        });
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
        if(this.state.currentGameLobby.host.userID !== this.state.loggedInUser.userID) 
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
        if(this.state.loggedInUser.userID===gameLobbyLeaveGame.playerLeaving.userID) 
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
        this.messageContentPanelRef.current.scrollTop = this.messageContentPanelRef.current.scrollHeight - this.messageContentPanelRef.current.clientHeight;
        
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

    gameConnectionOnCloseHandler = () => 
    {
        window.location.href = "/";
    }

    gameModeListOnChangeHandler = (input: string) => 
    {
        let newCreateGameLobby = Object.assign({}, this.state.createGameLobby);
        newCreateGameLobby.gameMode = Number.parseInt(input);

        this.setState({
            createGameLobby: newCreateGameLobby
        });
    }

    componentDidMount() 
    {
        let loadingScreen = document.getElementById("LoadingScreen");
        loadingScreen.style.display = "none";
    }
}