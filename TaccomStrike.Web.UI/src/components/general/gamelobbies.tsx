import * as React from "react";
import { CardComponent, CardComponentStyle, CardOrientation, CardTiltAnimation, CardFlipAnimation } from "./card";
import { ButtonComponent, ButtonComponentStyle } from "./button";
import styled from "styled-components";
import { GetGameLobby } from "../../models/rest/getgamelobby";

const GameLobbies = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.88);
`;

const ButtonsPanel = styled.div`
	overflow: auto;
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

    refreshButtonComponentStyle: ButtonComponentStyle;
    searchButtonComponentStyle: ButtonComponentStyle;
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
}