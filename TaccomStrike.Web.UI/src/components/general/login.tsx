import * as React from "react";
import { ButtonComponent, ButtonComponentStyle } from "./button";

import styled from "styled-components";
import { CardComponent, CardComponentStyle, CardOrientation, CardTiltAnimation } from "./card";
import { debug } from "util";
import { LabelledInputComponent, LabelledInputComponentStyle } from "./labelledinput";
import { UserLogin } from "../../viewmodels/userlogin";

export class LoginComponentProps
{
	loginComponentStyle: LoginComponentStyle

	userLogin: UserLogin;

	userLoginButtonClickHandler: () => void;
	guestLoginButtonClickHandler: () => void;

	usernameInputOnChangeHandler: (input: string) => void;
	passwordInputOnChangeHandler: (input: string) => void;
}

export class LoginComponentState
{
	loginComponentStyle: LoginComponentStyle

	userLogin: UserLogin;
}

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
`;

export class LoginComponent extends React.Component<LoginComponentProps, LoginComponentState>
{
	constructor(props: LoginComponentProps)
	{
		super(props);
		this.state =
		{
			loginComponentStyle: props.loginComponentStyle,
			userLogin: props.userLogin
		};
	}

	render()
	{
		let loginComponent = (
			<LoginComponentElement>
				<ButtonsPanel>
					<ButtonComponent
						buttonText="User"
						buttonClickHandler={this.userButtonClickHandler}
						buttonComponentStyle={this.state.loginComponentStyle.userButtonComponentStyle} />
					<ButtonComponent
						buttonText="Guest"
						buttonClickHandler={this.guestButtonClickHandler}
						buttonComponentStyle={this.state.loginComponentStyle.guestButtonComponentStyle} />
				</ButtonsPanel>
				<LabelledInputComponent
					inputValue={this.state.userLogin.username}
					labelValue={"Username"}
					inputOnChangeHandler={this.usernameInputOnChangeHandler}
					componentStyle={this.state.loginComponentStyle.usernameLabelledInputStyle} />
				<LabelledInputComponent
					inputType={"password"}
					inputValue={this.state.userLogin.password}
					labelValue={"Password"}
					inputOnChangeHandler={this.passwordInputOnChangeHandler}
					componentStyle={this.state.loginComponentStyle.usernameLabelledInputStyle} />
				<ButtonComponent
					buttonText="Login"
					buttonClickHandler={this.userLoginButtonClickHandler}
					buttonComponentStyle={this.state.loginComponentStyle.loginButtonComponentStyle} />
			</LoginComponentElement>);

		let tiltAnimation = new CardTiltAnimation();
		tiltAnimation.tiltAngle = 20;
		tiltAnimation.tiltDelay = 0;
		tiltAnimation.tiltDuration = 0.7;
		return (
			<CardComponent
				panel={loginComponent}
				changeTriggers={[this.state.loginComponentStyle, this.state.userLogin]}
				cardStyle={this.state.loginComponentStyle.cardComponentStyle}
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