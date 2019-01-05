import * as React from "react";
import { ButtonComponent, ButtonComponentStyle } from "./button";
import styled from "styled-components";
import { CardComponent, CardComponentStyle, CardOrientation, CardTiltAnimation, CardFlipAnimation } from "./card";
import { GetGameLobby } from "../../models/rest/getgamelobby";
import { CreateGameLobby } from "../../models/rest/creategamelobby";
import { LabelledInputComponent, LabelledInputComponentStyle } from "./labelledinput";
import { LabelledListComponent, LabelledListComponentStyle, ListItem } from "./labelledlist";
import { isNullOrUndefined } from "util";
import { ButtonedInputComponentStyle, ButtonedInputComponent } from "./buttonedinput";
import { DisplayStyle } from "../../styles/displaystyle";
import { GetChatMessage } from "../../models/rest/getchatmessage";
import { GetUser } from "../../models/rest/getuser";

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
    background-color: rgba(0, 0, 0, 0.88);
    overflow: auto;
`;

const CurrentGameLobbyElement = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.88);
    padding: 5px 5px 5px 5px;
    overflow: auto;
`;

const GameLobbyContentPanel = styled.div`
    overflow: auto;
    display: inline-block;
    height: ${(p : GameLobbyContentPanelStyle) => p.displayStyle.getHeightString()};
    width: ${(p : GameLobbyContentPanelStyle) => p.displayStyle.getWidthString()};
`;

const GameLobbyPlayersPanel = styled.div`
    background-color: rgba(255, 255, 255, 0.7);
    float: ${(p : GameLobbyMessagesPanelStyle) => p.displayStyle.getFloatString()};
    height: ${(p : GameLobbyPlayersPanelStyle) => p.displayStyle.getHeightString()};
    width: ${(p : GameLobbyPlayersPanelStyle) => p.displayStyle.getWidthString()};
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.88);
`;

const GameLobbyMessagesPanel = styled.div`
    background-color: rgba(255, 255, 255, 0.7);
    float: ${(p : GameLobbyMessagesPanelStyle) => p.displayStyle.getFloatString()};
    height: ${(p : GameLobbyMessagesPanelStyle) => p.displayStyle.getHeightString()};
    width: ${(p : GameLobbyMessagesPanelStyle) => p.displayStyle.getWidthString()};
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.88);
`;

export class GameLobbyComponentProps 
{
    gameLobbyComponentStyle: GameLobbyComponentStyle;
    currentGameLobby: GetGameLobby;
    currentGameLobbyMessages: GetChatMessage[];
    createGameLobby: CreateGameLobby;

    gameLobbyNameInputOnChangeHandler: (input: string) => void;
    maxLobbyLimitListOnChangeHandler: (value: string) => void;
    startGameButtonClickHandler: () => void;
    createGameButtonClickHandler: () => void;
    sendMessageButtonHandler: (message: string) => void;
}

export class GameLobbyComponentState 
{
    gameLobbyComponentStyle: GameLobbyComponentStyle;
    currentGameLobby: GetGameLobby;
    createGameLobby: CreateGameLobby;

    listItems: ListItem[];
    gameLobbyMessage: string;
    currentGameLobbyMessages: GetChatMessage[];
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
            createGameLobby: props.createGameLobby,
            currentGameLobby: props.currentGameLobby,
            gameLobbyComponentStyle: props.gameLobbyComponentStyle,
            gameLobbyMessage: "",
            currentGameLobbyMessages: props.currentGameLobbyMessages,
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
        let gameLobbyComponent: JSX.Element;
        if(isNullOrUndefined(this.state.currentGameLobby)) 
        {
            gameLobbyComponent = this.getCreateGameLobbyComponent();
        }
        else 
        {
            gameLobbyComponent = this.getCurrentGameLobbyComponent();
        }
        return (
			<CardComponent
				panel={gameLobbyComponent}
				changeTriggers={[
                    this.state.gameLobbyComponentStyle, 
                    this.state.createGameLobby, 
                    this.state.currentGameLobby, 
                    this.state.gameLobbyMessage,
                    this.state.currentGameLobbyMessages
                ]}
				cardStyle={this.state.gameLobbyComponentStyle.cardComponentStyle}
				cardOrientation={CardOrientation.Front}
				flipAnimation={null}
				tiltAnimation={null}>
			</CardComponent>
		);
    }

    getCurrentGameLobbyComponent = () => 
    {
        let gameLobbyMessages = this.state.currentGameLobbyMessages.map((value: GetChatMessage) => {
            return (
                <div>
                    {value.message}
                </div>);
        });

        let gameLobbyPlayers = this.state.currentGameLobby.players.map((value: GetUser) => {
            return (
                <div>
                    {value.username}
                </div>
            );
        });

        return (
            <CurrentGameLobbyElement>
                <GameLobbyContentPanel
                    displayStyle={this.state.gameLobbyComponentStyle.gameLobbyContentPanelStyle.displayStyle}>
                    <GameLobbyMessagesPanel
                        displayStyle={this.state.gameLobbyComponentStyle.gameLobbyMessagesPanelStyle.displayStyle}>
                        {gameLobbyMessages}
                    </GameLobbyMessagesPanel>
                    <GameLobbyPlayersPanel
                        displayStyle={this.state.gameLobbyComponentStyle.gameLobbyPlayersPanelStyle.displayStyle}>
                        {gameLobbyPlayers}
                    </GameLobbyPlayersPanel>
                </GameLobbyContentPanel>
                <ButtonedInputComponent
                    inputValue={this.state.gameLobbyMessage}
                    componentStyle={this.state.gameLobbyComponentStyle.gameLobbyMessageButtonedInputStyle}
                    inputOnChangeHandler={this.messageInputOnChangeHandler}
                    buttonClickHandler={this.sendMessageButtonClickHandler}>                    
                </ButtonedInputComponent>
                <ButtonsPanel>
                    <ButtonComponent
						buttonText="Start"
						buttonClickHandler={this.startGameButtonClickHandler}
						buttonComponentStyle={this.state.gameLobbyComponentStyle.startGameButtonStyle} />
					<ButtonComponent
						buttonText="Leave"
						buttonClickHandler={this.leaveGameButtonClickHandler}
						buttonComponentStyle={this.state.gameLobbyComponentStyle.leaveGameButtonStyle} />	
				</ButtonsPanel>
            </CurrentGameLobbyElement>
        );
    }

    getCreateGameLobbyComponent = () => 
    {
        return (
            <CreateGameLobbyElement>
                <LabelledInputComponent
					inputValue={this.state.createGameLobby.gameLobbyName}
					labelValue={"Game Lobby Name"}
					inputOnChangeHandler={this.gameLobbyNameInputOnChangeHandler}
					componentStyle={this.state.gameLobbyComponentStyle.gameLobbyNameLabelledInputStyle} />
                <LabelledListComponent
                    listItems={this.state.listItems}
                    labelValue={"Max Lobby Limit"}
                    componentStyle={this.state.gameLobbyComponentStyle.maxLobbyLimitLabelledListStyle}
                    listOnChangeHandler={this.maxLobbyLimitListOnChangeHandler}/>
                <ButtonComponent
                    buttonText={"Create Game"}
                    buttonComponentStyle={this.state.gameLobbyComponentStyle.createGameButtonStyle}
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

    startGameButtonClickHandler = () => 
    {
        this.props.startGameButtonClickHandler();
    }

    leaveGameButtonClickHandler = () => 
    {

    }

    maxLobbyLimitListOnChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => 
	{
		this.props.maxLobbyLimitListOnChangeHandler(event.target.value);
	}

    gameLobbyNameInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
	{
		this.props.gameLobbyNameInputOnChangeHandler(event.target.value);
    }
    
    componentDidUpdate(prevProps: GameLobbyComponentProps, prevState: GameLobbyComponentState)
	{
		if (this.props.gameLobbyComponentStyle !== prevProps.gameLobbyComponentStyle)
		{
			this.setState({ gameLobbyComponentStyle: this.props.gameLobbyComponentStyle });
		}
		if(this.props.createGameLobby !== prevProps.createGameLobby) 
		{
			this.setState({ createGameLobby: this.props.createGameLobby });
        }
        if(this.props.currentGameLobby !== prevProps.currentGameLobby) 
		{
			this.setState({ currentGameLobby: this.props.currentGameLobby });
        }
        if(this.props.currentGameLobbyMessages !== prevProps.currentGameLobbyMessages) 
        {
            this.setState({currentGameLobbyMessages: this.props.currentGameLobbyMessages});
        }
	}
}