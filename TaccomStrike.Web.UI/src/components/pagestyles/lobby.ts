import { BasePageStyle } from "./base";
import { TitlePanelsStyle } from "../general/titlepanels";
import { TitlePanelStyle } from "../general/titlepanel";
import { DisplayStyle, Position } from "../../styles/displaystyle";
import { GameLobbiesComponentStyle } from "../general/gamelobbies";
import { GameLobbyComponentStyle } from "../general/gamelobby";

export class LobbyPageStyle extends BasePageStyle 
{
    titlePanelsStyle: TitlePanelsStyle;
	gameTitlePanelStyle: TitlePanelStyle;
	lobbiesTitlePanelStyle: TitlePanelStyle;

    gameLobbiesComponentStyle: GameLobbiesComponentStyle;
    gameLobbyComponentStyle: GameLobbyComponentStyle;

    large = () => 
    {
        let style = new LobbyPageStyle();
        style.titlePanelsStyle = {
            displayStyling: new DisplayStyle({ heightPixels: 150 })
        };
        style.gameTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 40,
                heightPixels: 150,
                marginLeftPercentage: 1,
                floatLeft: true
            })
        }
        style.lobbiesTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 55,
                heightPixels: 150,
                marginLeftPercentage: 3,
                floatLeft: true
            })
        };

        style.gameLobbiesComponentStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    floatLeft: true,
                    widthPercentage: 55,
                    heightPixels: 450,
                    marginLeftPercentage: 1
                })
            },

            refreshButtonComponentStyle: {
                displayStyle: new DisplayStyle({
                    floatLeft: true,
                    heightPixels: 50,
                    widthPercentage: 20
                })
            },

            searchButtonComponentStyle: {
                displayStyle: new DisplayStyle({
                    floatLeft: true,
                    widthPercentage: 20,
                    heightPixels: 50
                })
            }
        }
        style.gameLobbyComponentStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    floatLeft: true,
                    widthPercentage: 42,
                    heightPixels: 450,
                    marginLeftPercentage: 1
                })
            },

            gameLobbyNameLabelledInputStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 90,
                    marginLeftPercentage: 5,
                    marginTopPixels: 20
                })
            },

            createGameButtonStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 30,
                    heightPixels: 50,
                    marginLeftPercentage: 5,
                    position: Position.absolute,
                    bottomPixels: 10
                })
            }
        }
        return style;
    }

    medium = () => 
    {
        let style = new LobbyPageStyle();
        style.titlePanelsStyle = {
            displayStyling: new DisplayStyle({ heightPixels: 170 })
        };
        style.gameTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 40,
                heightPixels: 170,
                marginLeftPercentage: 1,
                floatLeft: true
            })
        }
        style.lobbiesTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 55,
                heightPixels: 170,
                marginLeftPercentage: 3,
                floatLeft: true
            })
        };
        return style;
    }

    small = () => 
    {
        let style = new LobbyPageStyle();
        return style;
    }

    verysmall = () => 
    {
        let style = new LobbyPageStyle();
        return style;
    }
}