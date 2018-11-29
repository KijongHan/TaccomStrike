"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const LabelledInputComponentElement = styled_components_1.default.div `
	width: ${(p) => p.displayStyling.getWidthString()};
	margin: ${(p) => p.displayStyling.getMarginString()};
`;
const LabelComponentElement = styled_components_1.default.div `
	width: 40%;
	padding-left: 5px;
	background-color: rgba(255, 255, 255, 0.65);
	font-size: 1.25em;
`;
const InputComponentElement = styled_components_1.default.input `
	width: 80%;
    background-color: rgba(255, 255, 255, 0.5);
    border-style: solid;
    border-width: 2px;
    border-color: rgba(255, 255, 255, 0.65);
    font-size: 1.2em;
`;
class LabelledInputComponentProps {
}
exports.LabelledInputComponentProps = LabelledInputComponentProps;
class LabelledInputComponentState {
}
exports.LabelledInputComponentState = LabelledInputComponentState;
class LabelledInputComponentStyle {
}
exports.LabelledInputComponentStyle = LabelledInputComponentStyle;
class LabelledInputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labelValue: props.labelValue,
            componentStyle: props.componentStyle
        };
    }
    render() {
        return (React.createElement(LabelledInputComponentElement, { displayStyling: this.state.componentStyle.displayStyling },
            React.createElement(LabelComponentElement, null, this.state.labelValue),
            React.createElement(InputComponentElement, { value: String(this.props.initialValue) })));
    }
}
exports.LabelledInputComponent = LabelledInputComponent;
//# sourceMappingURL=labelledinput.js.map