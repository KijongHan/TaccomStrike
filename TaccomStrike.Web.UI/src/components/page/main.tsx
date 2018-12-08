import * as React from "react";
import { BasePageComponent, BasePageComponentProps, BasePageComponentState } from "./base";
import { ConnectionsService } from "../../services/connections";

export interface MainPageComponentProps extends BasePageComponentProps {}

export class MainPageComponentState extends BasePageComponentState {}

export class MainPageComponent extends BasePageComponent<MainPageComponentProps, MainPageComponentState> 
{
	constructor(props: MainPageComponentProps) 
	{
		super(props);
		ConnectionsService
			.initializeConnections()
			.then(() => {
				console.log("Connection Succeeded");
			})
			.catch(() => {
				console.log("Connection Failed");
			});
	}

    render() 
    {
        return (<div>HI</div>);
    }

    onResizeLarge = () =>  
	{
	}

	onResizeMedium = () =>  
	{
	}

	onResizeSmall = () =>  
	{
	}

	onResizeVerySmall= () =>  
	{
	}
}