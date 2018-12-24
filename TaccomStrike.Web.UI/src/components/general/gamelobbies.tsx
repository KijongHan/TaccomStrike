import * as React from "react";
import { CardComponent, CardComponentStyle, CardOrientation, CardTiltAnimation, CardFlipAnimation } from "./card";
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
    padding-top: 2px;
    padding-bottom: 1px;
`;

const LobbyListItemsPanel = styled.div`
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

    refreshButtonClickHandler: () => void;
    searchButtonClickHandler: () => void;
}

export class GameLobbiesComponentState 
{
    gameLobbiesComponentStyle: GameLobbiesComponentStyle;
    gameLobbies: GetGameLobby[];
}

export class GameLobbiesComponentStyle 
{
    cardComponentStyle: CardComponentStyle;
    lobbyListItemsPanelStyle: LobbyListItemsPanelStyle;

    refreshButtonComponentStyle: ButtonComponentStyle;
    searchButtonComponentStyle: ButtonComponentStyle;
}

export class LobbyListItemsPanelStyle 
{
    displayStyle: DisplayStyle;
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
        let lobbyListItems = this.state
            .gameLobbies
            .map((value: GetGameLobby, index: number) => {
                return (
                    <LobbyListItem
                        key={value.gameLobbyID}>
                        <LobbyListItemColumn>{value.gameLobbyName}</LobbyListItemColumn>
                        <LobbyListItemColumn>{value.players.length}/{value.maxRoomLimit}</LobbyListItemColumn>
                    </LobbyListItem>
                );
            });

        let gameLobbiesComponent = (
            <GameLobbies>
                <ButtonsPanel>
                    <ButtonComponent
						buttonText="Search"
						buttonClickHandler={this.searchButtonClickHandler}
						buttonComponentStyle={this.state.gameLobbiesComponentStyle.searchButtonComponentStyle} />
					<ButtonComponent
						buttonText="Refresh"
						buttonClickHandler={this.refreshButtonClickHandler}
						buttonComponentStyle={this.state.gameLobbiesComponentStyle.refreshButtonComponentStyle} />	
				</ButtonsPanel>

                <LobbyListItemsPanel
                    displayStyle={this.state.gameLobbiesComponentStyle.lobbyListItemsPanelStyle.displayStyle}>
                    {lobbyListItems}
                </LobbyListItemsPanel>
            </GameLobbies>
        );
        return (
			<CardComponent
				panel={gameLobbiesComponent}
				changeTriggers={[this.state.gameLobbiesComponentStyle, this.state.gameLobbies]}
				cardStyle={this.state.gameLobbiesComponentStyle.cardComponentStyle}
				cardOrientation={CardOrientation.Front}
				flipAnimation={null}
				tiltAnimation={null}>
			</CardComponent>
		);
    }

    refreshButtonClickHandler = () =>  
	{
		this.props.refreshButtonClickHandler();
    }
    
    searchButtonClickHandler = () =>  
	{
		this.props.searchButtonClickHandler();
    }
    
    componentDidUpdate(prevProps: GameLobbiesComponentProps, prevState: GameLobbiesComponentState)
	{
		if (this.props.gameLobbiesComponentStyle !== prevProps.gameLobbiesComponentStyle)
		{
			this.setState({ gameLobbiesComponentStyle: this.props.gameLobbiesComponentStyle });
		}
		if(this.props.gameLobbies !== prevProps.gameLobbies) 
		{
			this.setState({ gameLobbies: this.props.gameLobbies });
        }
	}
}