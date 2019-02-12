import * as React from "react";
import { TitlePanelStyle } from "../general/titlepanel";
import { LoginComponent, LoginComponentStyle } from "../general/login";

import styled from "styled-components";
import { TitlePanelsStyle, TitlePanelsComponent } from "../general/titlepanels";
import { DisplayStyle, Position } from "../../styles/displaystyle";
import { RegisterComponentStyle, RegisterComponent } from "../general/register";
import { BasePageComponentProps, BasePageComponent, BasePageComponentState } from "./base";
import { PostUserLogin } from "../../models/rest/postuserlogin";
import { AuthenticationService } from "../../services/rest/authentication";
import { LoginPageStyle } from "../pagestyles/login";
import { GetUser } from "../../models/rest/getuser";
import { ChatConnectionsService } from "../../services/hub/chatconnections";
import { GameConnectionsService } from "../../services/hub/gameconnections";
import { PostGuestLogin } from "../../models/rest/postguestlogin";
import { CreateUserLogin } from "../../models/rest/createuserlogin";
import { InputValidationResult } from "../general/labelledinput";

const LoginPage = styled.div`
	height: 100%;
	font-family: 'Cormorant Upright', serif;
`;

const PanelsContainer = styled.div`
	overflow: auto;
	padding-top: 25px;
	padding-bottom: 50px;
`;

export interface LoginPageComponentProps extends BasePageComponentProps 
{
	userLoggedIn: (user: GetUser) => void;
}

export class LoginPageComponentState extends BasePageComponentState
{
	createUser: CreateUserLogin;
	userLogin: PostUserLogin;
	guestLogin: PostGuestLogin;
}

export class LoginPageComponent extends BasePageComponent<LoginPageComponentProps, LoginPageComponentState>
{
	constructor(props: LoginPageComponentProps)
	{
		super(props);
		this.state =
		{
			pageStyle: new LoginPageStyle().large(),
			createUser: new CreateUserLogin(),
			userLogin: new PostUserLogin(),
			guestLogin: new PostGuestLogin()
		};
		GameConnectionsService.deinitializeGameConnections();
		ChatConnectionsService.deinitializeChatConnections();
	}

	render()
	{
		let loginPageStyle = this.state.pageStyle as LoginPageStyle;
		let titleWords = ["Call", "Cheat"];
		let titlePanelStylings = [loginPageStyle.callTitlePanelStyle, loginPageStyle.cheatTitlePanelStyle];

		return (
			<LoginPage>
				<TitlePanelsComponent
					titleWords={titleWords}
					titlePanelStyles={titlePanelStylings}
					titlePanelsStyle={loginPageStyle.titlePanelsStyle}>
				</TitlePanelsComponent>

				<PanelsContainer>
					<LoginComponent
						guestLogin={this.state.guestLogin}
						userLogin={this.state.userLogin}
						loginComponentStyle={loginPageStyle.loginComponentStyle}
						userLoginButtonClickHandler={this.userLoginButtonClickHandler}
						guestLoginButtonClickHandler={this.guestLoginButtonClickHandler}
						guestnameInputOnChangeHandler={this.guestnameInputOnChangeHandler}
						usernameInputOnChangeHandler={this.usernameInputOnChangeHandler}
						passwordInputOnChangeHandler={this.passwordInputOnChangeHandler}>
					</LoginComponent>
					<RegisterComponent
						createUser={this.state.createUser}
						registerComponentStyle={loginPageStyle.registerComponentStyle}
						usernameInputValidation={this.usernameInputValidation}
						usernameInputValidationWait={1000}
						emailInputValidation={null}
						emailInputValidationWait={null}
						passwordInputValidation={null}
						passwordInputValidationWait={null}
						confirmPasswordInputValidation={null}
						confirmPasswordInputValidationWait={null}
						usernameInputOnChangeHandler={this.registerUsernameInputOnChangeHandler}
						emailInputOnChangeHandler={this.registerEmailInputOnChangeHandler}
						passwordInputOnChangeHandler={this.registerPasswordInputOnChangeHandler}
						confirmPasswordInputOnChangeHandler={this.registerConfirmPasswordInputOnChangeHandler}>
					</RegisterComponent>
				</PanelsContainer>
			</LoginPage>
		);
	}

	guestnameInputOnChangeHandler = (input: string) =>
	{
		let newGuestLogin = Object.assign({}, this.state.guestLogin);
		newGuestLogin.guestname = input;
		this.setState({guestLogin: newGuestLogin});
	}

	usernameInputOnChangeHandler = (input: string) =>
	{
		let newUserLogin = Object.assign({}, this.state.userLogin);
		newUserLogin.username = input;
		this.setState({userLogin: newUserLogin});
	}

	passwordInputOnChangeHandler = (input: string) =>
	{
		let newUserLogin = Object.assign({}, this.state.userLogin);
		newUserLogin.password = input;
		this.setState({userLogin: newUserLogin});
	}

	userLoginButtonClickHandler = () =>
	{
		AuthenticationService
			.userLogin(this.state.userLogin)
			.then((getUser: GetUser) => {
				this.props.userLoggedIn(getUser);
				this.props.history.push("/play");
			});
	}

	guestLoginButtonClickHandler = () => 
	{
		
	}

	registerUsernameInputOnChangeHandler = (input: string) => 
	{
		let newCreateUser = Object.assign({}, this.state.createUser);
		newCreateUser.username = input;
		this.setState({createUser: newCreateUser});
	}

	registerEmailInputOnChangeHandler = (input: string) => 
	{
		let newCreateUser = Object.assign({}, this.state.createUser);
		newCreateUser.email = input;
		this.setState({createUser: newCreateUser});
	}

	registerPasswordInputOnChangeHandler = (input: string) => 
	{
		let newCreateUser = Object.assign({}, this.state.createUser);
		newCreateUser.password = input;
		this.setState({createUser: newCreateUser});
	}

	registerConfirmPasswordInputOnChangeHandler = (input: string) => 
	{
		let newCreateUser = Object.assign({}, this.state.createUser);
		newCreateUser.confirmPassword = input;
		this.setState({createUser: newCreateUser});
	}

	usernameInputValidation = () => 
	{
		let invalidCharacter = /\W/.test(this.state.createUser.username);
		if(invalidCharacter) 
		{
			return new InputValidationResult(false, "Not allowable characters");
		}
		return new InputValidationResult(true, "");
	}
}