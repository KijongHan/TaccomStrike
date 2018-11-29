"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const util_1 = require("util");
const CardFront = styled_components_1.default.div `
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	${(p) => util_1.isNullOrUndefined(p.tiltAnimation) ? '' :
    `animation: ${CardTilt(p.startRotation, p.endRotation)} ${p.tiltAnimation.tiltDuration}s ${p.tiltAnimation.tiltDelay}s forwards`};
	${(p) => util_1.isNullOrUndefined(p.flipAnimation) ? '' :
    `animation: ${CardFlip(180, 'visible')} ${p.flipAnimation.flipDuration / 2}s ${p.flipAnimation.flipDelay}s forwards`};
	visibility: ${(p) => p.display ? 'visible' : 'hidden'};
	transform: ${(p) => p.flipped ? 'rotateY(180deg);' : 'rotateY(0deg);'};
`;
const CardBack = styled_components_1.default.div `
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: black;
	border-style: solid;
	border-width: 4px;
	border-color: rgba(180, 180, 180, 0.7);
	${(p) => util_1.isNullOrUndefined(p.tiltAnimation) ? '' :
    `animation: ${CardTilt(p.startRotation, p.endRotation)} ${p.tiltAnimation.tiltDuration}s ${p.tiltAnimation.tiltDelay}s forwards`};
	${(p) => util_1.isNullOrUndefined(p.flipAnimation) ? '' :
    `animation: ${CardFlip(180, 'hidden')} ${p.flipAnimation.flipDuration / 2}s ${p.flipAnimation.flipDelay}s forwards`};
	transform: ${(p) => p.flipped ? 'rotateY(180deg);' : 'rotateY(0deg);'};
	visibility: ${(p) => p.display ? 'visible' : 'hidden'};
`;
const Card = styled_components_1.default.div `
	position: relative;
	float: left;
	width: ${(p) => p.displayStyling.getWidthString()};
	height: ${(p) => p.displayStyling.getHeightString()};
	-webkit-perspective: 800px;
	perspective: 800px;
`;
function CardTilt(startRotation, endRotation) {
    return styled_components_1.keyframes `
		0% {
			transform: rotateY(${startRotation}deg);
		}

		100% {
			transform: rotateY(${endRotation}deg);
		}
	`;
}
function CardFlip(startRotation, endVisibility) {
    return styled_components_1.keyframes `
		0% {
			transform: rotateY(${startRotation}deg);
		}
	
		50% {
			transform: rotateY(90deg);
			visibility: ${endVisibility};
		}

		100% {
			transform: rotateY(0deg);
			visibility: ${endVisibility};
		}
	`;
}
var CardOrientation;
(function (CardOrientation) {
    CardOrientation[CardOrientation["Front"] = 0] = "Front";
    CardOrientation[CardOrientation["Back"] = 1] = "Back";
})(CardOrientation = exports.CardOrientation || (exports.CardOrientation = {}));
class CardBackStyling {
}
exports.CardBackStyling = CardBackStyling;
class CardFrontStyling {
}
exports.CardFrontStyling = CardFrontStyling;
class CardFlipAnimation {
}
exports.CardFlipAnimation = CardFlipAnimation;
class CardTiltAnimation {
}
exports.CardTiltAnimation = CardTiltAnimation;
class CardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                panel: props.panel,
                cardStyling: props.cardStyling,
                cardOrientation: props.cardOrientation,
                flipAnimation: props.flipAnimation,
                tiltAnimation: props.tiltAnimation
            };
    }
    render() {
        let displayBack;
        let displayFront;
        let cardFlipped;
        if (this.state.cardOrientation == CardOrientation.Front) {
            displayBack = false;
            displayFront = true;
            cardFlipped = false;
        }
        else {
            displayBack = true;
            displayFront = false;
            cardFlipped = true;
        }
        let startRotation;
        let endRotation;
        if (this.state.tiltAnimation != null) {
            if (cardFlipped) {
                startRotation = 180;
            }
            else {
                startRotation = 0;
            }
            endRotation = this.state.tiltAnimation.tiltAngle + startRotation;
        }
        return (React.createElement(Card, { displayStyling: this.state.cardStyling.displayStyling },
            React.createElement(CardFront, { flipAnimation: this.state.flipAnimation, tiltAnimation: this.state.tiltAnimation, display: displayFront, flipped: cardFlipped, startRotation: startRotation, endRotation: endRotation }, this.state.panel),
            React.createElement(CardBack, { flipAnimation: this.state.flipAnimation, tiltAnimation: this.state.tiltAnimation, display: displayBack, flipped: cardFlipped, startRotation: startRotation, endRotation: endRotation })));
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.cardStyling !== prevProps.cardStyling) {
            this.setState({
                cardStyling: this.props.cardStyling,
                panel: this.props.panel,
                flipAnimation: this.props.flipAnimation,
                tiltAnimation: this.props.tiltAnimation
            });
        }
    }
}
exports.CardComponent = CardComponent;
//# sourceMappingURL=card.js.map