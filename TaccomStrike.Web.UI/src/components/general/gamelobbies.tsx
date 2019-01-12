import * as React from "react";
import { CardComponent, CardComponentStyle, CardRotationAnimation } from "./card";
import { ButtonComponent, ButtonComponentStyle } from "./button";
import styled from "styled-components";
import { GetGameLobby } from "../../models/rest/getgamelobby";
import { DisplayStyle } from "../../styles/displaystyle";

const GameLobbies = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.88);
`;

const ButtonsPanel = styled.div`
    overflow: auto;
    padding-left: 2px;
    padding-top: 2px;
    padding-bottom: 1px;
`;

const LobbyListItemsPanel = styled.div`
    margin-top: 1px;
    height: ${(p: LobbyListItemsPanelStyle) => p.displayStyle.getHeightString()};
    padding: ${(p: LobbyListItemsPanelStyle) => p.displayStyle.getPaddingString()};
    overflow-y: scroll;
    background-color: rgba(255, 255, 255, 0.1);
`;

const LobbyListItem = styled.div`
    height: 50px;
    width: 98%;
    margin-left: 1%;
    background-color: rgba(255, 255, 255, 0.7);
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.1);
    display: inline-block

    &:hover {
		background-color: rgba(255, 255, 255, 0.25);
		cursor: pointer;
	}
`;

const LobbyListItemColumn = styled.div`
    float: left;
`;

export class GameLobbiesComponentProps 
{
    gameLobbiesComponentStyle: GameLobbiesComponentStyle;
    gameLobbies: GetGameLobby[];

    lobbyListItemClickHandler: (gameLobbyID: number) => void;
    refreshButtonClickHandler: () => void;
}

export class GameLobbiesComponentState {}

export class GameLobbiesComponentStyle 
{
    cardComponentStyle: CardComponentStyle;
    lobbyListItemsPanelStyle: LobbyListItemsPanelStyle;

    refreshButtonComponentStyle: ButtonComponentStyle;
}

export class LobbyListItemsPanelStyle 
{
    displayStyle: DisplayStyle;
}

class LobbyListItemComponentProps 
{
    gameLobby: GetGameLobby;
    lobbyListItemClickHandler: (gameLobbyID: number) => void;
}

class LobbyListItemComponentState {}

class LobbyListItemComponent extends React.Component<LobbyListItemComponentProps, LobbyListItemComponentState> 
{
    constructor(props: LobbyListItemComponentProps) 
    {
        super(props);
    }

    render() 
    {
        return (
            <LobbyListItem
                key={this.props.gameLobby.gameLobbyID}
                onClick={this.lobbyListItemClickHandler}>
                <LobbyListItemColumn>{this.props.gameLobby.gameLobbyName}</LobbyListItemColumn>
                <LobbyListItemColumn>{this.props.gameLobby.players.length}/{this.props.gameLobby.maxRoomLimit}</LobbyListItemColumn>
            </LobbyListItem>
        );
    }

    lobbyListItemClickHandler = () => 
    {
        this.props.lobbyListItemClickHandler(this.props.gameLobby.gameLobbyID);
    }
}

export class GameLobbiesComponent extends React.Component<GameLobbiesComponentProps, GameLobbiesComponentState> 
{
    constructor(props: GameLobbiesComponentProps) 
    {
        super(props);
        this.state = 
        {
            gameLobbiesComponentStyle: props.gameLobbiesComponentStyle,
            gameLobbies: props.gameLobbies
        }
    }

    render() 
    {
        let lobbyListItems = this.props
            .gameLobbies
            .map((value: GetGameLobby, index: number) => {
                return (
                    <LobbyListItemComponent
                        gameLobby={value}
                        lobbyListItemClickHandler={this.lobbyListItemClickHandler}>
                    </LobbyListItemComponent>
                );
            });

        let gameLobbiesComponent = (
            <GameLobbies>
                <ButtonsPanel>
					<ButtonComponent
						buttonText="Refresh"
						buttonClickHandler={this.refreshButtonClickHandler}
						buttonComponentStyle={this.props.gameLobbiesComponentStyle.refreshButtonComponentStyle} />	
				</ButtonsPanel>

                <LobbyListItemsPanel
                    displayStyle={this.props.gameLobbiesComponentStyle.lobbyListItemsPanelStyle.displayStyle}>
                    {lobbyListItems}
                </LobbyListItemsPanel>
            </GameLobbies>
        );
        return (
			<CardComponent
				front={gameLobbiesComponent}
				cardStyle={this.props.gameLobbiesComponentStyle.cardComponentStyle}
				rotationAnimation={null}>
			</CardComponent>
		);
    }

    lobbyListItemClickHandler = (gameLobbyID: number) => 
    {
        this.props.lobbyListItemClickHandler(gameLobbyID);
    }

    refreshButtonClickHandler = () =>  
	{
		this.props.refreshButtonClickHandler();
    }
}