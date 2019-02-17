import { BasePageStyle } from "./base";
import { GameLobbyComponentStyle } from "../general/gamelobby";
import { DisplayStyle, Display, Position } from "../../styles/displaystyle";
import { PerspectiveStyle } from "../../styles/perspectivestyle";
import { GameActionComponentStyle } from "../game/gameaction";
import { GameBoardSeatComponentStyle, GameBoardComponentStyle } from "../game/gameboard";

export class GamePageStyle extends BasePageStyle 
{
    gameLobbyComponentStyle: GameLobbyComponentStyle;
    gameActionComponentStyle: GameActionComponentStyle;

    gameBoardComponentStyle: GameBoardComponentStyle;
    gameBoardSeatComponentStyle: GameBoardSeatComponentStyle;

    large = () => 
    {
        let style = new GamePageStyle();
        style.gameLobbyComponentStyle = new GameLobbyComponentStyle();
        style.gameLobbyComponentStyle.cardComponentStyle = {
            displayStyle: new DisplayStyle({
                position: Position.absolute,
                widthPercentage: 25,
                heightPercentage: 70,
                topPixels: 0,
                leftPixels: 0
            }),
            perspectiveStyle: new PerspectiveStyle()
        };
        style.gameLobbyComponentStyle.gameLobbyNameLabelledInputStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };
        style.gameLobbyComponentStyle.maxLobbyLimitLabelledListStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };
        style.gameLobbyComponentStyle.createGameButtonStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };
        style.gameLobbyComponentStyle.gameLobbyContentPanelStyle = {
            displayStyle: new DisplayStyle({
                heightPercentage: 70,
                widthPercentage: 100
            })
        };
        style.gameLobbyComponentStyle.gameLobbyPlayersPanelStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };
        style.gameLobbyComponentStyle.gameLobbyMessagesPanelStyle = {
            displayStyle: new DisplayStyle({
                heightPercentage: 98,
                widthPercentage: 99
            })
        };
        style.gameLobbyComponentStyle.gameLobbyMessageButtonedInputStyle = {
            buttonedInputComponentPanelStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 99,
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
        };
        style.gameLobbyComponentStyle.startGameButtonStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };
        style.gameLobbyComponentStyle.leaveGameButtonStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };

        style.gameLobbyComponentStyle.createGameLobbyFlipAnimation = {
            rotationFrom: 180,
            rotationTo: 359.9,
            rotationDirection: 1,
            rotationDelay: 0,
            rotationDuration: 1000
        };

        style.gameLobbyComponentStyle.currentGameLobbyFlipAnimation ={
            rotationFrom: 180,
            rotationTo: 180,
            rotationDirection: 1,
            rotationDelay: 0,
            rotationDuration: 1000
        };

        style.gameActionComponentStyle = new GameActionComponentStyle();
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.position = Position.absolute;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.heightPercentage = 100;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.widthPercentage = 25;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.topPixels = 0;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.rightPixels = 0;

        style.gameBoardComponentStyle = new GameBoardComponentStyle();
        style.gameBoardComponentStyle.displayStyle.widthPercentage = 12;
        style.gameBoardComponentStyle.displayStyle.heightPercentage = 30;
        style.gameBoardSeatComponentStyle = new GameBoardSeatComponentStyle();
        style.gameBoardSeatComponentStyle.displayStyle.widthPercentage = 90;
        style.gameBoardSeatComponentStyle.displayStyle.heightPercentage = 75;

        return style;
    }

    medium = () => 
    {
        let style = new GamePageStyle();
        style.gameLobbyComponentStyle = new GameLobbyComponentStyle();
        style.gameLobbyComponentStyle.cardComponentStyle = {
            displayStyle: new DisplayStyle({
                position: Position.absolute,
                widthPercentage: 25,
                heightPercentage: 70,
                topPixels: 0,
                leftPixels: 0
            }),
            perspectiveStyle: new PerspectiveStyle()
        };
        style.gameLobbyComponentStyle.gameLobbyNameLabelledInputStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };
        style.gameLobbyComponentStyle.maxLobbyLimitLabelledListStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };
        style.gameLobbyComponentStyle.createGameButtonStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };
        style.gameLobbyComponentStyle.gameLobbyContentPanelStyle = {
            displayStyle: new DisplayStyle({
                heightPercentage: 70,
                widthPercentage: 100
            })
        };
        style.gameLobbyComponentStyle.gameLobbyPlayersPanelStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };
        style.gameLobbyComponentStyle.gameLobbyMessagesPanelStyle = {
            displayStyle: new DisplayStyle({
                heightPercentage: 98,
                widthPercentage: 99
            })
        };
        style.gameLobbyComponentStyle.gameLobbyMessageButtonedInputStyle = {
            buttonedInputComponentPanelStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 99,
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
        };
        style.gameLobbyComponentStyle.startGameButtonStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };
        style.gameLobbyComponentStyle.leaveGameButtonStyle = {
            displayStyle: new DisplayStyle({
                display: Display.none
            })
        };

        style.gameLobbyComponentStyle.createGameLobbyFlipAnimation = {
            rotationFrom: 180,
            rotationTo: 359.9,
            rotationDirection: 1,
            rotationDelay: 0,
            rotationDuration: 1000
        };

        style.gameLobbyComponentStyle.currentGameLobbyFlipAnimation ={
            rotationFrom: 180,
            rotationTo: 180,
            rotationDirection: 1,
            rotationDelay: 0,
            rotationDuration: 1000
        };

        style.gameActionComponentStyle = new GameActionComponentStyle();
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.position = Position.absolute;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.heightPercentage = 100;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.widthPercentage = 25;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.topPixels = 0;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.rightPixels = 0;

        style.gameBoardComponentStyle = new GameBoardComponentStyle();
        style.gameBoardComponentStyle.displayStyle.widthPercentage = 12;
        style.gameBoardComponentStyle.displayStyle.heightPercentage = 30;
        style.gameBoardSeatComponentStyle = new GameBoardSeatComponentStyle();
        style.gameBoardSeatComponentStyle.displayStyle.widthPercentage = 90;
        style.gameBoardSeatComponentStyle.displayStyle.heightPercentage = 75;

        return style;
    }

    small = () => 
    {
        let style = new GamePageStyle();

        style.gameActionComponentStyle = new GameActionComponentStyle();
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.position = Position.relative;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.heightPercentage = 30;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.widthPercentage = 100;
        

        style.gameBoardComponentStyle = new GameBoardComponentStyle();
        style.gameBoardComponentStyle.displayStyle.widthPercentage = 30;
        style.gameBoardComponentStyle.displayStyle.heightPercentage = 30;
        style.gameBoardSeatComponentStyle = new GameBoardSeatComponentStyle();
        style.gameBoardSeatComponentStyle.displayStyle.widthPercentage = 90;
        style.gameBoardSeatComponentStyle.displayStyle.heightPercentage = 75;

        return style;
    }

    verysmall = () => 
    {
        let style = new GamePageStyle();
        return style;;
    }
}