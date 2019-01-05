import * as React from "react";
import styled from "styled-components";
import { BasePageComponent, BasePageComponentProps, BasePageComponentState } from "./base";
import { LobbyPageStyle } from "../pagestyles/lobby";
import {GameLobbiesComponent} from "../general/gamelobbies";
import { TitlePanelsStyle, TitlePanelsComponent } from "../general/titlepanels";
import { GameLobbyComponent } from "../general/gamelobby";
import { GetGameLobby } from "../../models/rest/getgamelobby";
import { CreateGameLobby } from "../../models/rest/creategamelobby";
import { GameLobbiesService } from "../../services/rest/gamelobbies";
import { GameConnectionsService } from "../../services/hub/gameconnections";
import { GameLobbyJoin } from "../../models/hub/gamelobbyjoin";
import { EnvironmentUtil } from "../../utils/environment";
import { GameLobbySendMessage } from "../../models/hub/gamelobbysendmessage";
import { isNullOrUndefined } from "util";
import { GameLobbyLeaveGame } from "../../models/hub/gamelobbyleave";
import { GameLobbyStartGame } from "../../models/hub/gamelobbystart";

const LobbyPage = styled.div`
	height: 100%;
	font-family: 'Cormorant Upright', serif;
`;

const PanelsContainer = styled.div`
	overflow: auto;
	padding-top: 10px;
	padding-bottom: 50px;
`;

export interface LobbyPageComponentProps extends BasePageComponentProps {}

export class LobbyPageComponentState extends BasePageComponentState 
{
    gameLobbies: GetGameLobby[];
    currentGameLobby: GetGameLobby;
    createGameLobby: CreateGameLobby;

    gameLobbyMessage: string;
    gameLobbyMessages: GameLobbySendMessage[];
}

export class LobbyPageComponent extends BasePageComponent<LobbyPageComponentProps, LobbyPageComponentState>
{
    constructor(props: LobbyPageComponentProps) 
	{
        super(props);
        this.state = 
        {
            pageStyle: new LobbyPageStyle().large(),
            gameLobbies: [],
            currentGameLobby: null,
            createGameLobby: new CreateGameLobby(),

            gameLobbyMessage: null,
            gameLobbyMessages: []
        };
        this.retrieveGameLobbies();
        GameConnectionsService
            .initializeGameConnections()
            .then(() => {
                GameConnectionsService.addGameLobbyJoinHandler(this.gameLobbyJoinHandler);
                GameConnectionsService.addGameLobbySendMessageHandler(this.gameLobbySendMessageHandler);
            });
    }

    render() 
    {
        let lobbyPageStyle = this.state.pageStyle as LobbyPageStyle;
		let titleWords = ["Game", "Lobbies"];
        let titlePanelStylings = [lobbyPageStyle.gameTitlePanelStyle, lobbyPageStyle.lobbiesTitlePanelStyle];

        let gameLobbyMessages = this.state.gameLobbyMessages.map((value: GameLobbySendMessage) => {
            return value.chatMessage;
        });
        
        return (
            <LobbyPage>
                <TitlePanelsComponent
					titleWords={titleWords}
					titlePanelStyles={titlePanelStylings}
					titlePanelsStyle={lobbyPageStyle.titlePanelsStyle}>
				</TitlePanelsComponent>

                <PanelsContainer>
                    <GameLobbiesComponent
                        gameLobbiesComponentStyle={lobbyPageStyle.gameLobbiesComponentStyle}
                        gameLobbies={this.state.gameLobbies}
                        lobbyListItemClickHandler={this.lobbyListItemClickHandler}
                        refreshButtonClickHandler={this.refreshButtonClickHandler}>
                    </GameLobbiesComponent>
                    <GameLobbyComponent
                        currentGameLobby={this.state.currentGameLobby}
                        createGameLobby={this.state.createGameLobby}
                        gameLobbyComponentStyle={lobbyPageStyle.gameLobbyComponentStyle}
                        gameLobbyNameInputOnChangeHandler={this.gameLobbyNameInputOnChangeHandler}
                        maxLobbyLimitListOnChangeHandler={this.maxLobbyLimitListOnChangeHandler}
                        createGameButtonClickHandler={this.createGameButtonClickHandler}
                        startGameButtonClickHandler={this.startGameButtonClickHandler}
                        currentGameLobbyMessages={gameLobbyMessages}
                        sendMessageButtonHandler={this.sendMessageButtonClickHandler}>
                    </GameLobbyComponent>
                </PanelsContainer>
            </LobbyPage>
        );
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

    refreshButtonClickHandler = () => 
    {
        this.retrieveGameLobbies();
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

    gameLobbyStartGameHandler = (gameLobbyStartGame: GameLobbyStartGame) => 
    {
        this.props.history.push("/game?");
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
        let currentList = this.state.gameLobbyMessages;
        this.setState({gameLobbyMessages: currentList.concat(gameLobbySendMessage)});
    }
}