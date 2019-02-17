import { BasePageStyle } from "./base";
import { TitlePanelsStyle } from "../general/titlepanels";
import { TitlePanelStyle } from "../general/titlepanel";
import { DisplayStyle, Position, Display } from "../../styles/displaystyle";
import { GameLobbiesComponentStyle } from "../general/gamelobbies";
import { GameLobbyComponentStyle } from "../general/gamelobby";
import { NavbarComponentStyle, NavbarItemStyle } from "../general/navbar";
import { CardComponentStyle, CardRotationAnimation } from "../general/card";
import { PerspectiveStyle } from "../../styles/perspectivestyle";

export class LobbyPageStyle extends BasePageStyle 
{
    titlePanelsStyle: TitlePanelsStyle;
	gameTitlePanelStyle: TitlePanelStyle;
    lobbiesTitlePanelStyle: TitlePanelStyle;
    
    navbarComponentStyle: NavbarComponentStyle;
    playNavbarItemStyle: NavbarItemStyle;
    communityNavbarItemStyle: NavbarItemStyle;
    newsNavbarItemStyle: NavbarItemStyle;

    gameLobbiesComponentStyle: GameLobbiesComponentStyle;
    gameLobbyComponentStyle: GameLobbyComponentStyle;

    large = () => 
    {
        let style = new LobbyPageStyle();
        style.titlePanelsStyle = {
            displayStyling: new DisplayStyle({ 
                heightPixels: 150,
                marginTopPixels: 72
            })
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
                    position: Position.relative,
                    floatLeft: true,
                    widthPercentage: 48,
                    heightPixels: 450,
                    marginLeftPercentage: 1
                }),
                perspectiveStyle: new PerspectiveStyle()
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
                    heightPixels: 390,
                    paddingBottomPixels: 2
                })
            }
        }
        
        style.navbarComponentStyle = {
            displayStyle: new DisplayStyle({
                position: Position.fixed,
                topPixels: 0,
                widthPercentage: 100,
                paddingLeftPixels: 10,
                paddingTopPixels: 17
            })
        };
        style.playNavbarItemStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    heightPixels: 55,
                    widthPercentage: 12
                }),
                perspectiveStyle: new PerspectiveStyle({
                    perspective: 400
                })
            },
            cardRotationAnimation: {
                rotationFrom: 0,
                rotationTo: 20,
                rotationDirection: 1,
                rotationDelay: 1000,
                rotationDuration: 500
            },
            cardHoverAnimation: new CardRotationAnimation({
                rotationFrom: 20,
                rotationTo: 0,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            }),
            isSelected: true,
            showIcon: true,
            showText: true
        };
        style.communityNavbarItemStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    heightPixels: 55,
                    widthPercentage: 15
                }),
                perspectiveStyle: new PerspectiveStyle({
                    perspective: 400
                })
            },
            cardRotationAnimation: {
                rotationFrom: 0,
                rotationTo: 20,
                rotationDirection: 1,
                rotationDelay: 1000,
                rotationDuration: 500
            },
            cardHoverAnimation: new CardRotationAnimation({
                rotationFrom: 20,
                rotationTo: 0,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            }),
            isSelected: false,
            showIcon: true,
            showText: true
        };
        style.newsNavbarItemStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    heightPixels: 55,
                    widthPercentage: 12
                }),
                perspectiveStyle: new PerspectiveStyle({
                    perspective: 400
                })
            },
            cardRotationAnimation: {
                rotationFrom: 0,
                rotationTo: 20,
                rotationDirection: 1,
                rotationDelay: 1000,
                rotationDuration: 500
            },
            cardHoverAnimation: new CardRotationAnimation({
                rotationFrom: 20,
                rotationTo: 0,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            }),
            isSelected: false,
            showIcon: true,
            showText: true
        };

        style.gameLobbyComponentStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    position: Position.relative,
                    floatLeft: true,
                    widthPercentage: 48,
                    heightPixels: 450,
                    marginLeftPercentage: 1
                }),
                perspectiveStyle: new PerspectiveStyle({
                    perspective: 5000
                })
            },

            gameLobbyNameLabelledInputStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 70,
                    marginLeftPercentage: 5,
                    marginTopPixels: 20
                })
            },

            maxLobbyLimitLabelledListStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 70,
                    marginLeftPercentage: 5,
                    marginTopPixels: 20
                })
            },

            gameModeLabelledListStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 70,
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
                    widthPercentage: 50,
                    floatLeft: true
                })
            },

            gameLobbyMessageButtonedInputStyle: {
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
            },

            createGameLobbyFlipAnimation: {
                rotationFrom: 180,
                rotationTo: 359.9,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            },

            currentGameLobbyFlipAnimation: {
                rotationFrom: 0,
                rotationTo: 180,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            }
        }
        return style;
    }

    medium = () => 
    {
        let style = new LobbyPageStyle();
        style.titlePanelsStyle = {
            displayStyling: new DisplayStyle({ 
                heightPixels: 310,
                marginTopPixels: 72
            })
        };
        style.gameTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 90,
                heightPixels: 150,
                marginLeftPercentage: 5,
                floatLeft: true
            })
        }
        style.lobbiesTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 90,
                heightPixels: 150,
                marginLeftPercentage: 5,
                floatLeft: true,
                marginTopPixels: 10
            })
        };

        style.gameLobbiesComponentStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    position: Position.relative,
                    floatLeft: true,
                    widthPercentage: 70,
                    heightPixels: 450,
                    marginLeftPercentage: 15
                }),
                perspectiveStyle: new PerspectiveStyle()
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
                    heightPixels: 390,
                    paddingBottomPixels: 2
                })
            }
        }
        
        style.navbarComponentStyle = {
            displayStyle: new DisplayStyle({
                position: Position.fixed,
                topPixels: 0,
                widthPercentage: 100,
                paddingLeftPixels: 10,
                paddingTopPixels: 17
            })
        };
        style.playNavbarItemStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    heightPixels: 55,
                    widthPercentage: 14
                }),
                perspectiveStyle: new PerspectiveStyle({
                    perspective: 400
                })
            },
            cardRotationAnimation: {
                rotationFrom: 0,
                rotationTo: 20,
                rotationDirection: 1,
                rotationDelay: 1000,
                rotationDuration: 500
            },
            cardHoverAnimation: new CardRotationAnimation({
                rotationFrom: 20,
                rotationTo: 0,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            }),
            isSelected: true,
            showIcon: true,
            showText: true
        };
        style.communityNavbarItemStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    heightPixels: 55,
                    widthPercentage: 20
                }),
                perspectiveStyle: new PerspectiveStyle({
                    perspective: 400
                })
            },
            cardRotationAnimation: {
                rotationFrom: 0,
                rotationTo: 20,
                rotationDirection: 1,
                rotationDelay: 1000,
                rotationDuration: 500
            },
            cardHoverAnimation: new CardRotationAnimation({
                rotationFrom: 20,
                rotationTo: 0,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            }),
            isSelected: false,
            showIcon: true,
            showText: true
        };
        style.newsNavbarItemStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    heightPixels: 55,
                    widthPercentage: 14
                }),
                perspectiveStyle: new PerspectiveStyle({
                    perspective: 400
                })
            },
            cardRotationAnimation: {
                rotationFrom: 0,
                rotationTo: 20,
                rotationDirection: 1,
                rotationDelay: 1000,
                rotationDuration: 500
            },
            cardHoverAnimation: new CardRotationAnimation({
                rotationFrom: 20,
                rotationTo: 0,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            }),
            isSelected: false,
            showIcon: true,
            showText: true
        };

        style.gameLobbyComponentStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    position: Position.relative,
                    floatLeft: true,
                    widthPercentage: 70,
                    heightPixels: 450,
                    marginLeftPercentage: 15,
                    marginTopPixels: 20
                }),
                perspectiveStyle: new PerspectiveStyle({
                    perspective: 5000
                })
            },

            gameLobbyNameLabelledInputStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 70,
                    marginLeftPercentage: 5,
                    marginTopPixels: 20
                })
            },

            maxLobbyLimitLabelledListStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 70,
                    marginLeftPercentage: 5,
                    marginTopPixels: 20
                })
            },

            gameModeLabelledListStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 70,
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
                    widthPercentage: 50,
                    floatLeft: true
                })
            },

            gameLobbyMessageButtonedInputStyle: {
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
            },

            createGameLobbyFlipAnimation: {
                rotationFrom: 180,
                rotationTo: 359.9,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            },

            currentGameLobbyFlipAnimation: {
                rotationFrom: 0,
                rotationTo: 180,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            }
        }
        return style;
    }

    small = () => 
    {
        let style = new LobbyPageStyle();
        style.titlePanelsStyle = {
            displayStyling: new DisplayStyle({ 
                heightPixels: 310,
                marginTopPixels: 72
            })
        };
        style.gameTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 90,
                heightPixels: 150,
                marginLeftPercentage: 5,
                floatLeft: true
            })
        }
        style.lobbiesTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 90,
                heightPixels: 150,
                marginLeftPercentage: 5,
                floatLeft: true,
                marginTopPixels: 10
            })
        };

        style.gameLobbiesComponentStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    position: Position.relative,
                    floatLeft: true,
                    widthPercentage: 80,
                    heightPixels: 450,
                    marginLeftPercentage: 10
                }),
                perspectiveStyle: new PerspectiveStyle()
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
                    heightPixels: 390,
                    paddingBottomPixels: 2
                })
            }
        }
        
        style.navbarComponentStyle = {
            displayStyle: new DisplayStyle({
                position: Position.fixed,
                topPixels: 0,
                widthPercentage: 100,
                paddingLeftPixels: 10,
                paddingTopPixels: 17
            })
        };
        style.playNavbarItemStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    heightPixels: 55,
                    widthPercentage: 15
                }),
                perspectiveStyle: new PerspectiveStyle({
                    perspective: 400
                })
            },
            cardRotationAnimation: {
                rotationFrom: 0,
                rotationTo: 20,
                rotationDirection: 1,
                rotationDelay: 1000,
                rotationDuration: 500
            },
            cardHoverAnimation: new CardRotationAnimation({
                rotationFrom: 20,
                rotationTo: 0,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            }),
            isSelected: true,
            showIcon: true,
            showText: false
        };

        let navbarItemStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    heightPixels: 55,
                    widthPercentage: 15
                }),
                perspectiveStyle: new PerspectiveStyle({
                    perspective: 400
                })
            },
            cardRotationAnimation: {
                rotationFrom: 0,
                rotationTo: 20,
                rotationDirection: 1,
                rotationDelay: 1000,
                rotationDuration: 500
            },
            cardHoverAnimation: new CardRotationAnimation({
                rotationFrom: 20,
                rotationTo: 0,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            }),
            isSelected: false,
            showIcon: true,
            showText: false
        };
        style.communityNavbarItemStyle = navbarItemStyle;
        style.newsNavbarItemStyle = navbarItemStyle;

        style.gameLobbyComponentStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    position: Position.relative,
                    floatLeft: true,
                    widthPercentage: 80,
                    heightPixels: 450,
                    marginLeftPercentage: 10,
                    marginTopPixels: 20
                }),
                perspectiveStyle: new PerspectiveStyle({
                    perspective: 5000
                })
            },

            gameLobbyNameLabelledInputStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 70,
                    marginLeftPercentage: 5,
                    marginTopPixels: 20
                })
            },

            maxLobbyLimitLabelledListStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 70,
                    marginLeftPercentage: 5,
                    marginTopPixels: 20
                })
            },

            gameModeLabelledListStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 70,
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
                    widthPercentage: 50,
                    floatLeft: true
                })
            },

            gameLobbyMessageButtonedInputStyle: {
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
            },

            createGameLobbyFlipAnimation: {
                rotationFrom: 180,
                rotationTo: 359.9,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            },

            currentGameLobbyFlipAnimation: {
                rotationFrom: 0,
                rotationTo: 180,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            }
        }
        return style;
    }

    verysmall = () => 
    {
        let style = new LobbyPageStyle();
        style.titlePanelsStyle = {
            displayStyling: new DisplayStyle({ heightPixels: 310 })
        };
        style.gameTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 90,
                heightPixels: 150,
                marginLeftPercentage: 5,
                floatLeft: true
            }),
            fontSize: '4em'
        }
        style.lobbiesTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 90,
                heightPixels: 150,
                marginLeftPercentage: 5,
                floatLeft: true,
                marginTopPixels: 10
            }),
            fontSize: '4em'
        };

        style.gameLobbiesComponentStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    position: Position.relative,
                    floatLeft: true,
                    widthPercentage: 80,
                    heightPixels: 450,
                    marginLeftPercentage: 10
                }),
                perspectiveStyle: new PerspectiveStyle()
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
                    heightPixels: 390,
                    paddingBottomPixels: 2
                })
            }
        }
        
        style.navbarComponentStyle = {
            displayStyle: new DisplayStyle({
                position: Position.fixed,
                topPixels: 0,
                widthPercentage: 100,
                paddingLeftPixels: 10,
                paddingTopPixels: 17
            })
        };
        style.playNavbarItemStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    heightPixels: 55,
                    widthPercentage: 17
                }),
                perspectiveStyle: new PerspectiveStyle({
                    perspective: 400
                })
            },
            cardRotationAnimation: {
                rotationFrom: 0,
                rotationTo: 20,
                rotationDirection: 1,
                rotationDelay: 1000,
                rotationDuration: 500
            },
            cardHoverAnimation: new CardRotationAnimation({
                rotationFrom: 20,
                rotationTo: 0,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            }),
            isSelected: true,
            showIcon: true,
            showText: false
        };

        let navbarItemStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    heightPixels: 55,
                    widthPercentage: 17
                }),
                perspectiveStyle: new PerspectiveStyle({
                    perspective: 400
                })
            },
            cardRotationAnimation: {
                rotationFrom: 0,
                rotationTo: 20,
                rotationDirection: 1,
                rotationDelay: 1000,
                rotationDuration: 500
            },
            cardHoverAnimation: new CardRotationAnimation({
                rotationFrom: 20,
                rotationTo: 0,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            }),
            isSelected: false,
            showIcon: true,
            showText: false
        };
        style.communityNavbarItemStyle = navbarItemStyle;
        style.newsNavbarItemStyle = navbarItemStyle;

        style.gameLobbyComponentStyle = {
            cardComponentStyle: {
                displayStyle: new DisplayStyle({
                    position: Position.relative,
                    floatLeft: true,
                    widthPercentage: 80,
                    heightPixels: 600,
                    marginLeftPercentage: 10,
                    marginTopPixels: 20
                }),
                perspectiveStyle: new PerspectiveStyle({
                    perspective: 5000
                })
            },

            gameLobbyNameLabelledInputStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 70,
                    marginLeftPercentage: 5,
                    marginTopPixels: 20
                })
            },

            maxLobbyLimitLabelledListStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 70,
                    marginLeftPercentage: 5,
                    marginTopPixels: 20
                })
            },

            gameModeLabelledListStyle: {
                displayStyle: new DisplayStyle({
                    widthPercentage: 70,
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
                    heightPixels: 450,
                    widthPercentage: 100
                })
            },

            gameLobbyPlayersPanelStyle: {
                displayStyle: new DisplayStyle({
                    marginTopPixels: 10,
                    heightPixels: 150,
                    widthPercentage: 98,
                    display: Display.inlineBlock
                })
            },

            gameLobbyMessagesPanelStyle: {
                displayStyle: new DisplayStyle({
                    heightPixels: 298,
                    widthPercentage: 98
                })
            },

            gameLobbyMessageButtonedInputStyle: {
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
            },

            createGameLobbyFlipAnimation: {
                rotationFrom: 180,
                rotationTo: 359.9,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            },

            currentGameLobbyFlipAnimation: {
                rotationFrom: 0,
                rotationTo: 180,
                rotationDirection: 1,
                rotationDelay: 0,
                rotationDuration: 1000
            }
        }
        return style;
    }
}