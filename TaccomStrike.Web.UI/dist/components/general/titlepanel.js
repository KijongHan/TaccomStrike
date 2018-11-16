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
var card_1 = require("./card");
var styled_components_1 = require("styled-components");
var TitlePanel = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\twidth: ", "%;\n\theight: ", "%;\n\tfloat: ", ";\n\tmargin-left: ", "%;\n\ttransform: rotateX(-4deg);\n"], ["\n\twidth: ", "%;\n\theight: ", "%;\n\tfloat: ", ";\n\tmargin-left: ", "%;\n\ttransform: rotateX(-4deg);\n"])), function (p) { return p.widthPercentage; }, function (p) { return p.heightPercentage; }, function (p) { return p.floatLeft ? 'left' : 'none'; }, function (p) { return p.marginLeftPercentage; });
var TitlePanelComponent = /** @class */ (function (_super) {
    __extends(TitlePanelComponent, _super);
    function TitlePanelComponent(props) {
        var _this = _super.call(this, props) || this;
        var titleLetters = [];
        for (var i = 0; i < props.title.length; i++) {
            titleLetters.push(props.title.charAt(i));
        }
        var cardStyling = {
            widthPercentage: 100 / titleLetters.length,
            heightPercentage: 100
        };
        _this.state =
            {
                titleLetters: titleLetters,
                cardStyling: cardStyling,
                titlePanelStyling: props.titlePanelStyling
            };
        return _this;
    }
    TitlePanelComponent.prototype.render = function () {
        var _this = this;
        var cardComponents = this.state.titleLetters.map(function (titleLetter, index) {
            var titlePanel = (React.createElement("div", null, titleLetter));
            return React.createElement(card_1.CardComponent, { panel: titlePanel, cardStyling: _this.state.cardStyling });
        });
        return (React.createElement(TitlePanel, { widthPercentage: this.state.titlePanelStyling.widthPercentage, heightPercentage: this.state.titlePanelStyling.heightPercentage, marginLeftPercentage: this.state.titlePanelStyling.marginLeftPercentage, floatLeft: this.state.titlePanelStyling.floatLeft }, cardComponents));
    };
    TitlePanelComponent.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.titlePanelStyling !== prevProps.titlePanelStyling) {
            this.setState({ titlePanelStyling: this.props.titlePanelStyling });
        }
    };
    return TitlePanelComponent;
}(React.Component));
exports.TitlePanelComponent = TitlePanelComponent;
var templateObject_1;
//# sourceMappingURL=titlepanel.js.map