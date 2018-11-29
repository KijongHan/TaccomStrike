import styled from "styled-components";
import { isNullOrUndefined } from "util";

export class DisplayStyling
{
	widthPxiels?: number;
	widthPercentage?: number;
	heightPixels?: number;
	heightPercentage?: number;

	floatLeft?: boolean;
	floatRight?: boolean;

	marginTopPixels?: number;
	marginTopPercentage?: number;
	marginBottomPixels?: number;
	marginBottomPercentage?: number;
	marginLeftPixels?: number;
	marginLeftPercentage?: number;
	marginRightPixels?: number;
	marginRightPercentage?: number;


	public constructor(init?: Partial<DisplayStyling>)
	{
		Object.assign(this, init);
	}

	getMarginString = (): string =>
	{
		let marginLeft = "0";
		let marginRight = "0";
		let marginTop = "0";
		let marginBottom = "0";

		if (!isNullOrUndefined(this.marginLeftPixels))
		{
			marginLeft = `${this.marginLeftPixels}px`;
		}
		if (!isNullOrUndefined(this.marginLeftPercentage))
		{
			marginLeft = `${this.marginLeftPercentage}%`;
		}

		if (!isNullOrUndefined(this.marginRightPixels))
		{
			marginRight = `${this.marginRightPixels}px`;
		}
		if (!isNullOrUndefined(this.marginRightPercentage))
		{
			marginRight = `${this.marginRightPercentage}%`;
		}

		if (!isNullOrUndefined(this.marginTopPixels))
		{
			marginTop = `${this.marginTopPixels}px`;
		}
		if (!isNullOrUndefined(this.marginTopPercentage))
		{
			marginTop = `${this.marginTopPercentage}%`;
		}

		if (!isNullOrUndefined(this.marginBottomPixels))
		{
			marginBottom = `${this.marginBottomPixels}px`;
		}
		if (!isNullOrUndefined(this.marginBottomPercentage))
		{
			marginBottom = `${this.marginBottomPercentage}%`;
		}

		return `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`;
	}

	getWidthString = (): string =>
	{
		if (!isNullOrUndefined(this.widthPxiels))
		{
			return `${this.widthPxiels}px`;
		}
		if (!isNullOrUndefined(this.widthPercentage))
		{
			return `${this.widthPercentage}%`;
		}
		else
		{
			return "";
		}
	}

	getHeightString = (): string =>
	{
		if (!isNullOrUndefined(this.heightPixels))
		{
			return `${this.heightPixels}px`;
		}
		if (!isNullOrUndefined(this.heightPercentage))
		{
			return `${this.heightPercentage}%`;
		}
		else
		{
			return "";
		}
	}

	getFloatString = (): string =>
	{
		if (!isNullOrUndefined(this.floatLeft) && this.floatLeft === true)
		{
			return 'left';
		}
		else if (!isNullOrUndefined(this.floatRight) && this.floatRight === true)
		{
			return 'right';
		}
		else
		{
			return 'none';
		}
	}
}