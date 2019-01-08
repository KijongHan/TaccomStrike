﻿import * as React from "react";
import { ButtonComponent, ButtonComponentStyle } from "./button";

import styled from "styled-components";
import { CardComponent, CardComponentStyle, CardOrientation, CardTiltAnimation, CardFlipAnimation } from "./card";
import { debug } from "util";
import { LabelledInputComponent, LabelledInputComponentStyle } from "./labelledinput";
import { PostUserLogin } from "../../models/rest/postuserlogin";

export class LoginComponentProps
{
	loginComponentStyle: LoginComponentStyle
	userLogin: PostUserLogin;

	userLoginButtonClickHandler: () => void;
	guestLoginButtonClickHandler: () => void;

	usernameInputOnChangeHandler: (input: string) => void;
	passwordInputOnChangeHandler: (input: string) => void;
}

export class LoginComponentState {}

export class LoginComponentStyle
{
	cardComponentStyle: CardComponentStyle;

	userButtonComponentStyle: ButtonComponentStyle;
	guestButtonComponentStyle: ButtonComponentStyle;
	loginButtonComponentStyle: ButtonComponentStyle;

	usernameLabelledInputStyle: LabelledInputComponentStyle;
	passwordLabelledInputStyle: LabelledInputComponentStyle;
}

const LoginComponentElement = styled.div`
	height: 100%;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.88);
`;

const ButtonsPanel = styled.div`
	overflow: auto;
	padding-top: 2px;
    padding-bottom: 1px;
`;

export class LoginComponent extends React.Component<LoginComponentProps, LoginComponentState>
{
	constructor(props: LoginComponentProps)
	{
		super(props);
	}

	render()
	{
		let loginComponent = (
			<LoginComponentElement>
				<ButtonsPanel>
					<ButtonComponent
						buttonText="User"
						buttonClickHandler={this.userButtonClickHandler}
						buttonComponentStyle={this.props.loginComponentStyle.userButtonComponentStyle} />
					<ButtonComponent
						buttonText="Guest"
						buttonClickHandler={this.guestButtonClickHandler}
						buttonComponentStyle={this.props.loginComponentStyle.guestButtonComponentStyle} />
				</ButtonsPanel>
				<LabelledInputComponent
					inputValue={this.props.userLogin.username}
					labelValue={"Username"}
					inputOnChangeHandler={this.usernameInputOnChangeHandler}
					componentStyle={this.props.loginComponentStyle.usernameLabelledInputStyle} />
				<LabelledInputComponent
					inputType={"password"}
					inputValue={this.props.userLogin.password}
					labelValue={"Password"}
					inputOnChangeHandler={this.passwordInputOnChangeHandler}
					componentStyle={this.props.loginComponentStyle.usernameLabelledInputStyle} />
				<ButtonComponent
					buttonText="Login"
					buttonClickHandler={this.userLoginButtonClickHandler}
					buttonComponentStyle={this.props.loginComponentStyle.loginButtonComponentStyle} />
			</LoginComponentElement>);

		let flipAnimation = new CardFlipAnimation();
		flipAnimation.flipDelay = 0;
		flipAnimation.flipDuration = 2;
		let tiltAnimation = new CardTiltAnimation();
		tiltAnimation.tiltAngle = 0;
		tiltAnimation.tiltDelay = 0;
		tiltAnimation.tiltDuration = 0.7;
		return (
			<CardComponent
				panel={loginComponent}
				cardStyle={this.props.loginComponentStyle.cardComponentStyle}
				cardOrientation={CardOrientation.Front}
				flipAnimation={null}
				tiltAnimation={tiltAnimation}>
			</CardComponent>
		);
	}

	userLoginButtonClickHandler = () =>  
	{
		this.props.userLoginButtonClickHandler();
	}

	usernameInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
	{
		this.props.usernameInputOnChangeHandler(event.target.value);
	}

	passwordInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
	{
		this.props.passwordInputOnChangeHandler(event.target.value);
	}

	guestButtonClickHandler= () =>  
	{

	}

	userButtonClickHandler= () => 
	{

	}

	componentDidUpdate(prevProps: LoginComponentProps, prevState: LoginComponentState)
	{
		if (this.props.loginComponentStyle !== prevProps.loginComponentStyle)
		{
			this.setState({ loginComponentStyle: this.props.loginComponentStyle });
		}
		if(this.props.userLogin !== prevProps.userLogin) 
		{
			this.setState({ userLogin: this.props.userLogin });
		}
	}
}