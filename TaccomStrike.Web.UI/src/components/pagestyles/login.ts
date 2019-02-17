import { BasePageStyle } from "./base";
import { TitlePanelsStyle } from "../general/titlepanels";
import { TitlePanelStyle } from "../general/titlepanel";
import { LoginComponentStyle } from "../general/login";
import { RegisterComponentStyle } from "../general/register";
import { DisplayStyle, Position } from "../../styles/displaystyle";
import { PerspectiveStyle } from "../../styles/perspectivestyle";
import { ComboButtonComponentStyle } from "../general/combobutton";

export class LoginPageStyle extends BasePageStyle
{
    titlePanelsStyle: TitlePanelsStyle;
	callTitlePanelStyle: TitlePanelStyle;
	cheatTitlePanelStyle: TitlePanelStyle;

	loginComponentStyle: LoginComponentStyle;
	registerComponentStyle: RegisterComponentStyle;

    large = () => 
    {
        let style = new LoginPageStyle();
        style.titlePanelsStyle = {
            displayStyling: new DisplayStyle({ heightPixels: 150 })
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
        style.loginComponentStyle = {
            cardComponentStyle:
                {
                    displayStyle: new DisplayStyle({
                        floatLeft: true,
                        widthPercentage: 30,
                        heightPixels: 450,
                        marginLeftPixels: 20
                    }),
                    perspectiveStyle: new PerspectiveStyle({
                        perspective: 3000
                    })
                },
                
                userGuestComboButtonComponentStyle: new ComboButtonComponentStyle(
                    new DisplayStyle({
                        widthPercentage: 60,
                        heightPixels: 50,
                        marginLeftPercentage: 5
                    })
                ),
        
                loginButtonComponentStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 30,
                        heightPixels: 50,
                        marginLeftPercentage: 5,
                        position: Position.absolute,
                        bottomPixels: 10
                    })
                },
        
                usernameLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 70,
                        marginLeftPercentage: 5,
                        marginTopPixels: 20
                    })
                },
        
                passwordLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 70,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                }
        };
        style.registerComponentStyle = {
            cardComponentStyle:
                {
                    displayStyle: new DisplayStyle({
                        floatLeft: true,
                        widthPercentage: 35,
                        heightPixels: 450,
                        marginLeftPixels: 20
                    }),
                    perspectiveStyle: new PerspectiveStyle({
                        perspective: 1200
                    })
                },
        
                usernameLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 70,
                        marginLeftPercentage: 5
                    })
                },
        
                emailLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 70,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                },
        
                passwordLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 70,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                },
        
                confirmPasswordLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 70,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                },
        
                registerButtonComponentStyle:
                {
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
        let style = new LoginPageStyle();
        style.titlePanelsStyle = {
            displayStyling: new DisplayStyle({
                heightPixels: 340
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
        style.loginComponentStyle = {
            cardComponentStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 45,
                        marginLeftPercentage: 4,
                        heightPixels: 450
                    }),
                    perspectiveStyle: new PerspectiveStyle({
                        perspective: 1200
                    })
                },
        
                userGuestComboButtonComponentStyle: new ComboButtonComponentStyle(
                    new DisplayStyle({
                        widthPercentage: 60,
                        heightPixels: 50,
                        marginLeftPercentage: 5
                    })
                ),
        
                loginButtonComponentStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 30,
                        heightPixels: 50,
                        marginLeftPercentage: 5,
                        position: Position.absolute,
                        bottomPixels: 10
                    })
                },
        
                usernameLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 20
                    })
                },
        
                passwordLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                }
        };
        style.registerComponentStyle = {
            cardComponentStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 45,
                        heightPixels: 450,
                        marginLeftPercentage: 2
                    }),
                    perspectiveStyle: new PerspectiveStyle({
                        perspective: 1200
                    })
                },
        
                usernameLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 20
                    })
                },
        
                emailLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                },
        
                passwordLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                },
        
                confirmPasswordLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                },
        
                registerButtonComponentStyle:
                {
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

    small = () => 
    {
        let style = new LoginPageStyle();
        style.titlePanelsStyle = {
            displayStyling: new DisplayStyle({ 
                heightPixels: 355
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
        style.loginComponentStyle = {
            cardComponentStyle:
                {
                    displayStyle: new DisplayStyle({
                        floatLeft: true,
                        widthPercentage: 70,
                        heightPixels: 450,
                        marginLeftPercentage: 15
                    }),
                    perspectiveStyle: new PerspectiveStyle({
                        perspective: 1200
                    })
                },
        
                userGuestComboButtonComponentStyle: new ComboButtonComponentStyle(
                    new DisplayStyle({
                        widthPercentage: 60,
                        heightPixels: 50,
                        marginLeftPercentage: 5
                    })
                ),
        
                loginButtonComponentStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 30,
                        heightPixels: 50,
                        marginLeftPercentage: 5,
                        position: Position.absolute,
                        bottomPixels: 10
                    })
                },
        
                usernameLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 20
                    })
                },
        
                passwordLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                }
        };
        style.registerComponentStyle = {
            cardComponentStyle:
                {
                    displayStyle: new DisplayStyle({
                        marginLeftPercentage: 15,
                        widthPercentage: 70,
                        heightPixels: 450,
                        marginTopPixels: 25 
                    }),
                    perspectiveStyle: new PerspectiveStyle({
                        perspective: 1200
                    })
                },
        
                usernameLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 20
                    })
                },
        
                emailLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                },
        
                passwordLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                },
        
                confirmPasswordLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                },
        
                registerButtonComponentStyle:
                {
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

    verysmall = () => 
    {
        let style = new LoginPageStyle();
        style.titlePanelsStyle = {
            displayStyling: new DisplayStyle({ 
                heightPixels: 315
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
        style.loginComponentStyle = {
            cardComponentStyle:
                {
                    displayStyle: new DisplayStyle({
                        floatLeft: true,
                        widthPercentage: 90,
                        heightPixels: 450,
                        marginLeftPercentage: 5
                    }),
                    perspectiveStyle: new PerspectiveStyle({
                        perspective: 1200
                    })
                },
        
                userGuestComboButtonComponentStyle: new ComboButtonComponentStyle(
                    new DisplayStyle({
                        widthPercentage: 60,
                        heightPixels: 50,
                        marginLeftPercentage: 5
                    })
                ),
        
                loginButtonComponentStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 30,
                        heightPixels: 50,
                        marginLeftPercentage: 5,
                        position: Position.absolute,
                        bottomPixels: 10
                    })
                },
        
                usernameLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 20
                    })
                },
        
                passwordLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                }
        };
        style.registerComponentStyle = {
            cardComponentStyle:
                {
                    displayStyle: new DisplayStyle({
                        marginLeftPercentage: 5,
                        widthPercentage: 90,
                        heightPixels: 450,
                        marginTopPixels: 25 
                    }),
                    perspectiveStyle: new PerspectiveStyle({
                        perspective: 1200
                    })
                },
        
                usernameLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 20
                    })
                },
        
                emailLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                },
        
                passwordLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                },
        
                confirmPasswordLabelledInputStyle:
                {
                    displayStyle: new DisplayStyle({
                        widthPercentage: 90,
                        marginLeftPercentage: 5,
                        marginTopPixels: 10
                    })
                },
        
                registerButtonComponentStyle:
                {
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
}