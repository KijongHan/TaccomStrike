import * as React from "react";
import { ButtonComponent, ButtonComponentStyle } from "./button";

import styled from "styled-components";
import { CardComponent, CardComponentStyle, CardOrientation, CardTiltAnimation } from "./card";
import { debug } from "util";
import { LabelledInputComponent, LabelledInputComponentStyle } from "./labelledinput";

export class LoginComponentProps
{
	loginComponentStyle: LoginComponentStyle
}

export class LoginComponentState
{
	loginComponentStyle: LoginComponentStyle
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
			loginComponentStyle: props.loginComponentStyle
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
						buttonClickHandler={this.userButtonClickHandler}
						buttonComponentStyle={this.state.loginComponentStyle.guestButtonComponentStyle} />
				</ButtonsPanel>
				<LabelledInputComponent
					initialValue={""}
					labelValue={"Username"}
					componentStyle={this.state.loginComponentStyle.usernameLabelledInputStyle} />
				<LabelledInputComponent
					initialValue={""}
					labelValue={"Password"}
					componentStyle={this.state.loginComponentStyle.usernameLabelledInputStyle} />
				<ButtonComponent
					buttonText="Login"
					buttonClickHandler={this.loginButtonClickHandler}
					buttonComponentStyle={this.state.loginComponentStyle.loginButtonComponentStyle} />
			</LoginComponentElement>);

		let tiltAnimation = new CardTiltAnimation();
		tiltAnimation.tiltAngle = 20;
		tiltAnimation.tiltDelay = 0;
		tiltAnimation.tiltDuration = 0.7;
		return (
			<CardComponent
				panel={loginComponent}
				cardStyling={this.state.loginComponentStyle.cardComponentStyle}
				cardOrientation={CardOrientation.Front}
				flipAnimation={null}
				tiltAnimation={tiltAnimation}>
			</CardComponent>
		);
	}

	userButtonClickHandler = () =>
	{

	}

	loginButtonClickHandler = () =>
	{

	}

	componentDidUpdate(prevProps: LoginComponentProps, prevState: LoginComponentState)
	{
		if (this.props.loginComponentStyle !== prevProps.loginComponentStyle)
		{
			this.setState({ loginComponentStyle: this.props.loginComponentStyle });
		}
	}
}