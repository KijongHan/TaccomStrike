import * as React from "react";
import { ButtonComponent, ButtonComponentStyle } from "./button";

import styled from "styled-components";
import { CardComponent, CardComponentStyle, CardRotationAnimation } from "./card";
import { ComboButtonComponent, ComboButtonItem, ComboButtonComponentStyle } from "./combobutton";
import { LabelledInputComponentStyle, LabelledInputComponent, InputValidationResult } from "./labelledinput";
import { ColorStyle } from "../../styles/colorstyle";
import { CreateUserLogin } from "../../models/rest/createuserlogin";

const FacebookIcon = require("../../res/facebook_icon.png");
const TwitterIcon = require("../../res/twitter_icon.png");
const RedditIcon = require("../../res/reddit_icon.png");
const YoutubeIcon = require("../../res/youtube_icon.png");

export class RegisterComponentProps
{
	registerComponentStyle: RegisterComponentStyle;
	createUser: CreateUserLogin;
	registerButtonEnabled: boolean;

	usernameInputValidation: () => Promise<InputValidationResult>;
	usernameInputValidationWait: number;
	emailInputValidation: () => Promise<InputValidationResult>;
	emailInputValidationWait: number;
	passwordInputValidation: () => Promise<InputValidationResult>;
	passwordInputValidationWait: number;
	confirmPasswordInputValidation: () => Promise<InputValidationResult>;
	confirmPasswordInputValidationWait: number;

	usernameInputOnChangeHandler: (input: string) => void;
	emailInputOnChangeHandler: (input: string) => void;
	passwordInputOnChangeHandler: (input: string) => void;
	confirmPasswordInputOnChangeHandler: (input: string) => void;
	registerButtonClickHandler: () => void;
}

export class RegisterComponentState 
{
	userGuestComboButton: ComboButtonItem[];
	flipAnimation: CardRotationAnimation;
}

export class RegisterComponentStyle
{
	cardComponentStyle: CardComponentStyle;

	usernameLabelledInputStyle: LabelledInputComponentStyle;
	emailLabelledInputStyle: LabelledInputComponentStyle;
	passwordLabelledInputStyle: LabelledInputComponentStyle;
	confirmPasswordLabelledInputStyle: LabelledInputComponentStyle;

	registerDashboardComboButtonComponentStyle: ComboButtonComponentStyle;
	registerButtonComponentStyle: ButtonComponentStyle;
}

const RegisterComponentElement = styled.div`
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

export class RegisterComponent extends React.Component<RegisterComponentProps, RegisterComponentState>
{
	constructor(props: RegisterComponentProps)
	{
		super(props);
		this.state = {
			userGuestComboButton: [
				new ComboButtonItem("Dashboard", true, this.dashboardButtonClickHandler),
				new ComboButtonItem("Register", false, this.registerButtonClickHandler)
			],
			flipAnimation: null
		}
	}

	render()
	{
		let registerComponent = this.getUserRegisterComponent();
		let dashboardComponent = this.getDashboardComponent();

		return (
			<CardComponent
				front={dashboardComponent}
				back={registerComponent}
				cardStyle={this.props.registerComponentStyle.cardComponentStyle}
				rotationAnimation={this.state.flipAnimation}>
			</CardComponent>
		);
	}

	getDashboardComponent = () => 
	{
		return (
			<RegisterComponentElement>
				<ComboButtonComponent
					comboButtons={this.state.userGuestComboButton}
					comboButtonComponentStyle={this.props.registerComponentStyle.registerDashboardComboButtonComponentStyle}>
				</ComboButtonComponent>
				
			</RegisterComponentElement>
		);
	}

	getUserRegisterComponent = () => 
	{
		return (
			<RegisterComponentElement>
				<ComboButtonComponent
					comboButtons={this.state.userGuestComboButton}
					comboButtonComponentStyle={this.props.registerComponentStyle.registerDashboardComboButtonComponentStyle}>
				</ComboButtonComponent>
				<LabelledInputComponent
					inputValue={this.props.createUser.username}
					labelValue={"Username"}
					inputValidation={this.props.usernameInputValidation}
					validationWait={this.props.usernameInputValidationWait}
					inputOnChangeHandler={this.usernameOnChangeHandler}
					componentStyle={this.props.registerComponentStyle.usernameLabelledInputStyle} />
				<LabelledInputComponent
					inputValue={this.props.createUser.email}
					labelValue={"Email"}
					inputValidation={this.props.emailInputValidation}
					validationWait={this.props.emailInputValidationWait}
					inputOnChangeHandler={this.emailOnChangeHandler}
					componentStyle={this.props.registerComponentStyle.emailLabelledInputStyle} />
				<LabelledInputComponent
					inputType={"password"}
					inputValue={this.props.createUser.password}
					labelValue={"Password"}
					inputValidation={this.props.passwordInputValidation}
					validationWait={this.props.passwordInputValidationWait}
					inputOnChangeHandler={this.passwordOnChangeHandler}
					componentStyle={this.props.registerComponentStyle.passwordLabelledInputStyle} />
				<ButtonComponent
					enabled={!this.props.registerButtonEnabled}
					buttonText="Register"
					buttonClickHandler={this.props.registerButtonClickHandler}
					buttonComponentStyle={this.props.registerComponentStyle.registerButtonComponentStyle} />
			</RegisterComponentElement>
		);
	}

	registerButtonClickHandler= () =>  
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
				new ComboButtonItem("Dashboard", false, this.dashboardButtonClickHandler),
				new ComboButtonItem("Register", true, this.registerButtonClickHandler)
			]
		});
	}

	dashboardButtonClickHandler= () => 
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
				new ComboButtonItem("Dashboard", true, this.dashboardButtonClickHandler),
				new ComboButtonItem("Register", false, this.registerButtonClickHandler)
			]
		});
	}

	usernameOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => 
	{
		this.props.usernameInputOnChangeHandler(event.target.value);
	}

	emailOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => 
	{
		this.props.emailInputOnChangeHandler(event.target.value);
	}

	passwordOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => 
	{
		this.props.passwordInputOnChangeHandler(event.target.value);
	}
}