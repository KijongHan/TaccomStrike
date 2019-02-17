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
    gameLobbies: GetGameLobby[];
    createGameLobby: CreateGameLobby;

    currentGameLobbyMessage: string;
    currentGameLobby: GetGameLobby;
    currentGameLobbyMessages: GameLobbySendMessage[];

    messageContentPanelRef: React.RefObject<any>;

    lobbyListItemClickHandler: (gameLobbyID: number) => void;
    sendMessageButtonClickHandler: (message: string) => void;
    startGameButtonClickHandler: () => void;
    leaveGameButtonClickHandler: () => void;
    refreshButtonClickHandler: () => void;
    createGameButtonClickHandler: () => void;
    gameLobbyNameInputOnChangeHandler: (input: string) => void;
    gameModeListOnChangeHandler: (input: string) => void;
}

export class LobbyPageComponentState extends BasePageComponentState {}

export class LobbyPageComponent extends BasePageComponent<LobbyPageComponentProps, LobbyPageComponentState>
{
    navbarRef: React.RefObject<any>;

    constructor(props: LobbyPageComponentProps) 
	{
        super(props);
        let pageStyle = new LobbyPageStyle().large()
        this.state = 
        {
            pageStyle: pageStyle
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
                        gameLobbies={this.props.gameLobbies}
                        lobbyListItemClickHandler={this.props.lobbyListItemClickHandler}
                        refreshButtonClickHandler={this.props.refreshButtonClickHandler}>
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

                <NavbarComponent
                    navbarRef={this.navbarRef}
                    navbarComponentStyle={lobbyPageStyle.navbarComponentStyle}
                    playNavbarItemStyle={lobbyPageStyle.playNavbarItemStyle}
                    communityNavbarItemStyle={lobbyPageStyle.communityNavbarItemStyle}
                    newsNavbarItemStyle={lobbyPageStyle.newsNavbarItemStyle}>
                </NavbarComponent>
            </LobbyPage>
        );
    }
}