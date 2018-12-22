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
            createGameLobby: new CreateGameLobby()
        };

        this.retrieveGameLobbies();
    }

    render() 
    {
        let lobbyPageStyle = this.state.pageStyle as LobbyPageStyle;
		let titleWords = ["Game", "Lobbies"];
        let titlePanelStylings = [lobbyPageStyle.gameTitlePanelStyle, lobbyPageStyle.lobbiesTitlePanelStyle];
        
        console.log(this.state.createGameLobby);
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
                        refreshButtonClickHandler={this.refreshButtonClickHandler}
                        searchButtonClickHandler={this.searchButtonClickHandler}>
                    </GameLobbiesComponent>
                    <GameLobbyComponent
                        currentGameLobby={this.state.currentGameLobby}
                        createGameLobby={this.state.createGameLobby}
                        gameLobbyComponentStyle={lobbyPageStyle.gameLobbyComponentStyle}
                        gameLobbyNameInputOnChangeHandler={this.gameLobbyNameInputOnChangeHandler}
                        createGameButtonClickHandler={this.createGameButtonClickHandler}>
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

    refreshButtonClickHandler = () => 
    {
        this.retrieveGameLobbies();
    }

    searchButtonClickHandler = () => 
    {

    }

    createGameButtonClickHandler = () => 
    {
        GameLobbiesService
            .createGameLobby(this.state.createGameLobby)
            .then((value: GetGameLobby) => {
                this.setState({currentGameLobby: value});
            });
    }

    gameLobbyNameInputOnChangeHandler = (input: string) => 
    {
        let newCreateGameLobby = Object.assign({}, this.state.createGameLobby);
        newCreateGameLobby.gameLobbyName = input;
		this.setState({createGameLobby: newCreateGameLobby});
    }
}