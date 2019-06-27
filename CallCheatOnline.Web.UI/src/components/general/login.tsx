import * as React from "react";
import { ButtonComponent, ButtonComponentStyle } from "./button";

import styled from "styled-components";
import { CardComponent, CardComponentStyle, CardRotationAnimation } from "./card";
import { debug } from "util";
import { LabelledInputComponent, LabelledInputComponentStyle } from "./labelledinput";
import { PostUserLogin } from "../../models/rest/postuserlogin";
import { ComboButtonComponent, ComboButtonItem, ComboButtonComponentStyle } from "./combobutton";
import { ColorStyle } from "../../styles/colorstyle";
import { PostGuestLogin } from "../../models/rest/postguestlogin";
import { LoginPageComponentState } from "../page/login";

export class LoginComponentProps
{
	loginComponentStyle: LoginComponentStyle
	userLogin: PostUserLogin;
	guestLogin: PostGuestLogin;

	userLoginButtonClickHandler: () => void;
	guestLoginButtonClickHandler: () => void;

	guestnameInputOnChangeHandler: (input: string) => void;
	usernameInputOnChangeHandler: (input: string) => void;
	passwordInputOnChangeHandler: (input: string) => void;
}

export class LoginComponentState 
{
	userGuestComboButton: ComboButtonItem[];
	flipAnimation: CardRotationAnimation;
}

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
	padding-top: 2px;

	border-style: solid;
	border-width: 2px;
	border-color: rgba(0, 0, 0, 0.1);
`;

export class LoginComponent extends React.Component<LoginComponentProps, LoginComponentState>
{
	constructor(props: LoginComponentProps)
	{
		super(props);
		this.state = {
			userGuestComboButton: [
				new ComboButtonItem("User", true, this.userButtonClickHandler),
				new ComboButtonItem("Guest", false, this.guestButtonClickHandler)
			],
			flipAnimation: null
		}
	}

	render()
	{
		let loginComponent = this.getUserLoginComponent();
		let guestComponent = this.getGuestLoginComponent();
		
		return (
			<CardComponent
				front={loginComponent}
				back={guestComponent}
				cardStyle={this.props.loginComponentStyle.cardComponentStyle}
				rotationAnimation={this.state.flipAnimation}>
			</CardComponent>
		);
	}

	getUserLoginComponent = () => 
	{
		return (
			<LoginComponentElement>
				<ComboButtonComponent
					comboButtons={this.state.userGuestComboButton}
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
					buttonClickHandler={this.props.userLoginButtonClickHandler}
					buttonComponentStyle={this.props.loginComponentStyle.loginButtonComponentStyle} />
			</LoginComponentElement>
		);
	}

	getGuestLoginComponent = () => 
	{
		return (
			<LoginComponentElement>
				<ComboButtonComponent
					comboButtons={this.state.userGuestComboButton}
					comboButtonComponentStyle={this.props.loginComponentStyle.userGuestComboButtonComponentStyle}>
				</ComboButtonComponent>
				<LabelledInputComponent
					inputValue={this.props.guestLogin.guestname}
					labelValue={"Guestname"}
					inputOnChangeHandler={this.guestnameInputOnChangeHandler}
					componentStyle={this.props.loginComponentStyle.usernameLabelledInputStyle} />
				<ButtonComponent
					buttonText="Login"
					buttonClickHandler={this.props.guestLoginButtonClickHandler}
					buttonComponentStyle={this.props.loginComponentStyle.loginButtonComponentStyle} />
			</LoginComponentElement>
		);
	}

	guestnameInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
	{
		this.props.guestnameInputOnChangeHandler(event.target.value);
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
		this.setState({
			flipAnimation: new CardRotationAnimation({
				rotationDelay: 0,
				rotationDirection: 1,
				rotationDuration: 1000,
				rotationFrom: 0,
				rotationTo: 180
			}),
			userGuestComboButton: [
				new ComboButtonItem("User", false, this.userButtonClickHandler),
				new ComboButtonItem("Guest", true, this.guestButtonClickHandler)
			]
		});
	}

	userButtonClickHandler= () => 
	{
		this.setState({
			flipAnimation: new CardRotationAnimation({
				rotationDelay: 0,
				rotationDirection: 1,
				rotationDuration: 1000,
				rotationFrom: 180,
				rotationTo: 359.9
			}),
			userGuestComboButton: [
				new ComboButtonItem("User", true, this.userButtonClickHandler),
				new ComboButtonItem("Guest", false, this.guestButtonClickHandler)
			]
		});
	}
}