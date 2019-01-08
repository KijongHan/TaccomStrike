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
                    widthPercentage: 48,
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

            lobbyListItemsPanelStyle: {
                displayStyle: new DisplayStyle({
                    heightPixels: 400,
                    paddingBottomPixels: 2
                })
            }
        }
        style.gameLobbyComponentStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    floatLeft: true,
                    widthPercentage: 48,
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

            maxLobbyLimitLabelledListStyle: {
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
            },

            gameLobbyContentPanelStyle: {
                displayStyle: new DisplayStyle({
                    heightPixels: 300,
                    widthPercentage: 100
                })
            },

            gameLobbyPlayersPanelStyle: {
                displayStyle: new DisplayStyle({
                    heightPixels: 298,
                    widthPercentage: 49,
                    floatLeft: true
                })
            },

            gameLobbyMessagesPanelStyle: {
                displayStyle: new DisplayStyle({
                    heightPixels: 298,
                    widthPercentage: 49,
                    floatLeft: true
                })
            },

            gameLobbyMessageButtonedInputStyle: {
                buttonedInputComponentPanelStyle: {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 100,
                        marginTopPixels: 35,
                        heightPixels: 40
                    })
                },

                buttonComponentStyle: {
                    displayStyle: new DisplayStyle({
                        floatLeft: true,
                        widthPercentage: 25,
                        heightPixels: 40
                    })
                },

                inputComponentStyle: {
                    displayStyle: new DisplayStyle({
                        floatLeft: true,
                        widthPercentage: 75,
                        heightPixels: 40
                    })
                }
            },

            startGameButtonStyle: {
                displayStyle: new DisplayStyle({
                    floatLeft: true,
                    widthPercentage: 30,
                    heightPixels: 50
                })
            },

            leaveGameButtonStyle: {
                displayStyle: new DisplayStyle({
                    floatLeft: true,
                    widthPercentage: 30,
                    heightPixels: 50
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