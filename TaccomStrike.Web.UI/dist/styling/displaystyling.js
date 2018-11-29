"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
class DisplayStyling {
    constructor(init) {
        this.getMarginString = () => {
            let marginLeft = "0";
            let marginRight = "0";
            let marginTop = "0";
            let marginBottom = "0";
            if (!util_1.isNullOrUndefined(this.marginLeftPixels)) {
                marginLeft = `${this.marginLeftPixels}px`;
            }
            if (!util_1.isNullOrUndefined(this.marginLeftPercentage)) {
                marginLeft = `${this.marginLeftPercentage}%`;
            }
            if (!util_1.isNullOrUndefined(this.marginRightPixels)) {
                marginRight = `${this.marginRightPixels}px`;
            }
            if (!util_1.isNullOrUndefined(this.marginRightPercentage)) {
                marginRight = `${this.marginRightPercentage}%`;
            }
            if (!util_1.isNullOrUndefined(this.marginTopPixels)) {
                marginTop = `${this.marginTopPixels}px`;
            }
            if (!util_1.isNullOrUndefined(this.marginTopPercentage)) {
                marginTop = `${this.marginTopPercentage}%`;
            }
            if (!util_1.isNullOrUndefined(this.marginBottomPixels)) {
                marginBottom = `${this.marginBottomPixels}px`;
            }
            if (!util_1.isNullOrUndefined(this.marginBottomPercentage)) {
                marginBottom = `${this.marginBottomPercentage}%`;
            }
            return `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`;
        };
        this.getWidthString = () => {
            if (!util_1.isNullOrUndefined(this.widthPxiels)) {
                return `${this.widthPxiels}px`;
            }
            if (!util_1.isNullOrUndefined(this.widthPercentage)) {
                return `${this.widthPercentage}%`;
            }
            else {
                return "";
            }
        };
        this.getHeightString = () => {
            if (!util_1.isNullOrUndefined(this.heightPixels)) {
                return `${this.heightPixels}px`;
            }
            if (!util_1.isNullOrUndefined(this.heightPercentage)) {
                return `${this.heightPercentage}%`;
            }
            else {
                return "";
            }
        };
        this.getFloatString = () => {
            if (!util_1.isNullOrUndefined(this.floatLeft) && this.floatLeft === true) {
                return 'left';
            }
            else {
                return 'none';
            }
        };
        Object.assign(this, init);
    }
}
exports.DisplayStyling = DisplayStyling;
//# sourceMappingURL=displaystyling.js.map