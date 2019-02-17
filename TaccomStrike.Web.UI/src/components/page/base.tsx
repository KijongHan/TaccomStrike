import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { BasePageStyle } from "../pagestyles/base";
import { isNullOrUndefined } from "util";
import { GetGameState } from "../../models/rest/getgamestate";
import { GetGameLobby } from "../../models/rest/getgamelobby";
import { GetUser } from "../../models/rest/getuser";

export interface BasePageComponentProps extends RouteComponentProps 
{
	loggedInUser: GetUser;
}

export class BasePageComponentState 
{
	pageStyle: BasePageStyle;	
}

export abstract class BasePageComponent<P extends BasePageComponentProps, S extends BasePageComponentState> extends React.Component<P, S> 
{
    constructor(props: P) 
    {
		super(props);
    }

    componentDidMount()
	{
		if(typeof isNullOrUndefined(screen.orientation)) 
		{
			window.addEventListener('resize', this.throttledResizeEventHandler);
		}
		else 
		{
			window.addEventListener('orientationchange', this.throttledResizeEventHandler);
		}
		
		this.resizeEventHandler();
	}

	componentWillUnmount()
	{
		if(typeof isNullOrUndefined(screen.orientation)) 
		{
			window.removeEventListener('resize', this.throttledResizeEventHandler);
		}
		else 
		{
			window.removeEventListener('orientationchange', this.throttledResizeEventHandler);
		}
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
		if(isNullOrUndefined(this.state) || isNullOrUndefined(this.state.pageStyle)) 
		{
			return;
		}

		if (w > 1100 && this.state.pageStyle!==this.state.pageStyle.large())
		{
			this.setState({pageStyle: this.state.pageStyle.large()});
			this.onResizeLarge();
		}
		else if (w > 900 && this.state.pageStyle!==this.state.pageStyle.medium())
		{
			this.setState({pageStyle: this.state.pageStyle.medium()});
			this.onResizeMedium();
		}
		else if (w > 700 && this.state.pageStyle!==this.state.pageStyle.small())
		{
			this.setState({pageStyle: this.state.pageStyle.small()});
			this.onResizeSmall();
		}
		else if(this.state.pageStyle!==this.state.pageStyle.verysmall())
		{
			this.setState({pageStyle: this.state.pageStyle.verysmall()});
			this.onResizeVerySmall();
		}
	}

	onResizeLarge() {}

	onResizeMedium() {}

	onResizeSmall() {}

	onResizeVerySmall() {}
}