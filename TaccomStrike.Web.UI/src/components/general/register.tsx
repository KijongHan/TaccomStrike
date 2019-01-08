﻿import * as React from "react";
import { ButtonComponent, ButtonComponentStyle } from "./button";

import styled from "styled-components";
import { CardComponent, CardComponentStyle, CardTiltAnimation, CardOrientation, CardFlipAnimation } from "./card";
import { LabelledInputComponentStyle, LabelledInputComponent } from "./labelledinput";

export interface RegisterComponentProps
{
	registerComponentStyle: RegisterComponentStyle
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
	background-color: rgba(0, 0, 0, 0.88);
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
					inputValue={""}
					labelValue={"Username"}
					inputOnChangeHandler={this.usernameOnChangeHandler}
					componentStyle={this.props.registerComponentStyle.usernameLabelledInputStyle} />
				<LabelledInputComponent
					inputValue={""}
					labelValue={"Email"}
					inputOnChangeHandler={this.emailOnChangeHandler}
					componentStyle={this.props.registerComponentStyle.emailLabelledInputStyle} />
				<LabelledInputComponent
					inputValue={""}
					labelValue={"Password"}
					inputOnChangeHandler={this.passwordOnChangeHandler}
					componentStyle={this.props.registerComponentStyle.passwordLabelledInputStyle} />
				<LabelledInputComponent
					inputValue={""}
					labelValue={"Confirm Password"}
					inputOnChangeHandler={this.confirmPasswordOnChangeHandler}
					componentStyle={this.props.registerComponentStyle.confirmPasswordLabelledInputStyle} />
				<ButtonComponent
					buttonText="Register"
					buttonClickHandler={this.registerButtonClickHandler}
					buttonComponentStyle={this.props.registerComponentStyle.registerButtonComponentStyle} />
			</RegisterComponentElement>);

		let flipAnimation = new CardFlipAnimation();
		flipAnimation.flipDelay = 0;
		flipAnimation.flipDuration = 2;
		let tiltAnimation = new CardTiltAnimation();
		tiltAnimation.tiltAngle = 0;
		tiltAnimation.tiltDelay = 0;
		tiltAnimation.tiltDuration = 0.7;
		return (
			<CardComponent
				panel={registerComponent}
				cardStyle={this.props.registerComponentStyle.cardComponentStyle}
				cardOrientation={CardOrientation.Front}
				flipAnimation={null}
				tiltAnimation={tiltAnimation}>
			</CardComponent>
		);
	}

	usernameOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => 
	{

	}

	emailOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => 
	{

	}

	passwordOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => 
	{

	}

	confirmPasswordOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => 
	{

	}

	registerButtonClickHandler = () =>
	{

	};
}