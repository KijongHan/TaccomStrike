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
var CardFront = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tposition: absolute;\n\ttop: 0;\n\tbottom: 0;\n\tleft: 0;\n\tright: 0;\n"], ["\n\tposition: absolute;\n\ttop: 0;\n\tbottom: 0;\n\tleft: 0;\n\tright: 0;\n"])));
var CardBack = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tposition: absolute;\n\ttop: 0;\n\tbottom: 0;\n\tleft: 0;\n\tright: 0;\n\tbackground-color: black;\n\tborder-style: solid;\n\tborder-width: 4px;\n\tborder-color: rgba(180, 180, 180, 0.7);\n\ttransform: rotateY(180deg);\n"], ["\n\tposition: absolute;\n\ttop: 0;\n\tbottom: 0;\n\tleft: 0;\n\tright: 0;\n\tbackground-color: black;\n\tborder-style: solid;\n\tborder-width: 4px;\n\tborder-color: rgba(180, 180, 180, 0.7);\n\ttransform: rotateY(180deg);\n"])));
var Card = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\tposition: relative;\n\tfloat: left;\n\twidth: ", "%;\n\theight: ", "%;\n"], ["\n\tposition: relative;\n\tfloat: left;\n\twidth: ", "%;\n\theight: ", "%;\n"])), function (p) { return p.widthPercentage; }, function (p) { return p.heightPercentage; });
var CardComponent = /** @class */ (function (_super) {
    __extends(CardComponent, _super);
    function CardComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state =
            {
                panel: props.panel,
                cardStyling: props.cardStyling
            };
        return _this;
    }
    CardComponent.prototype.render = function () {
        return (React.createElement(Card, { widthPercentage: this.state.cardStyling.widthPercentage, heightPercentage: this.state.cardStyling.heightPercentage },
            React.createElement(CardFront, null, this.state.panel),
            React.createElement(CardBack, null)));
    };
    return CardComponent;
}(React.Component));
exports.CardComponent = CardComponent;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=card.js.map