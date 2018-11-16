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
var titlepanel_1 = require("./titlepanel");
var styled_components_1 = require("styled-components");
var TitlesPanel = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\theight: ", "%;\n\n\toverflow: hidden;\n\t-webkit-perspective: 800px;\n\tperspective: 800px;\n\tmargin-top: 20px;\n\tmargin-bottom: 50px;\n\tpadding-bottom: 10px;\n"], ["\n\theight: ", "%;\n\n\toverflow: hidden;\n\t-webkit-perspective: 800px;\n\tperspective: 800px;\n\tmargin-top: 20px;\n\tmargin-bottom: 50px;\n\tpadding-bottom: 10px;\n"])), function (p) { return p.heightPercentage; });
var TitlePanelsComponent = /** @class */ (function (_super) {
    __extends(TitlePanelsComponent, _super);
    function TitlePanelsComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state =
            {
                titleWords: props.titleWords,
                titlePanelStylings: props.titlePanelStylings,
                titlePanelsStyling: props.titlePanelsStyling,
            };
        return _this;
    }
    TitlePanelsComponent.prototype.render = function () {
        var _this = this;
        var titlePanelComponents = this.state.titleWords.map(function (titleWord, index) {
            return (React.createElement(titlepanel_1.TitlePanelComponent, { title: titleWord, titlePanelStyling: _this.state.titlePanelStylings[index] }));
        });
        return (React.createElement(TitlesPanel, { heightPercentage: this.state.titlePanelsStyling.heightPercentage }, titlePanelComponents));
    };
    TitlePanelsComponent.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.titlePanelStylings !== prevProps.titlePanelStylings) {
            this.setState({ titlePanelStylings: this.props.titlePanelStylings });
        }
        if (this.props.titlePanelsStyling !== prevProps.titlePanelsStyling) {
            this.setState({ titlePanelsStyling: this.props.titlePanelsStyling });
        }
    };
    return TitlePanelsComponent;
}(React.Component));
exports.TitlePanelsComponent = TitlePanelsComponent;
var templateObject_1;
//# sourceMappingURL=titlepanels.js.map