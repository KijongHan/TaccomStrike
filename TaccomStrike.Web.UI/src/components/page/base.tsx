import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

export interface BasePageComponentProps extends RouteComponentProps {}

export class BasePageComponentState {}

export abstract class BasePageComponent<P extends BasePageComponentProps, S extends BasePageComponentState> extends React.Component<P, S> 
{
    constructor(props: P) 
    {
        super(props);
    }

    componentDidMount()
	{
		window.addEventListener('resize', this.throttledResizeEventHandler);
		this.resizeEventHandler();
	}

	componentWillUnmount()
	{
		window.removeEventListener('resize', this.throttledResizeEventHandler);
	}

	throttledResizeEventHandler = () =>
	{
		this.throttledEventHandler(this.resizeEventHandler);
	}

	throttledEventHandler = (eventHandler: ()=>void) =>
	{
		let resizeTimeout;
		if (!resizeTimeout)
		{
			resizeTimeout = setTimeout(() =>
			{
				resizeTimeout = null;
				eventHandler();
			}, 500);
		}
    }
    
    resizeEventHandler = () =>
	{
		let w = window.innerWidth;

		if (w > 1100)
		{
			this.onResizeLarge();
		}
		else if (w > 900)
		{
			this.onResizeMedium();
		}
		else if (w > 700)
		{
			this.onResizeSmall();
		}
		else
		{
			this.onResizeVerySmall();
		}
	}

	abstract onResizeLarge: () => void

	abstract onResizeMedium: () => void

	abstract onResizeSmall: () => void

	abstract onResizeVerySmall: () => void
}