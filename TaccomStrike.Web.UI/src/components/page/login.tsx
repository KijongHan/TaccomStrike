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
import { UserLoginsService } from "../../services/rest/userlogins";
import { MessageDialogComponent } from "../general/msgdialog";
import { NavbarComponent } from "../general/navbar";
import { FooterComponent } from "../general/footer";

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

	usernameValidated: boolean;
	emailValidated: boolean;
	passwordValidated: boolean;

	loginRequestFailed: boolean;
}

export class LoginPageComponent extends BasePageComponent<LoginPageComponentProps, LoginPageComponentState>
{
	constructor(props: LoginPageComponentProps)
	{
		super(props);
		this.state =
		{
			pageStyle: new LoginPageStyle().large(),
			useMobileStyle: false,

			createUser: new CreateUserLogin(),
			userLogin: new PostUserLogin(),
			guestLogin: new PostGuestLogin(),

			usernameValidated: false,
			emailValidated: false,
			passwordValidated: false,

			loginRequestFailed: null
		};
		GameConnectionsService.deinitializeGameConnections();
		GameConnectionsService.removeHandlers();
		ChatConnectionsService.deinitializeChatConnections();

		this.usernameInputValidation = this.usernameInputValidation.bind(this);
		this.emailInputValidation = this.emailInputValidation.bind(this);
		this.passwordInputValidation = this.passwordInputValidation.bind(this);
	}

	render()
	{
		let loginPageStyle = this.state.pageStyle as LoginPageStyle;
		let titleWords = ["Call", "Cheat"];
		let titlePanelStylings = [loginPageStyle.callTitlePanelStyle, loginPageStyle.cheatTitlePanelStyle];

		let registerButtonEnabled = false;
		if(this.state.usernameValidated && this.state.emailValidated && this.state.passwordValidated
		&& this.state.createUser.username.length>0 && this.state.createUser.email.length>0 && this.state.createUser.password.length>0) 
		{
			registerButtonEnabled = true;
		}

		let messageDialog: JSX.Element;
		if(this.state.loginRequestFailed) 
		{
			messageDialog = (
				<MessageDialogComponent
					message="Login failed. Username password combination is incorrect"
					okayButtonClickHandler={this.messageDialogOkayButtonClickHandler}>
				</MessageDialogComponent>
			);
		}
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
						registerButtonEnabled={registerButtonEnabled}
						createUser={this.state.createUser}
						registerComponentStyle={loginPageStyle.registerComponentStyle}
						usernameInputValidation={this.usernameInputValidation}
						usernameInputValidationWait={200}
						emailInputValidation={this.emailInputValidation}
						emailInputValidationWait={200}
						passwordInputValidation={this.passwordInputValidation}
						passwordInputValidationWait={200}
						confirmPasswordInputValidation={null}
						confirmPasswordInputValidationWait={null}
						usernameInputOnChangeHandler={this.registerUsernameInputOnChangeHandler}
						emailInputOnChangeHandler={this.registerEmailInputOnChangeHandler}
						passwordInputOnChangeHandler={this.registerPasswordInputOnChangeHandler}
						confirmPasswordInputOnChangeHandler={this.registerConfirmPasswordInputOnChangeHandler}
						registerButtonClickHandler={this.registerButtonClickHandler}>
					</RegisterComponent>
				</PanelsContainer>
				<FooterComponent/>
				
				<NavbarComponent
					history={this.props.history}
                    navbarComponentStyle={loginPageStyle.navbarComponentStyle}
                    playNavbarItemStyle={loginPageStyle.playNavbarItemStyle}
                    communityNavbarItemStyle={loginPageStyle.communityNavbarItemStyle}
                    newsNavbarItemStyle={loginPageStyle.newsNavbarItemStyle}>
                </NavbarComponent>
				{messageDialog}
			</LoginPage>
		);
	}

	messageDialogOkayButtonClickHandler = () => 
	{
		this.setState({
			loginRequestFailed: null
		});
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
				this.setState({
					loginRequestFailed: null
				})
			})
			.catch(() => {
				this.setState({
					loginRequestFailed: true
				});
			});
	}

	guestLoginButtonClickHandler = () => 
	{
		
	}

	registerButtonClickHandler = () => 
	{
		UserLoginsService.createUserLogin(this.state.createUser)
			.then((value: GetUser) => {
				let userLogin = Object.assign({}, this.state.userLogin);
				userLogin.username = value.username;
				userLogin.password = this.state.createUser.password;

				this.setState({
					userLogin: userLogin,
					createUser: new CreateUserLogin()
				});
			})
			.catch((reason: any) => {
				prompt("Register failed: " + reason);
			});
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

	async usernameInputValidation() 
	{
		let invalidCharacter = /\W/.test(this.state.createUser.username);
		if(invalidCharacter) 
		{
			this.setState({usernameValidated: false});
			return new InputValidationResult(false, "Only letters [a-z] numbers [1-9] or underscore [_]");
		}
		if(this.state.createUser.username.length<4 || this.state.createUser.username.length>20) 
		{
			this.setState({usernameValidated: false});
			return new InputValidationResult(false, "Username must be between 5 and 20");
		}

		let users = await UserLoginsService.getUsers(this.state.createUser.username, null);
		if(users.length>0) 
		{
			this.setState({usernameValidated: false});
			return new InputValidationResult(false, "Username already exists");
		}
		this.setState({usernameValidated: true});
		return new InputValidationResult(true, "Username okay to use");
	}

	async emailInputValidation() 
	{
		let users = await UserLoginsService.getUsers(null, this.state.createUser.email);
		if(users.length>0) 
		{
			this.setState({emailValidated: false});
			return new InputValidationResult(false, "Email already exists");
		}
		this.setState({emailValidated: true});
		return new InputValidationResult(true, "Email okay to use");
	}

	async passwordInputValidation() 
	{
		if(this.state.createUser.password.length<8) 
		{
			this.setState({passwordValidated: false});
			return new InputValidationResult(false, "Must be at least 8 characters");
		}
		this.setState({passwordValidated: true});
		return new InputValidationResult(true, "Password okay to use");
	}
}