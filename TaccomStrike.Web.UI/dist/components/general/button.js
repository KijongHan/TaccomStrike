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
var styled_components_1 = require("styled-components");
var ButtonElement = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tfont-weight: bold;\n\ttext-align: center;\n\tbackground-color: rgba(255, 255, 255, 0.1);\n\tcolor: rgba(255, 255, 255, 0.75);\n\t-webkit-box-shadow: 0px 0px 0.2px 2px rgba(255,255,255,0.7);\n\t-moz-box-shadow: 0px 0px 0.2px 2px rgba(255,255,255,0.7);\n\tbox-shadow: 0px 0px 0.2px 2px rgba(255,255,255,0.7);\n\n\twidth: ", "%;\n\theight: ", "%;\n\n\tmargin-bottom: ", "%;\n\n\tbottom: ", ";\n\tposition: ", ";\n"], ["\n\tfont-weight: bold;\n\ttext-align: center;\n\tbackground-color: rgba(255, 255, 255, 0.1);\n\tcolor: rgba(255, 255, 255, 0.75);\n\t-webkit-box-shadow: 0px 0px 0.2px 2px rgba(255,255,255,0.7);\n\t-moz-box-shadow: 0px 0px 0.2px 2px rgba(255,255,255,0.7);\n\tbox-shadow: 0px 0px 0.2px 2px rgba(255,255,255,0.7);\n\n\twidth: ", "%;\n\theight: ", "%;\n\n\tmargin-bottom: ", "%;\n\n\tbottom: ", ";\n\tposition: ", ";\n"])), function (p) { return p.widthPercentage; }, function (p) { return p.heightPercentage; }, function (p) { return p.marginBottomPercentage; }, function (p) { return p.positionBottom ? '0' : 'auto'; }, function (p) { return p.positionBottom ? 'absolute' : 'static'; });
var ButtonComponent = /** @class */ (function (_super) {
    __extends(ButtonComponent, _super);
    function ButtonComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state =
            {
                buttonComponentStyling: props.buttonComponentStyling
            };
        return _this;
    }
    ButtonComponent.prototype.render = function () {
        return (React.createElement(ButtonElement, { widthPercentage: this.state.buttonComponentStyling.widthPercentage, heightPercentage: this.state.buttonComponentStyling.heightPercentage, positionBottom: this.state.buttonComponentStyling.positionBottom, marginBottomPercentage: this.state.buttonComponentStyling.marginBottomPercentage, onClick: this.props.buttonClickHandler }, this.props.buttonText));
    };
    return ButtonComponent;
}(React.Component));
exports.ButtonComponent = ButtonComponent;
var templateObject_1;
//# sourceMappingURL=button.js.map