import * as React from "react";
import { ButtonComponent, ButtonComponentStyle } from "./button";

import styled from "styled-components";
import { CardComponent, CardComponentStyle, CardTiltAnimation, CardOrientation } from "./card";
import { LabelledInputComponentStyle, LabelledInputComponent } from "./labelledinput";

export interface RegisterComponentProps
{
	registerComponentStyle: RegisterComponentStyle
}

export class RegisterComponentState
{
	registerComponentStyle: RegisterComponentStyle
}

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
		this.state =
		{
			registerComponentStyle: props.registerComponentStyle
		};
	}

	render()
	{
		let registerComponent = (
			<RegisterComponentElement>
				<LabelledInputComponent
					initialValue={""}
					labelValue={"Username"}
					componentStyle={this.state.registerComponentStyle.usernameLabelledInputStyle} />
				<LabelledInputComponent
					initialValue={""}
					labelValue={"Email"}
					componentStyle={this.state.registerComponentStyle.emailLabelledInputStyle} />
				<LabelledInputComponent
					initialValue={""}
					labelValue={"Password"}
					componentStyle={this.state.registerComponentStyle.passwordLabelledInputStyle} />
				<LabelledInputComponent
					initialValue={""}
					labelValue={"Confirm Password"}
					componentStyle={this.state.registerComponentStyle.confirmPasswordLabelledInputStyle} />
				<ButtonComponent
					buttonText="Register"
					buttonClickHandler={this.registerButtonClickHandler}
					buttonComponentStyle={this.state.registerComponentStyle.registerButtonComponentStyle} />
			</RegisterComponentElement>);

		let tiltAnimation = new CardTiltAnimation();
		tiltAnimation.tiltAngle = -20;
		tiltAnimation.tiltDelay = 0;
		tiltAnimation.tiltDuration = 0.7;
		return (
			<CardComponent
				panel={registerComponent}
				cardStyling={this.state.registerComponentStyle.cardComponentStyle}
				cardOrientation={CardOrientation.Front}
				flipAnimation={null}
				tiltAnimation={tiltAnimation}>
			</CardComponent>
		);
	}

	registerButtonClickHandler = () =>
	{

	};

	componentDidUpdate(prevProps: RegisterComponentProps, prevState: RegisterComponentState)
	{
		if (this.props.registerComponentStyle !== prevProps.registerComponentStyle)
		{
			this.setState({ registerComponentStyle: this.props.registerComponentStyle });
		}
	}
}