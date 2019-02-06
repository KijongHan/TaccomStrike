import * as React from "react";
import { ButtonComponent, ButtonComponentStyle } from "./button";
import styled from "styled-components";
import { CardComponent, CardComponentStyle, CardRotationAnimation } from "./card";
import { GetGameLobby } from "../../models/rest/getgamelobby";
import { CreateGameLobby } from "../../models/rest/creategamelobby";
import { LabelledInputComponent, LabelledInputComponentStyle } from "./labelledinput";
import { LabelledListComponent, LabelledListComponentStyle, ListItem } from "./labelledlist";
import { isNullOrUndefined } from "util";
import { ButtonedInputComponentStyle, ButtonedInputComponent } from "./buttonedinput";
import { DisplayStyle } from "../../styles/displaystyle";
import { GetChatMessage } from "../../models/rest/getchatmessage";
import { GetUser } from "../../models/rest/getuser";
import { ColorStyle } from "../../styles/colorstyle";

const ButtonsPanel = styled.div`
    overflow: auto;
    bottom: 10px;
    width: 100%;
    padding-left: 2px;
    padding-top: 2px;
    padding-bottom: 2px;
`;

const CreateGameLobbyElement = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${ColorStyle.pallet3};
    overflow: auto;
    -webkit-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	-moz-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
`;

const CurrentGameLobbyElement = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${ColorStyle.pallet3};
    padding: 5px 5px 5px 5px;
    overflow: auto;
    -webkit-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	-moz-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
`;

const GameLobbyContentPanel = styled.div`
    overflow: auto;
    display: inline-block;
    height: ${(p : GameLobbyContentPanelStyle) => p.displayStyle.getHeightString()};
    width: ${(p : GameLobbyContentPanelStyle) => p.displayStyle.getWidthString()};
`;

const GameLobbyPlayersPanel = styled.div`
    background-color: rgba(255, 255, 255, 0.2);
    float: ${(p : GameLobbyMessagesPanelStyle) => p.displayStyle.getFloatString()};
    height: ${(p : GameLobbyPlayersPanelStyle) => p.displayStyle.getHeightString()};
    width: ${(p : GameLobbyPlayersPanelStyle) => p.displayStyle.getWidthString()};
    border-style: solid;
    border-width: 1px;
    border-color: ${ColorStyle.pallet2};
    overflow-y: scroll;
`;

const GameLobbyPlayerItem = styled.div`
    font-size: 1.25em;
    font-weight: bold;
    height: 40px;
    padding: 5px 5px 5px 5px;
    border-style: solid;
    border-width: 1px;
    color: ${ColorStyle.pallet1};
    border-color: ${ColorStyle.pallet2};
`;

const GameLobbyMessagesPanel = styled.div`
    background-color: rgba(255, 255, 255, 0.2);
    float: ${(p : GameLobbyMessagesPanelStyle) => p.displayStyle.getFloatString()};
    height: ${(p : GameLobbyMessagesPanelStyle) => p.displayStyle.getHeightString()};
    width: ${(p : GameLobbyMessagesPanelStyle) => p.displayStyle.getWidthString()};
    border-style: solid;
    border-width: 1px;
    border-color: ${ColorStyle.pallet2};
`;

const GameLobbyMessageItem = styled.div`
    display: inline-block;
    width: 100%;
    font-size: 1.1em;
    padding: 1px 7px 1px 7px;
    color: ${ColorStyle.pallet1};
`;

const GameLobbyMessagePlayerItem = styled.div`
    float: left;
    font-weight: bold;
`;

const GameLobbyMessageMessageItem = styled.div`
    float: left;
    padding-left: 5px;
`;

export class GameLobbyComponentProps 
{
    gameLobbyComponentStyle: GameLobbyComponentStyle;
    currentGameLobby: GetGameLobby;
    currentGameLobbyMessages: GetChatMessage[];
    createGameLobby: CreateGameLobby;

    gameLobbyNameInputOnChangeHandler: (input: string) => void;
    startGameButtonClickHandler: () => void;
    leaveGameButtonClickHandler: () => void;
    createGameButtonClickHandler: () => void;
    sendMessageButtonHandler: (message: string) => void;
}

export class GameLobbyComponentState 
{
    listItems: ListItem[];
    gameLobbyMessage: string;
}

export class GameLobbyComponentStyle 
{
    cardComponentStyle: CardComponentStyle;

    gameLobbyNameLabelledInputStyle: LabelledInputComponentStyle;
    maxLobbyLimitLabelledListStyle: LabelledListComponentStyle;
    createGameButtonStyle: ButtonComponentStyle;

    gameLobbyContentPanelStyle: GameLobbyContentPanelStyle;
    gameLobbyPlayersPanelStyle: GameLobbyPlayersPanelStyle;
    gameLobbyMessagesPanelStyle: GameLobbyMessagesPanelStyle;
    gameLobbyMessageButtonedInputStyle: ButtonedInputComponentStyle; 
    startGameButtonStyle: ButtonComponentStyle;
    leaveGameButtonStyle: ButtonComponentStyle;

    currentGameLobbyFlipAnimation: CardRotationAnimation;
    createGameLobbyFlipAnimation: CardRotationAnimation;
}

export class GameLobbyContentPanelStyle 
{
    displayStyle: DisplayStyle;
}

export class GameLobbyPlayersPanelStyle 
{
    displayStyle: DisplayStyle;
}

export class GameLobbyMessagesPanelStyle 
{
    displayStyle: DisplayStyle;
}

export class GameLobbyComponent extends React.Component<GameLobbyComponentProps, GameLobbyComponentState> 
{
    constructor(props: GameLobbyComponentProps) 
    {
        super(props);
        this.state = 
        {
            gameLobbyMessage: "",
            listItems: [
                {displayName:"4", itemValue:"4"}, 
                {displayName:"5", itemValue:"5"},
                {displayName:"6", itemValue:"6"},
                {displayName:"7", itemValue:"7"},
                {displayName:"8", itemValue:"8"}
            ]
        }
    }

    render() 
    {
        let currentGameLobbyComponent: JSX.Element;
        let flipAnimation: CardRotationAnimation;
        if(isNullOrUndefined(this.props.currentGameLobby)) 
        {
            flipAnimation = this.props.gameLobbyComponentStyle.createGameLobbyFlipAnimation;
            currentGameLobbyComponent = null;
        }
        else 
        {
            currentGameLobbyComponent = this.getCurrentGameLobbyComponent();
            flipAnimation = this.props.gameLobbyComponentStyle.currentGameLobbyFlipAnimation;
        }
        return (
			<CardComponent
                front={this.getCreateGameLobbyComponent()}
                back={currentGameLobbyComponent}
				cardStyle={this.props.gameLobbyComponentStyle.cardComponentStyle}
				rotationAnimation={flipAnimation}>
			</CardComponent>
		);
    }

    getCurrentGameLobbyComponent = () => 
    {
        let gameLobbyMessages = this.props.currentGameLobbyMessages.map((value: GetChatMessage) => {
            return (
                <GameLobbyMessageItem>
                    <GameLobbyMessagePlayerItem>
                        {value.user.username}:
                    </GameLobbyMessagePlayerItem>
                    <GameLobbyMessageMessageItem>
                        {value.message}
                    </GameLobbyMessageMessageItem>
                </GameLobbyMessageItem>
            );
        });

        let gameLobbyPlayers = this.props.currentGameLobby.players.map((value: GetUser) => {
            return (
                <GameLobbyPlayerItem>
                    {value.username}
                </GameLobbyPlayerItem>
            );
        });

        return (
            <CurrentGameLobbyElement>
                <GameLobbyContentPanel
                    displayStyle={this.props.gameLobbyComponentStyle.gameLobbyContentPanelStyle.displayStyle}>
                    <GameLobbyMessagesPanel
                        displayStyle={this.props.gameLobbyComponentStyle.gameLobbyMessagesPanelStyle.displayStyle}>
                        {gameLobbyMessages}
                    </GameLobbyMessagesPanel>
                    <GameLobbyPlayersPanel
                        displayStyle={this.props.gameLobbyComponentStyle.gameLobbyPlayersPanelStyle.displayStyle}>
                        {gameLobbyPlayers}
                    </GameLobbyPlayersPanel>
                </GameLobbyContentPanel>
                <ButtonedInputComponent
                    inputValue={this.state.gameLobbyMessage}
                    componentStyle={this.props.gameLobbyComponentStyle.gameLobbyMessageButtonedInputStyle}
                    inputOnChangeHandler={this.messageInputOnChangeHandler}
                    buttonClickHandler={this.sendMessageButtonClickHandler}>                    
                </ButtonedInputComponent>
                <ButtonsPanel>
                    <ButtonComponent
						buttonText="Start"
						buttonClickHandler={this.props.startGameButtonClickHandler}
						buttonComponentStyle={this.props.gameLobbyComponentStyle.startGameButtonStyle} />
					<ButtonComponent
						buttonText="Leave"
						buttonClickHandler={this.props.leaveGameButtonClickHandler}
						buttonComponentStyle={this.props.gameLobbyComponentStyle.leaveGameButtonStyle} />	
				</ButtonsPanel>
            </CurrentGameLobbyElement>
        );
    }

    getCreateGameLobbyComponent = () => 
    {
        return (
            <CreateGameLobbyElement>
                <LabelledInputComponent
					inputValue={this.props.createGameLobby.gameLobbyName}
					labelValue={"Game Lobby Name"}
					inputOnChangeHandler={this.gameLobbyNameInputOnChangeHandler}
					componentStyle={this.props.gameLobbyComponentStyle.gameLobbyNameLabelledInputStyle} />
                <ButtonComponent
                    buttonText={"Create Game"}
                    buttonComponentStyle={this.props.gameLobbyComponentStyle.createGameButtonStyle}
                    buttonClickHandler={this.createGameButtonClickHandler}/>
            </CreateGameLobbyElement>
        );
    }

    createGameButtonClickHandler = () => 
    {
        this.props.createGameButtonClickHandler();
    }
    
    messageInputOnChangeHandler = (value: string) => 
    {
        this.setState({gameLobbyMessage: value});
    }

    sendMessageButtonClickHandler = () => 
    {
        if(isNullOrUndefined(this.state.gameLobbyMessage) || this.state.gameLobbyMessage === "") 
        {
            return;
        }

        this.props.sendMessageButtonHandler(this.state.gameLobbyMessage);
        this.setState({gameLobbyMessage: ""});
    }

    gameLobbyNameInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
	{
		this.props.gameLobbyNameInputOnChangeHandler(event.target.value);
    }
}