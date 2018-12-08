import * as React from "react";
import { BasePageComponent, BasePageComponentProps, BasePageComponentState } from "./base";

export interface MainPageComponentProps extends BasePageComponentProps {}

export class MainPageComponentState extends BasePageComponentState {}

export class MainPageComponent extends BasePageComponent<MainPageComponentProps, MainPageComponentState> 
{
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