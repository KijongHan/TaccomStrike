"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const card_1 = require("./card");
const styled_components_1 = require("styled-components");
const displaystyling_1 = require("../../styling/displaystyling");
class TitlePanelComponentProps {
}
exports.TitlePanelComponentProps = TitlePanelComponentProps;
class TitlePanelComponentState {
}
exports.TitlePanelComponentState = TitlePanelComponentState;
class TitlePanelStyling {
}
exports.TitlePanelStyling = TitlePanelStyling;
const TitleCharacter = styled_components_1.default.div `
	width: 100%;
	height: 100%;
	font-size: 7em;
	line-height: ${(p) => p.displayStyling.getHeightString()}
	text-align: center;

	color: rgba(255, 255, 255, 0.95);
	background-color: rgba(0, 0, 0, 0.35);
	-webkit-box-shadow: -4px 4px 1px 0px rgba(0,0,0,0.55);
	-moz-box-shadow: -4px 4px 1px 0px rgba(0,0,0,0.55);
	box-shadow: -4px 4px 1px 0px rgba(0,0,0,0.55);
`;
const TitlePanel = styled_components_1.default.div `
	width: ${(p) => p.displayStyling.getWidthString()};
	height: ${(p) => p.displayStyling.getHeightString()};
	float: ${(p) => p.displayStyling.getFloatString()};
	margin: ${(p) => p.displayStyling.getMarginString()};
	transform: rotateX(-4deg);
`;
class TitlePanelComponent extends React.Component {
    constructor(props) {
        super(props);
        let titleLetters = [];
        let cardFlipAnimations = [];
        for (let i = 0; i < props.title.length; i++) {
            let cardFlipAnimation = new card_1.CardFlipAnimation();
            cardFlipAnimation.flipDelay = i;
            cardFlipAnimation.flipDuration = 2;
            titleLetters.push(props.title.charAt(i));
            cardFlipAnimations.push(cardFlipAnimation);
        }
        let cardStyling = {
            displayStyling: new displaystyling_1.DisplayStyling({ widthPercentage: 100 / titleLetters.length, heightPercentage: 100 })
        };
        this.state =
            {
                titleLetters: titleLetters,
                cardStyling: cardStyling,
                titlePanelStyling: props.titlePanelStyling,
                cardFlipAnimations: cardFlipAnimations
            };
    }
    render() {
        let cardComponents = this.state.titleLetters.map((titleLetter, index) => {
            let titlePanel = (React.createElement(TitleCharacter, { displayStyling: this.state.titlePanelStyling.displayStyling }, titleLetter));
            let cardFlipAnimation = this.state.cardFlipAnimations[index];
            return React.createElement(card_1.CardComponent, { panel: titlePanel, cardStyling: this.state.cardStyling, cardOrientation: card_1.CardOrientation.Back, flipAnimation: cardFlipAnimation, tiltAnimation: null });
        });
        return (React.createElement(TitlePanel, { displayStyling: this.state.titlePanelStyling.displayStyling }, cardComponents));
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.titlePanelStyling !== prevProps.titlePanelStyling) {
            this.setState({ titlePanelStyling: this.props.titlePanelStyling });
        }
    }
}
exports.TitlePanelComponent = TitlePanelComponent;
//# sourceMappingURL=titlepanel.js.map