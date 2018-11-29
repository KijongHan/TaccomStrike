"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const titlepanel_1 = require("./titlepanel");
const styled_components_1 = require("styled-components");
class TitlePanelsStyling {
}
exports.TitlePanelsStyling = TitlePanelsStyling;
const TitlesPanel = styled_components_1.default.div `
	height: ${(p) => p.displayStyling.getHeightString()};
	overflow: hidden;
	margin-bottom: 50px;
	padding-bottom: 10px;
	-webkit-perspective: 800px;
	perspective: 800px;
`;
class TitlePanelsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                titleWords: props.titleWords,
                titlePanelStylings: props.titlePanelStylings,
                titlePanelsStyling: props.titlePanelsStyling,
            };
    }
    render() {
        let titlePanelComponents = this.state.titleWords.map((titleWord, index) => {
            return (React.createElement(titlepanel_1.TitlePanelComponent, { title: titleWord, titlePanelStyling: this.state.titlePanelStylings[index] }));
        });
        return (React.createElement(TitlesPanel, { displayStyling: this.state.titlePanelsStyling.displayStyling }, titlePanelComponents));
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.titlePanelStylings !== prevProps.titlePanelStylings) {
            this.setState({ titlePanelStylings: this.props.titlePanelStylings });
        }
        if (this.props.titlePanelsStyling !== prevProps.titlePanelsStyling) {
            this.setState({ titlePanelsStyling: this.props.titlePanelsStyling });
        }
    }
}
exports.TitlePanelsComponent = TitlePanelsComponent;
//# sourceMappingURL=titlepanels.js.map