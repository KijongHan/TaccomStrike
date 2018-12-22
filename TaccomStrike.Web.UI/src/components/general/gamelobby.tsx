import * as React from "react";
import { ButtonComponent, ButtonComponentStyle } from "./button";
import styled from "styled-components";
import { CardComponent, CardComponentStyle, CardOrientation, CardTiltAnimation, CardFlipAnimation } from "./card";
import { GetGameLobby } from "../../models/rest/getgamelobby";
import { CreateGameLobby } from "../../models/rest/creategamelobby";
import { LabelledInputComponent, LabelledInputComponentStyle } from "./labelledinput";

const GameLobby = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.88);
    overflow: auto;
`;

export class GameLobbyComponentProps 
{
    gameLobbyComponentStyle: GameLobbyComponentStyle;
    currentGameLobby: GetGameLobby;
    createGameLobby: CreateGameLobby;

    gameLobbyNameInputOnChangeHandler: (input: string) => void;
    createGameButtonClickHandler: () => void;
}

export class GameLobbyComponentState 
{
    gameLobbyComponentStyle: GameLobbyComponentStyle;
    currentGameLobby: GetGameLobby;
    createGameLobby: CreateGameLobby;
}

export class GameLobbyComponentStyle 
{
    cardComponentStyle: CardComponentStyle;

    gameLobbyNameLabelledInputStyle: LabelledInputComponentStyle;
    createGameButtonStyle: ButtonComponentStyle;
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
            gameLobbyComponentStyle: props.gameLobbyComponentStyle
        }
    }

    render() 
    {
        console.log(this.state.createGameLobby);
        let gameLobbyComponent = (
            <GameLobby>
                <LabelledInputComponent
					inputValue={this.state.createGameLobby.gameLobbyName}
					labelValue={"Game Lobby Name"}
					inputOnChangeHandler={this.gameLobbyNameInputOnChangeHandler}
					componentStyle={this.state.gameLobbyComponentStyle.gameLobbyNameLabelledInputStyle} />
                <ButtonComponent
                    buttonText={"Create Game"}
                    buttonComponentStyle={this.state.gameLobbyComponentStyle.createGameButtonStyle}
                    buttonClickHandler={this.createGameButtonClickHandler}/>
            </GameLobby>
        );
        return (
			<CardComponent
				panel={gameLobbyComponent}
				changeTriggers={[this.state.gameLobbyComponentStyle, this.state.createGameLobby, this.state.currentGameLobby]}
				cardStyle={this.state.gameLobbyComponentStyle.cardComponentStyle}
				cardOrientation={CardOrientation.Front}
				flipAnimation={null}
				tiltAnimation={null}>
			</CardComponent>
		);
    }

    createGameButtonClickHandler = () => 
    {
        this.props.createGameButtonClickHandler();
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
	}
}