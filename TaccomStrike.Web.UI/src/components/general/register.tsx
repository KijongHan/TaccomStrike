import * as React from "react";
import { ButtonComponent, ButtonComponentStyle } from "./button";

import styled from "styled-components";
import { CardComponent, CardComponentStyle, CardRotationAnimation } from "./card";
import { LabelledInputComponentStyle, LabelledInputComponent, InputValidationResult } from "./labelledinput";
import { ColorStyle } from "../../styles/colorstyle";
import { CreateUserLogin } from "../../models/rest/createuserlogin";

export class RegisterComponentProps
{
	registerComponentStyle: RegisterComponentStyle;
	createUser: CreateUserLogin;

	usernameInputValidation: () => InputValidationResult;
	usernameInputValidationWait: number;
	emailInputValidation: () => InputValidationResult;
	emailInputValidationWait: number;
	passwordInputValidation: () => InputValidationResult;
	passwordInputValidationWait: number;
	confirmPasswordInputValidation: () => InputValidationResult;
	confirmPasswordInputValidationWait: number;

	usernameInputOnChangeHandler: (input: string) => void;
	emailInputOnChangeHandler: (input: string) => void;
	passwordInputOnChangeHandler: (input: string) => void;
	confirmPasswordInputOnChangeHandler: (input: string) => void;
}

export class RegisterComponentState {}

export class RegisterComponentStyle
{
	cardComponentStyle: CardComponentStyle;

	usernameLabelledInputStyle: LabelledInputComponentStyle;
	emailLabelledInputStyle: LabelledInputComponentStyle;
	passwordLabelledInputStyle: LabelledInputComponentStyle;
	confirmPasswordLabelledInputStyle: LabelledInputComponentStyle;

	registerButtonComponentStyle: ButtonComponentStyle;
}

const RegisterComponentElement = styled.div`
	height: 100%;
	width: 100%;
	background-color: ${ColorStyle.pallet3};
	-webkit-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	-moz-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
`;

export class RegisterComponent extends React.Component<RegisterComponentProps, RegisterComponentState>
{
	constructor(props: RegisterComponentProps)
	{
		super(props);
	}

	render()
	{
		let registerComponent = (
			<RegisterComponentElement>
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
					inputValue={this.props.createUser.password}
					labelValue={"Password"}
					inputValidation={this.props.passwordInputValidation}
					validationWait={this.props.passwordInputValidationWait}
					inputOnChangeHandler={this.passwordOnChangeHandler}
					componentStyle={this.props.registerComponentStyle.passwordLabelledInputStyle} />
				<LabelledInputComponent
					inputValue={this.props.createUser.confirmPassword}
					labelValue={"Confirm Password"}
					inputValidation={this.props.confirmPasswordInputValidation}
					validationWait={this.props.confirmPasswordInputValidationWait}
					inputOnChangeHandler={this.confirmPasswordOnChangeHandler}
					componentStyle={this.props.registerComponentStyle.confirmPasswordLabelledInputStyle} />
				<ButtonComponent
					buttonText="Register"
					buttonClickHandler={this.registerButtonClickHandler}
					buttonComponentStyle={this.props.registerComponentStyle.registerButtonComponentStyle} />
			</RegisterComponentElement>);

		let flipAnimation = new CardRotationAnimation();
		flipAnimation.rotationDelay = 0;
		flipAnimation.rotationDuration = 2;
		return (
			<CardComponent
				front={registerComponent}
				cardStyle={this.props.registerComponentStyle.cardComponentStyle}
				rotationAnimation={null}>
			</CardComponent>
		);
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

	confirmPasswordOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => 
	{
		this.props.confirmPasswordInputOnChangeHandler(event.target.value);
	}

	registerButtonClickHandler = () =>
	{

	};
}