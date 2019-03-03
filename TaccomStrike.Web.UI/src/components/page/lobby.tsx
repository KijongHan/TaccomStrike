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
import { GameLobbySendMessage } from "../../models/hub/gamelobbysendmessage";
import { isNullOrUndefined } from "util";
import { GameLobbyLeaveGame } from "../../models/hub/gamelobbyleave";
import { GameLobbyStartGame } from "../../models/hub/gamelobbystart";
import { NavbarComponent, NavbarComponentStyle } from "../general/navbar";
import { FooterComponent } from "../general/footer";

const LobbyPage = styled.div`
    width: 100%;
	height: 100%;
	font-family: 'Cormorant Upright', serif;
`;

const PanelsContainer = styled.div`
	overflow: auto;
	padding-top: 10px;
	padding-bottom: 50px;
`;

export interface LobbyPageComponentProps extends BasePageComponentProps 
{
    createGameLobby: CreateGameLobby;

    currentGameLobbyMessage: string;
    currentGameLobby: GetGameLobby;
    currentGameLobbyMessages: GameLobbySendMessage[];

    messageContentPanelRef: React.RefObject<any>;

    lobbyListItemClickHandler: (gameLobbyID: number) => void;
    sendMessageButtonClickHandler: (message: string) => void;
    startGameButtonClickHandler: () => void;
    leaveGameButtonClickHandler: () => void;
    createGameButtonClickHandler: () => void;
    gameLobbyNameInputOnChangeHandler: (input: string) => void;
    gameModeListOnChangeHandler: (input: string) => void;
}

export class LobbyPageComponentState extends BasePageComponentState 
{
    gameLobbies: GetGameLobby[];
    gameLobbiesRefreshIntervalID: number;
}

export class LobbyPageComponent extends BasePageComponent<LobbyPageComponentProps, LobbyPageComponentState>
{
    constructor(props: LobbyPageComponentProps) 
	{
        super(props);
        let pageStyle = new LobbyPageStyle().large()
        this.state = 
        {
            pageStyle: pageStyle,
            useMobileStyle: false,
            gameLobbies: [],

            gameLobbiesRefreshIntervalID: null
        };
    }

    render() 
    {
        let lobbyPageStyle = this.state.pageStyle as LobbyPageStyle;
		let titleWords = ["Game", "Lobby"];
        let titlePanelStylings = [lobbyPageStyle.gameTitlePanelStyle, lobbyPageStyle.lobbiesTitlePanelStyle];
        
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
                        lobbyListItemClickHandler={this.props.lobbyListItemClickHandler}
                        refreshButtonClickHandler={this.refreshButtonClickHandler}>
                    </GameLobbiesComponent>
                    <GameLobbyComponent
                        messageContentPanelRef={this.props.messageContentPanelRef}
                        loggedInUser={this.props.loggedInUser}
                        currentGameLobby={this.props.currentGameLobby}
                        createGameLobby={this.props.createGameLobby}
                        gameLobbyComponentStyle={lobbyPageStyle.gameLobbyComponentStyle}
                        gameLobbyNameInputOnChangeHandler={this.props.gameLobbyNameInputOnChangeHandler}
                        gameModeListOnChangeHandler={this.props.gameModeListOnChangeHandler}
                        createGameButtonClickHandler={this.props.createGameButtonClickHandler}
                        startGameButtonClickHandler={this.props.startGameButtonClickHandler}
                        leaveGameButtonClickHandler={this.props.leaveGameButtonClickHandler}
                        currentGameLobbyMessages={this.props.currentGameLobbyMessages}
                        sendMessageButtonHandler={this.props.sendMessageButtonClickHandler}>
                    </GameLobbyComponent>
                </PanelsContainer>
				<FooterComponent/>

                <NavbarComponent
                    history={this.props.history}
                    navbarComponentStyle={lobbyPageStyle.navbarComponentStyle}
                    playNavbarItemStyle={lobbyPageStyle.playNavbarItemStyle}
                    communityNavbarItemStyle={lobbyPageStyle.communityNavbarItemStyle}
                    newsNavbarItemStyle={lobbyPageStyle.newsNavbarItemStyle}>
                </NavbarComponent>
            </LobbyPage>
        );
    }

    componentDidMount() 
    {
        super.componentDidMount();
        this.retrieveGameLobbies();
        let intervalID = window.setInterval(() => {
			this.retrieveGameLobbies();
		}, 15000);
		this.setState({
			gameLobbiesRefreshIntervalID: intervalID
		});
    }

    componentWillUnmount() 
    {
        super.componentWillUnmount();
		window.clearInterval(this.state.gameLobbiesRefreshIntervalID);
		this.setState({
			gameLobbiesRefreshIntervalID: null
		});
    }

    retrieveGameLobbies = () => 
    {
        GameLobbiesService
            .getGameLobbies()
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
}