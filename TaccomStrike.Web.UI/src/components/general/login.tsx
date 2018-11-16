import * as React from "react";
import { ButtonComponent, ButtonComponentStyling } from "./button";

import styled from "styled-components";
import { CardComponent, CardComponentStyling, CardOrientation } from "./card";
import { debug } from "util";

export interface LoginComponentProps
{
	loginComponentStyling: LoginComponentStyling
}

export interface LoginComponentState
{
	loginComponentStyling: LoginComponentStyling
}

export interface LoginComponentStyling
{
	cardComponentStyling: CardComponentStyling;
	loginAsUserButtonComponentStyling: ButtonComponentStyling;
	loginAsGuestButtonComponentStyling: ButtonComponentStyling;
}

const LoginComponentElement = styled.div`
	height: 100%;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.88);
`;

export class LoginComponent extends React.Component<LoginComponentProps, LoginComponentState>
{
	constructor(props: LoginComponentProps)
	{
		super(props);
		this.state =
		{
			loginComponentStyling: props.loginComponentStyling
		};
	}

	render()
	{
		let loginComponent = (
			<LoginComponentElement>
				<ButtonComponent
					buttonText="Login As User"
					buttonClickHandler={this.loginAsUserButtonClickHandler}
					buttonComponentStyling={this.state.loginComponentStyling.loginAsUserButtonComponentStyling} />
				<ButtonComponent
					buttonText="Login As Guest"
					buttonClickHandler={this.loginAsUserButtonClickHandler}
					buttonComponentStyling={this.state.loginComponentStyling.loginAsGuestButtonComponentStyling} />
			</LoginComponentElement>);
		return (
			<CardComponent
				panel={loginComponent}
				cardStyling={this.state.loginComponentStyling.cardComponentStyling}
				cardOrientation={CardOrientation.Front}>
			</CardComponent>
			);
	}

	loginAsUserButtonClickHandler = () =>
	{
		console.log("login");
	}

	componentDidUpdate(prevProps: LoginComponentProps, prevState: LoginComponentState)
	{
		if (this.props.loginComponentStyling !== prevProps.loginComponentStyling)
		{
			this.setState({ loginComponentStyling: this.props.loginComponentStyling });
		}
	}
}