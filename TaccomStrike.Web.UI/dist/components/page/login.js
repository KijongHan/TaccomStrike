"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var login_1 = require("../general/login");
var styled_components_1 = require("styled-components");
var titlepanels_1 = require("../general/titlepanels");
var LoginPage = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\theight: 100%;\n"], ["\n\theight: 100%;\n"])));
var largeStyling = {
    titlePanelsStyling: {
        heightPercentage: 20
    },
    callTitlePanelStyling: {
        widthPercentage: 40,
        heightPercentage: 100,
        marginLeftPercentage: 1,
        floatLeft: true
    },
    cheatTitlePanelStyling: {
        widthPercentage: 55,
        heightPercentage: 100,
        marginLeftPercentage: 3,
        floatLeft: true
    },
    loginComponentStyling: {
        cardComponentStyling: {
            widthPercentage: 20,
            heightPercentage: 20
        },
        loginButtonComponentStyling: {
            positionBottom: true,
            widthPercentage: 80,
            heightPercentage: 20,
            marginBottomPercentage: 0
        }
    }
};
var mediumStyling = {
    titlePanelsStyling: {
        heightPercentage: 40
    },
    callTitlePanelStyling: {
        widthPercentage: 90,
        heightPercentage: 50,
        marginLeftPercentage: 5,
        floatLeft: true
    },
    cheatTitlePanelStyling: {
        widthPercentage: 90,
        heightPercentage: 50,
        marginLeftPercentage: 5,
        floatLeft: true
    },
    loginComponentStyling: {
        cardComponentStyling: {
            widthPercentage: 20,
            heightPercentage: 20
        },
        loginButtonComponentStyling: {
            positionBottom: true,
            widthPercentage: 80,
            heightPercentage: 20,
            marginBottomPercentage: 0
        }
    }
};
var smallStyling = {
    titlePanelsStyling: {
        heightPercentage: 40
    },
    callTitlePanelStyling: {
        widthPercentage: 90,
        heightPercentage: 50,
        marginLeftPercentage: 5,
        floatLeft: true
    },
    cheatTitlePanelStyling: {
        widthPercentage: 90,
        heightPercentage: 50,
        marginLeftPercentage: 5,
        floatLeft: true
    },
    loginComponentStyling: {
        cardComponentStyling: {
            widthPercentage: 20,
            heightPercentage: 20
        },
        loginButtonComponentStyling: {
            positionBottom: true,
            widthPercentage: 80,
            heightPercentage: 20,
            marginBottomPercentage: 0
        }
    }
};
var verySmallStyling = {
    titlePanelsStyling: {
        heightPercentage: 40
    },
    callTitlePanelStyling: {
        widthPercentage: 90,
        heightPercentage: 50,
        marginLeftPercentage: 5,
        floatLeft: true
    },
    cheatTitlePanelStyling: {
        widthPercentage: 90,
        heightPercentage: 50,
        marginLeftPercentage: 5,
        floatLeft: true
    },
    loginComponentStyling: {
        cardComponentStyling: {
            widthPercentage: 20,
            heightPercentage: 20
        },
        loginButtonComponentStyling: {
            positionBottom: true,
            widthPercentage: 80,
            heightPercentage: 20,
            marginBottomPercentage: 0
        }
    }
};
var LoginPageComponent = /** @class */ (function (_super) {
    __extends(LoginPageComponent, _super);
    function LoginPageComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.throttledResizeEventHandler = function () {
            _this.throttledEventHandler(_this.resizeEventHandler);
        };
        _this.throttledEventHandler = function (eventHandler) {
            var resizeTimeout;
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(function () {
                    resizeTimeout = null;
                    eventHandler();
                }, 500);
            }
        };
        _this.resizeEventHandler = function () {
            var w = window.innerWidth;
            var h = window.innerHeight;
            if (w > 1200) {
                if (_this.state.loginPageStyling != largeStyling) {
                    _this.setState({ loginPageStyling: largeStyling });
                }
            }
            else if (w > 992) {
                if (_this.state.loginPageStyling != mediumStyling) {
                    _this.setState({ loginPageStyling: mediumStyling });
                }
            }
            else if (w > 768) {
                if (_this.state.loginPageStyling != smallStyling) {
                    _this.setState({ loginPageStyling: smallStyling });
                }
            }
            else {
                if (_this.state.loginPageStyling != verySmallStyling) {
                    _this.setState({ loginPageStyling: verySmallStyling });
                }
            }
        };
        _this.state =
            {
                loginPageStyling: largeStyling
            };
        return _this;
    }
    LoginPageComponent.prototype.render = function () {
        var titleWords = ["Call", "Cheat"];
        var titlePanelStylings = [this.state.loginPageStyling.callTitlePanelStyling, this.state.loginPageStyling.cheatTitlePanelStyling];
        return (React.createElement(LoginPage, null,
            React.createElement(titlepanels_1.TitlePanelsComponent, { titleWords: titleWords, titlePanelStylings: titlePanelStylings, titlePanelsStyling: this.state.loginPageStyling.titlePanelsStyling }),
            React.createElement(login_1.LoginComponent, { loginComponentStyling: this.state.loginPageStyling.loginComponentStyling })));
    };
    LoginPageComponent.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.throttledResizeEventHandler);
        this.resizeEventHandler();
    };
    LoginPageComponent.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.throttledResizeEventHandler);
    };
    return LoginPageComponent;
}(React.Component));
exports.LoginPageComponent = LoginPageComponent;
var templateObject_1;
//# sourceMappingURL=login.js.map