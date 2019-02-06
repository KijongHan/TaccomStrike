import * as React from "react";
import { ButtonComponent, ButtonComponentStyle } from "./button";

import styled from "styled-components";
import { CardComponent, CardComponentStyle, CardRotationAnimation } from "./card";
import { debug } from "util";
import { LabelledInputComponent, LabelledInputComponentStyle } from "./labelledinput";
import { PostUserLogin } from "../../models/rest/postuserlogin";
import { ComboButtonComponent, ComboButtonItem, ComboButtonComponentStyle } from "./combobutton";
import { ColorStyle } from "../../styles/colorstyle";

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

	userGuestComboButtonComponentStyle: ComboButtonComponentStyle;
	loginButtonComponentStyle: ButtonComponentStyle;

	usernameLabelledInputStyle: LabelledInputComponentStyle;
	passwordLabelledInputStyle: LabelledInputComponentStyle;
}

const LoginComponentElement = styled.div`
	height: 100%;
	width: 100%;
	background-color: ${ColorStyle.pallet3};
	-webkit-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	-moz-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
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
		let comboButtons = [
			new ComboButtonItem("User", true, this.userButtonClickHandler),
			new ComboButtonItem("Guest", false, this.guestButtonClickHandler)
		];
		let loginComponent = (
			<LoginComponentElement>
				<ComboButtonComponent
					comboButtons={comboButtons}
					comboButtonComponentStyle={this.props.loginComponentStyle.userGuestComboButtonComponentStyle}>
				</ComboButtonComponent>
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

		let flipAnimation = new CardRotationAnimation();
		flipAnimation.rotationDelay = 0;
		flipAnimation.rotationDuration = 2000;
		flipAnimation.rotationTo = 0;
		return (
			<CardComponent
				front={loginComponent}
				cardStyle={this.props.loginComponentStyle.cardComponentStyle}
				rotationAnimation={null}>
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