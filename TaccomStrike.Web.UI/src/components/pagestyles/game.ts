import { BasePageStyle } from "./base";
import { GameLobbyComponentStyle } from "../general/gamelobby";
import { DisplayStyle, Display, Position } from "../../styles/displaystyle";
import { PerspectiveStyle } from "../../styles/perspectivestyle";
import { GameActionComponentStyle } from "../game/gameaction";
import { GameBoardComponentStyle } from "../game/gameboard";

export class GamePageStyle extends BasePageStyle 
{
    gameLobbyComponentStyle: GameLobbyComponentStyle;
    gameActionComponentStyle: GameActionComponentStyle;
    gameHandPanelStyle: DisplayStyle;

    gameBoardComponentStyle: GameBoardComponentStyle;

    large = () => 
    {
        let style = new GamePageStyle();
        style.gameHandPanelStyle = new DisplayStyle();
        style.gameHandPanelStyle.heightPercentage = 25;

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
        
        style.gameActionComponentStyle.actionHistoryStyle.widthPercentage = 98;
        style.gameActionComponentStyle.actionHistoryStyle.heightPercentage = 60;
        style.gameActionComponentStyle.actionOptionsStyle.widthPercentage = 98;
        style.gameActionComponentStyle.actionOptionsStyle.heightPercentage = 30;
        style.gameActionComponentStyle.actionOptionsStyle.marginTopPercentage = 8;

        style.gameBoardComponentStyle = new GameBoardComponentStyle();
        style.gameBoardComponentStyle.boardStyle.marginString = 'auto';
        style.gameBoardComponentStyle.boardStyle.topPercentage = 15;
        style.gameBoardComponentStyle.boardStyle.widthPercentage = 40;
        style.gameBoardComponentStyle.boardStyle.heightPercentage = 70;
        style.gameBoardComponentStyle.seatStyle.widthPercentage = 32;
        style.gameBoardComponentStyle.seatStyle.heightPercentage = 32;
        style.gameBoardComponentStyle.claimPanelStyle.topPercentage = 30;
        style.gameBoardComponentStyle.claimPanelStyle.widthPercentage = 30;
        style.gameBoardComponentStyle.claimPanelStyle.heightPercentage = 40;

        return style;
    }

    medium = () => 
    {
        let style = new GamePageStyle();
        style.gameHandPanelStyle = new DisplayStyle();
        style.gameHandPanelStyle.heightPercentage = 25;

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
        
        style.gameActionComponentStyle.actionHistoryStyle.widthPercentage = 98;
        style.gameActionComponentStyle.actionHistoryStyle.heightPercentage = 60;
        style.gameActionComponentStyle.actionOptionsStyle.widthPercentage = 98;
        style.gameActionComponentStyle.actionOptionsStyle.heightPercentage = 30;
        style.gameActionComponentStyle.actionOptionsStyle.marginTopPercentage = 8;

        style.gameBoardComponentStyle = new GameBoardComponentStyle();
        style.gameBoardComponentStyle.boardStyle.marginString = 'auto';
        style.gameBoardComponentStyle.boardStyle.topPercentage = 15;
        style.gameBoardComponentStyle.boardStyle.widthPercentage = 40;
        style.gameBoardComponentStyle.boardStyle.heightPercentage = 70;
        style.gameBoardComponentStyle.seatStyle.widthPercentage = 32;
        style.gameBoardComponentStyle.seatStyle.heightPercentage = 32;
        style.gameBoardComponentStyle.claimPanelStyle.topPercentage = 30;
        style.gameBoardComponentStyle.claimPanelStyle.widthPercentage = 30;
        style.gameBoardComponentStyle.claimPanelStyle.heightPercentage = 40;

        return style;
    }

    small = () => 
    {
        let style = new GamePageStyle();
        style.gameLobbyComponentStyle = null;

        style.gameHandPanelStyle = new DisplayStyle();
        style.gameHandPanelStyle.heightPercentage = 30;

        style.gameActionComponentStyle = new GameActionComponentStyle();
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.position = Position.absolute;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.heightPercentage = 65;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.widthPercentage = 50;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.topPercentage = 10;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.rightPixels = 0;
        
        style.gameActionComponentStyle.actionHistoryStyle.widthPercentage = 49;
        style.gameActionComponentStyle.actionHistoryStyle.heightPercentage = 98;
        style.gameActionComponentStyle.actionHistoryStyle.floatLeft = true;
        style.gameActionComponentStyle.actionOptionsStyle.widthPercentage = 49;
        style.gameActionComponentStyle.actionOptionsStyle.heightPercentage = 98;
        style.gameActionComponentStyle.actionOptionsStyle.floatLeft = true;

        style.gameBoardComponentStyle = new GameBoardComponentStyle();
        style.gameBoardComponentStyle.boardStyle.marginString = '0';
        style.gameBoardComponentStyle.boardStyle.topPercentage = 15;
        style.gameBoardComponentStyle.boardStyle.widthPercentage = 45;
        style.gameBoardComponentStyle.boardStyle.heightPercentage = 65;
        style.gameBoardComponentStyle.seatStyle.widthPercentage = 32;
        style.gameBoardComponentStyle.seatStyle.heightPercentage = 32;
        style.gameBoardComponentStyle.claimPanelStyle.topPercentage = 30;
        style.gameBoardComponentStyle.claimPanelStyle.widthPercentage = 30;
        style.gameBoardComponentStyle.claimPanelStyle.heightPercentage = 40;

        return style;
    }

    verysmall = () => 
    {
        let style = new GamePageStyle();
        style.gameLobbyComponentStyle = null;

        style.gameHandPanelStyle = new DisplayStyle();
        style.gameHandPanelStyle.heightPercentage = 25;

        style.gameActionComponentStyle = new GameActionComponentStyle();
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.position = Position.absolute;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.heightPercentage = 30;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.widthPercentage = 100;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.bottomPercentage = -5;
        
        style.gameActionComponentStyle.actionHistoryStyle.widthPercentage = 49;
        style.gameActionComponentStyle.actionHistoryStyle.heightPercentage = 98;
        style.gameActionComponentStyle.actionHistoryStyle.floatLeft = true;
        style.gameActionComponentStyle.actionOptionsStyle.widthPercentage = 49;
        style.gameActionComponentStyle.actionOptionsStyle.heightPercentage = 98;
        style.gameActionComponentStyle.actionOptionsStyle.floatLeft = true;

        style.gameBoardComponentStyle = new GameBoardComponentStyle();
        style.gameBoardComponentStyle.boardStyle.marginString = 'auto';
        style.gameBoardComponentStyle.boardStyle.topPercentage = 5;
        style.gameBoardComponentStyle.boardStyle.widthPercentage = 80;
        style.gameBoardComponentStyle.boardStyle.heightPercentage = 50;
        style.gameBoardComponentStyle.seatStyle.widthPercentage = 32;
        style.gameBoardComponentStyle.seatStyle.heightPercentage = 32;
        style.gameBoardComponentStyle.claimPanelStyle.topPercentage = 30;
        style.gameBoardComponentStyle.claimPanelStyle.widthPercentage = 35;
        style.gameBoardComponentStyle.claimPanelStyle.heightPercentage = 42;

        return style;
    }

    portrait = ():GamePageStyle => 
    {
        let style = new GamePageStyle();
        style.gameLobbyComponentStyle = null;

        style.gameHandPanelStyle = new DisplayStyle();
        style.gameHandPanelStyle.heightPercentage = 25;

        style.gameActionComponentStyle = new GameActionComponentStyle();
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.position = Position.absolute;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.heightPercentage = 30;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.widthPercentage = 100;
        style.gameActionComponentStyle.cardComponentStyle.displayStyle.bottomPercentage = -5;
        
        style.gameActionComponentStyle.actionHistoryStyle.widthPercentage = 49;
        style.gameActionComponentStyle.actionHistoryStyle.heightPercentage = 98;
        style.gameActionComponentStyle.actionHistoryStyle.floatLeft = true;
        style.gameActionComponentStyle.actionOptionsStyle.widthPercentage = 49;
        style.gameActionComponentStyle.actionOptionsStyle.heightPercentage = 98;
        style.gameActionComponentStyle.actionOptionsStyle.floatLeft = true;

        style.gameBoardComponentStyle = new GameBoardComponentStyle();
        style.gameBoardComponentStyle.boardStyle.marginString = 'auto';
        style.gameBoardComponentStyle.boardStyle.topPercentage = 5;
        style.gameBoardComponentStyle.boardStyle.widthPercentage = 80;
        style.gameBoardComponentStyle.boardStyle.heightPercentage = 50;
        style.gameBoardComponentStyle.seatStyle.widthPercentage = 32;
        style.gameBoardComponentStyle.seatStyle.heightPercentage = 32;
        style.gameBoardComponentStyle.claimPanelStyle.topPercentage = 30;
        style.gameBoardComponentStyle.claimPanelStyle.widthPercentage = 35;
        style.gameBoardComponentStyle.claimPanelStyle.heightPercentage = 42;

        return style;
    }

    landscape = ():GamePageStyle => 
    {
        return null;
    }
}