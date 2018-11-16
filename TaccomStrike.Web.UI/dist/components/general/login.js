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
var button_1 = require("./button");
var styled_components_1 = require("styled-components");
var card_1 = require("./card");
var LoginComponentElement = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\theight: 100%;\n\twidth: 100%;\n"], ["\n\theight: 100%;\n\twidth: 100%;\n"])));
var LoginComponent = /** @class */ (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.loginButtonClickHandler = function () {
            console.log("login");
        };
        return _this;
    }
    LoginComponent.prototype.render = function () {
        var loginComponent = (React.createElement(LoginComponentElement, null,
            React.createElement(button_1.ButtonComponent, { buttonText: "Login", buttonClickHandler: this.loginButtonClickHandler, buttonComponentStyling: this.props.loginComponentStyling.loginButtonComponentStyling })));
        return (React.createElement(card_1.CardComponent, { panel: loginComponent, cardStyling: this.props.loginComponentStyling.cardComponentStyling }));
    };
    return LoginComponent;
}(React.Component));
exports.LoginComponent = LoginComponent;
var templateObject_1;
//# sourceMappingURL=login.js.map