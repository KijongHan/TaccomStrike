"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const login_1 = require("../general/login");
const styled_components_1 = require("styled-components");
const titlepanels_1 = require("../general/titlepanels");
const displaystyling_1 = require("../../styling/displaystyling");
const LoginPage = styled_components_1.default.div `
	height: 100%;
`;
const largeStyling = {
    titlePanelsStyling: {
        displayStyling: new displaystyling_1.DisplayStyling({ heightPixels: 170 })
    },
    callTitlePanelStyling: {
        displayStyling: new displaystyling_1.DisplayStyling({
            widthPercentage: 40,
            heightPixels: 170,
            marginLeftPercentage: 1,
            floatLeft: true
        })
    },
    cheatTitlePanelStyling: {
        displayStyling: new displaystyling_1.DisplayStyling({
            widthPercentage: 55,
            heightPixels: 170,
            marginLeftPercentage: 3,
            floatLeft: true
        })
    },
    loginComponentStyling: {
        cardComponentStyle: {
            displayStyling: new displaystyling_1.DisplayStyling({ widthPercentage: 30, heightPixels: 400 })
        },
        loginAsUserButtonComponentStyle: {
            layoutStyling: new displaystyling_1.DisplayStyling({
                floatLeft: true,
                widthPercentage: 30,
                heightPixels: 50,
                marginLeftPercentage: 5
            })
        },
        loginAsGuestButtonComponentStyle: {
            layoutStyling: new displaystyling_1.DisplayStyling({
                floatLeft: true,
                widthPercentage: 30,
                heightPixels: 50,
                marginLeftPercentage: 5
            })
        },
        usernameLabelledInputStyle: {
            displayStyling: new displaystyling_1.DisplayStyling({
                widthPercentage: 90,
                marginLeftPercentage: 5,
                marginTopPixels: 10
            })
        }
    }
};
const mediumStyling = {
    titlePanelsStyling: {
        displayStyling: new displaystyling_1.DisplayStyling({ heightPixels: 340 })
    },
    callTitlePanelStyling: {
        displayStyling: new displaystyling_1.DisplayStyling({
            widthPercentage: 90,
            heightPixels: 170,
            marginLeftPercentage: 5,
            floatLeft: true
        })
    },
    cheatTitlePanelStyling: {
        displayStyling: new displaystyling_1.DisplayStyling({
            widthPercentage: 90,
            heightPixels: 170,
            marginLeftPercentage: 5,
            floatLeft: true
        })
    },
    loginComponentStyling: {
        cardComponentStyle: {
            displayStyling: new displaystyling_1.DisplayStyling({ widthPercentage: 25, heightPixels: 400 })
        },
        loginAsUserButtonComponentStyle: {
            layoutStyling: new displaystyling_1.DisplayStyling({
                floatLeft: false,
                widthPercentage: 80,
                heightPixels: 50
            })
        },
        loginAsGuestButtonComponentStyle: {
            layoutStyling: new displaystyling_1.DisplayStyling({
                floatLeft: false,
                widthPercentage: 80,
                heightPixels: 50
            })
        },
        usernameLabelledInputStyle: {
            displayStyling: new displaystyling_1.DisplayStyling({
                widthPercentage: 90,
                marginLeftPercentage: 5,
                marginTopPixels: 10
            })
        }
    }
};
const smallStyling = {
    titlePanelsStyling: {
        displayStyling: new displaystyling_1.DisplayStyling({ heightPixels: 340 })
    },
    callTitlePanelStyling: {
        displayStyling: new displaystyling_1.DisplayStyling({
            widthPercentage: 90,
            heightPixels: 170,
            marginLeftPercentage: 5,
            floatLeft: true
        })
    },
    cheatTitlePanelStyling: {
        displayStyling: new displaystyling_1.DisplayStyling({
            widthPercentage: 90,
            heightPixels: 170,
            marginLeftPercentage: 5,
            floatLeft: true
        })
    },
    loginComponentStyling: {
        cardComponentStyle: {
            displayStyling: new displaystyling_1.DisplayStyling({ widthPercentage: 90, heightPixels: 400 })
        },
        loginAsUserButtonComponentStyle: {
            layoutStyling: new displaystyling_1.DisplayStyling({
                floatLeft: false,
                widthPercentage: 80,
                heightPixels: 50
            })
        },
        loginAsGuestButtonComponentStyle: {
            layoutStyling: new displaystyling_1.DisplayStyling({
                floatLeft: false,
                widthPercentage: 80,
                heightPixels: 50
            })
        },
        usernameLabelledInputStyle: {
            displayStyling: new displaystyling_1.DisplayStyling({
                widthPercentage: 90,
                marginLeftPercentage: 5,
                marginTopPixels: 10
            })
        }
    }
};
const verySmallStyling = {
    titlePanelsStyling: {
        displayStyling: new displaystyling_1.DisplayStyling({ heightPixels: 340 })
    },
    callTitlePanelStyling: {
        displayStyling: new displaystyling_1.DisplayStyling({
            widthPercentage: 90,
            heightPixels: 170,
            marginLeftPercentage: 5,
            floatLeft: true
        })
    },
    cheatTitlePanelStyling: {
        displayStyling: new displaystyling_1.DisplayStyling({
            widthPercentage: 90,
            heightPixels: 170,
            marginLeftPercentage: 5,
            floatLeft: true
        })
    },
    loginComponentStyling: {
        cardComponentStyle: {
            displayStyling: new displaystyling_1.DisplayStyling({ widthPercentage: 90, heightPixels: 400 })
        },
        loginAsUserButtonComponentStyle: {
            layoutStyling: new displaystyling_1.DisplayStyling({
                floatLeft: false,
                widthPercentage: 80,
                heightPixels: 50
            })
        },
        loginAsGuestButtonComponentStyle: {
            layoutStyling: new displaystyling_1.DisplayStyling({
                floatLeft: false,
                widthPercentage: 80,
                heightPixels: 50
            })
        },
        usernameLabelledInputStyle: {
            displayStyling: new displaystyling_1.DisplayStyling({
                widthPercentage: 90,
                marginLeftPercentage: 5,
                marginTopPixels: 10
            })
        }
    }
};
class LoginPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.throttledResizeEventHandler = () => {
            this.throttledEventHandler(this.resizeEventHandler);
        };
        this.throttledEventHandler = (eventHandler) => {
            let resizeTimeout;
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(() => {
                    resizeTimeout = null;
                    eventHandler();
                }, 500);
            }
        };
        this.resizeEventHandler = () => {
            let w = window.innerWidth;
            let h = window.innerHeight;
            if (w > 1100) {
                if (this.state.loginPageStyling != largeStyling) {
                    this.setState({ loginPageStyling: largeStyling });
                }
            }
            else if (w > 1050) {
                if (this.state.loginPageStyling != mediumStyling) {
                    this.setState({ loginPageStyling: mediumStyling });
                }
            }
            else if (w > 1000) {
                if (this.state.loginPageStyling != smallStyling) {
                    this.setState({ loginPageStyling: smallStyling });
                }
            }
            else {
                if (this.state.loginPageStyling != verySmallStyling) {
                    this.setState({ loginPageStyling: verySmallStyling });
                }
            }
        };
        this.state =
            {
                loginPageStyling: largeStyling
            };
    }
    render() {
        let titleWords = ["Call", "Cheat"];
        let titlePanelStylings = [this.state.loginPageStyling.callTitlePanelStyling, this.state.loginPageStyling.cheatTitlePanelStyling];
        return (React.createElement(LoginPage, null,
            React.createElement(titlepanels_1.TitlePanelsComponent, { titleWords: titleWords, titlePanelStylings: titlePanelStylings, titlePanelsStyling: this.state.loginPageStyling.titlePanelsStyling }),
            React.createElement(login_1.LoginComponent, { loginComponentStyle: this.state.loginPageStyling.loginComponentStyling })));
    }
    componentDidMount() {
        window.addEventListener('resize', this.throttledResizeEventHandler);
        this.resizeEventHandler();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.throttledResizeEventHandler);
    }
}
exports.LoginPageComponent = LoginPageComponent;
//# sourceMappingURL=login.js.map