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

const LoginPage = styled.div`
	height: 100%;
	font-family: 'Cormorant Upright', serif;
`;

const PanelsContainer = styled.div`
	overflow: auto;
	padding-top: 10px;
	padding-bottom: 50px;
`;

export interface LoginPageComponentProps extends BasePageComponentProps { }

export interface LoginPageComponentState extends BasePageComponentState
{
	userLogin: PostUserLogin;
}

export class LoginPageComponent extends BasePageComponent<LoginPageComponentProps, LoginPageComponentState>
{
	constructor(props: LoginPageComponentProps)
	{
		super(props);
		this.state =
		{
			pageStyle: new LoginPageStyle().large(),
			userLogin: new PostUserLogin()
		};
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
						userLogin={this.state.userLogin}
						loginComponentStyle={loginPageStyle.loginComponentStyle}
						userLoginButtonClickHandler={this.userLoginButtonClickHandler}
						guestLoginButtonClickHandler={this.guestLoginButtonClickHandler}
						usernameInputOnChangeHandler={this.usernameInputOnChangeHandler}
						passwordInputOnChangeHandler={this.passwordInputOnChangeHandler}>
					</LoginComponent>
					<RegisterComponent
						registerComponentStyle={loginPageStyle.registerComponentStyle}>
					</RegisterComponent>
				</PanelsContainer>
			</LoginPage>
		);
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
			.then((response: Response) => {
				if(response.ok) 
				{
					this.props.history.push("/lobby");
				}
			});
	}

	guestLoginButtonClickHandler = () => 
	{
		
	}
}