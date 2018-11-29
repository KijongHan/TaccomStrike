"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const ButtonElement = styled_components_1.default.div `
	font-weight: bold;
	text-align: center;
	background-color: rgba(255, 255, 255, 0.1);
	color: rgba(255, 255, 255, 0.75);
	-webkit-box-shadow: 0px 0px 0.2px 2px rgba(255,255,255,0.7);
	-moz-box-shadow: 0px 0px 0.2px 2px rgba(255,255,255,0.7);
	box-shadow: 0px 0px 0.2px 2px rgba(255,255,255,0.7);

	float: ${(p) => p.layoutStyling.getFloatString()};
	width: ${(p) => p.layoutStyling.getWidthString()};
	height: ${(p) => p.layoutStyling.getHeightString()};
	line-height: ${(p) => p.layoutStyling.getHeightString()};
	margin: ${(p) => p.layoutStyling.getMarginString()};
	
	&:hover {
		background-color: rgba(255, 255, 255, 0.25);
		cursor: pointer;
	}
`;
class ButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonComponentStyling: props.buttonComponentStyling
        };
    }
    render() {
        return (React.createElement(ButtonElement, { layoutStyling: this.state.buttonComponentStyling.layoutStyling, onClick: this.props.buttonClickHandler }, this.props.buttonText));
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.buttonComponentStyling !== prevProps.buttonComponentStyling) {
            this.setState({ buttonComponentStyling: this.props.buttonComponentStyling });
        }
    }
}
exports.ButtonComponent = ButtonComponent;
//# sourceMappingURL=button.js.map