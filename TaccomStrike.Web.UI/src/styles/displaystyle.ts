import styled from "styled-components";
import { isNullOrUndefined, isNull } from "util";

export enum Position
{
	static, absolute, fixed, relative, sticky, initial, inherit
}

export class DisplayStyle
{
	widthPxiels?: number;
	widthPercentage?: number;
	heightPixels?: number;
	heightPercentage?: number;

	floatLeft?: boolean;
	floatRight?: boolean;

	marginString?: string;
	marginTopPixels?: number;
	marginTopPercentage?: number;
	marginBottomPixels?: number;
	marginBottomPercentage?: number;
	marginLeftPixels?: number;
	marginLeftPercentage?: number;
	marginRightPixels?: number;
	marginRightPercentage?: number;

	paddingTopPixels?: number;
	paddingBottomPixels?: number;
	paddingLeftPixels?: number;
	paddingRightPixels?: number;

	rightPixels?: number;
	topPixels?: number;
	topPercentage?: number;
	leftPixels?: number;
	bottomPixels?: number;
	bottomPercentage?: number;
	position?: Position;

	public constructor(init?: Partial<DisplayStyle>)
	{
		this.position = Position.static;
		Object.assign(this, init);
	}

	getMarginString = (): string =>
	{
		let marginLeft = "0";
		let marginRight = "0";
		let marginTop = "0";
		let marginBottom = "0";

		if(!isNullOrUndefined(this.marginString)) 
		{
			return this.marginString;
		}

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

	getPaddingString = (): string =>
	{
		let paddingLeft = "0";
		let paddingRight = "0";
		let paddingTop = "0";
		let paddingBottom = "0";

		if (!isNullOrUndefined(this.paddingLeftPixels))
		{
			paddingLeft = `${this.paddingLeftPixels}px`;
		}
		if (!isNullOrUndefined(this.paddingRightPixels))
		{
			paddingRight = `${this.paddingRightPixels}px`;
		}
		if (!isNullOrUndefined(this.paddingTopPixels))
		{
			paddingTop = `${this.paddingTopPixels}px`;
		}
		if (!isNullOrUndefined(this.paddingBottomPixels))
		{
			paddingBottom = `${this.paddingBottomPixels}px`;
		}

		return `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`;
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

	getPositionString = (): string =>
	{
		return Position[this.position];
	};

	getBottomString = (): string =>
	{
		if(!isNullOrUndefined(this.bottomPixels))
		{
			return `${this.bottomPixels}px`;
		}
		if(!isNullOrUndefined(this.bottomPercentage))
		{
			return `${this.bottomPercentage}%`;
		}
		return 'auto';
	};

	getLeftString = (): string => 
	{
		if (isNullOrUndefined(this.leftPixels))
		{
			return 'auto';
		}
		else
		{
			return `${this.leftPixels}px`;
		}
	}

	getRightString = (): string => 
	{
		if (isNullOrUndefined(this.rightPixels))
		{
			return 'auto';
		}
		else
		{
			return `${this.rightPixels}px`;
		}
	}

	getTopString = (): string => 
	{
		if(!isNullOrUndefined(this.topPixels))
		{
			return `${this.topPixels}px`;
		}
		if(!isNullOrUndefined(this.topPercentage))
		{
			return `${this.topPercentage}%`;
		}
		return 'auto';
	}
}