import { BasePageStyle } from "./base";
import { NavbarComponentStyle, NavbarItemStyle } from "../general/navbar";
import { DisplayStyle, Position } from "../../styles/displaystyle";
import { CardRotationAnimation } from "../general/card";
import { PerspectiveStyle } from "../../styles/perspectivestyle";
import { TitlePanelsStyle } from "../general/titlepanels";
import { TitlePanelStyle } from "../general/titlepanel";

export class HomePageStyle extends BasePageStyle 
{
    titlePanelsStyle: TitlePanelsStyle;
	callTitlePanelStyle: TitlePanelStyle;
    cheatTitlePanelStyle: TitlePanelStyle;
    
    statusPanelStyle: DisplayStyle;

    large = () => 
    {
        let style = new HomePageStyle();
        style.titlePanelsStyle = {
            displayStyling: new DisplayStyle({ 
                heightPixels: 150,
                marginTopPixels: 72
            })
        };
        style.callTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 40,
                heightPixels: 150,
                marginLeftPercentage: 1,
                floatLeft: true
            })
        }
        style.cheatTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 55,
                heightPixels: 150,
                marginLeftPercentage: 3,
                floatLeft: true
            })
        };

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
            isSelected: false,
            showIcon: true,
            showText: true
        };
        style.communityNavbarItemStyle = {
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

        style.statusPanelStyle = new DisplayStyle({
            marginLeftPercentage: 2,
            widthPercentage: 25
        });
        return style;
    }

    medium = () => 
    {
        let style = new HomePageStyle();
        style.titlePanelsStyle = {
            displayStyling: new DisplayStyle({
                heightPixels: 340,
                marginTopPixels: 72
            })
        };
        style.callTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 90,
                heightPixels: 170,
                marginLeftPercentage: 5,
                floatLeft: true
            })
        }
        style.cheatTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 90,
                heightPixels: 170,
                marginLeftPercentage: 5,
                marginTopPixels: 15,
                floatLeft: true
            })
        };

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
            isSelected: false,
            showIcon: true,
            showText: true
        };
        style.communityNavbarItemStyle = {
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
        return style;
    }

    small = () => 
    {
        let style = new HomePageStyle();
        style.titlePanelsStyle = {
            displayStyling: new DisplayStyle({ 
                heightPixels: 355,
                marginTopPixels: 72
            })
        };
        style.callTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 90,
                heightPixels: 170,
                marginLeftPercentage: 5,
                floatLeft: true
            })
        }
        style.cheatTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 90,
                heightPixels: 170,
                marginTopPixels: 15,
                marginLeftPercentage: 5,
                floatLeft: true
            })
        };

        style.navbarComponentStyle = {
            displayStyle: new DisplayStyle({
                position: Position.fixed,
                topPixels: 0,
                widthPercentage: 100,
                paddingLeftPixels: 10,
                paddingTopPixels: 17
            })
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
        style.playNavbarItemStyle = navbarItemStyle;
        style.newsNavbarItemStyle = navbarItemStyle;
        return style;
    }

    verysmall = () => 
    {
        let style = new HomePageStyle();
        style.titlePanelsStyle = {
            displayStyling: new DisplayStyle({ 
                heightPixels: 315,
                marginTopPixels: 72
            })
        };
        style.callTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 90,
                heightPixels: 150,
                marginLeftPercentage: 5,
                floatLeft: true
            }),
            fontSize: '4em'
        }
        style.cheatTitlePanelStyle = {
            displayStyle: new DisplayStyle({
                widthPercentage: 90,
                heightPixels: 150,
                marginLeftPercentage: 5,
                marginTopPixels: 15,
                floatLeft: true
            }),
            fontSize: '4em'
        };

        style.navbarComponentStyle = {
            displayStyle: new DisplayStyle({
                position: Position.fixed,
                topPixels: 0,
                widthPercentage: 100,
                paddingLeftPixels: 10,
                paddingTopPixels: 17
            })
        };
        style.communityNavbarItemStyle = {
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
        style.playNavbarItemStyle = navbarItemStyle;
        style.newsNavbarItemStyle = navbarItemStyle;
        return style;
    }

    portrait = ():HomePageStyle => 
    {
        return null;
    }

    landscape = ():HomePageStyle => 
    {
        return null;
    }
}