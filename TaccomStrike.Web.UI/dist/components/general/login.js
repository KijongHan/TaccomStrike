"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const button_1 = require("./button");
const styled_components_1 = require("styled-components");
const card_1 = require("./card");
const labelledinput_1 = require("./labelledinput");
const LoginComponentElement = styled_components_1.default.div `
	height: 100%;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.88);
`;
class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.loginAsUserButtonClickHandler = () => {
            console.log("login");
        };
        this.state =
            {
                loginComponentStyle: props.loginComponentStyle
            };
    }
    render() {
        let loginComponent = (React.createElement(LoginComponentElement, null,
            React.createElement(button_1.ButtonComponent, { buttonText: "User", buttonClickHandler: this.loginAsUserButtonClickHandler, buttonComponentStyling: this.state.loginComponentStyle.loginAsUserButtonComponentStyle }),
            React.createElement(button_1.ButtonComponent, { buttonText: "Guest", buttonClickHandler: this.loginAsUserButtonClickHandler, buttonComponentStyling: this.state.loginComponentStyle.loginAsGuestButtonComponentStyle }),
            React.createElement(labelledinput_1.LabelledInputComponent, { initialValue: "", labelValue: "Username", componentStyle: this.state.loginComponentStyle.usernameLabelledInputStyle })));
        let tiltAnimation = new card_1.CardTiltAnimation();
        tiltAnimation.tiltAngle = 20;
        tiltAnimation.tiltDelay = 0;
        tiltAnimation.tiltDuration = 0.7;
        return (React.createElement(card_1.CardComponent, { panel: loginComponent, cardStyling: this.state.loginComponentStyle.cardComponentStyle, cardOrientation: card_1.CardOrientation.Front, flipAnimation: null, tiltAnimation: tiltAnimation }));
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.loginComponentStyle !== prevProps.loginComponentStyle) {
            this.setState({ loginComponentStyle: this.props.loginComponentStyle });
        }
    }
}
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.js.map