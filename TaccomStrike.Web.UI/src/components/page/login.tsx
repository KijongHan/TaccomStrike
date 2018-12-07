import * as React from "react";
import { TitlePanelComponent, TitlePanelStyle } from "../general/titlepanel";
import { CardComponentStyle, CardComponent } from "../general/card";
import { LoginComponent, LoginComponentStyle } from "../general/login";
import { withRouter } from "react-router";

import styled from "styled-components";
import { TitlePanelsStyle, TitlePanelsComponent } from "../general/titlepanels";
import { DisplayStyle, Position } from "../../styles/displaystyle";
import { RegisterComponentStyle, RegisterComponent } from "../general/register";
import { BasePageComponentProps, BasePageComponent, BasePageComponentState } from "./base";
import { UserLogin } from "../../viewmodels/userlogin";

export interface LoginPageComponentProps extends BasePageComponentProps { }

export interface LoginPageComponentState extends BasePageComponentState
{
	loginPageStyle: LoginPageStyle;
	userLogin: UserLogin;
}

export interface LoginPageStyle
{
	titlePanelsStyle: TitlePanelsStyle;
	callTitlePanelStyle: TitlePanelStyle;
	cheatTitlePanelStyle: TitlePanelStyle;

	loginComponentStyle: LoginComponentStyle;
	registerComponentStyle: RegisterComponentStyle;
}

const LoginPage = styled.div`
	height: 100%;
	font-family: 'Cormorant Upright', serif;
`;

const PanelsContainer = styled.div`
	overflow: auto;
	padding-top: 25px;
	padding-bottom: 25px;
`;

const largeStyle: LoginPageStyle =
{
	titlePanelsStyle:
	{
		displayStyling: new DisplayStyle({ heightPixels: 170 })
	},

	callTitlePanelStyle:
	{
		displayStyle: new DisplayStyle({
			widthPercentage: 40,
			heightPixels: 170,
			marginLeftPercentage: 1,
			floatLeft: true
		})
	},

	cheatTitlePanelStyle:
	{
		displayStyle: new DisplayStyle({
			widthPercentage: 55,
			heightPixels: 170,
			marginLeftPercentage: 3,
			floatLeft: true
		})
	},

	loginComponentStyle:
	{
		cardComponentStyle:
		{
			displayStyle: new DisplayStyle({
				floatLeft: true,
				widthPercentage: 30,
				heightPixels: 400
			})
		},

		userButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				floatLeft: true,
				widthPercentage: 30,
				heightPixels: 50,
				marginLeftPercentage: 5
			})
		},

		guestButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				floatLeft: true,
				widthPercentage: 30,
				heightPixels: 50,
				marginLeftPercentage: 5
			})
		},

		loginButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 30,
				heightPixels: 50,
				marginLeftPercentage: 5,
				position: Position.absolute,
				bottomPixels: 10
			})
		},

		usernameLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 20
			})
		},

		passwordLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		}
	},

	registerComponentStyle:
	{
		cardComponentStyle:
		{
			displayStyle: new DisplayStyle({
				floatLeft: true,
				widthPercentage: 30,
				heightPixels: 400
			})
		},

		usernameLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5
			})
		},

		emailLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		},

		passwordLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		},

		confirmPasswordLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		},

		registerButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 30,
				heightPixels: 50,
				marginLeftPercentage: 5,
				position: Position.absolute,
				bottomPixels: 10
			})
		}
	}
}

const mediumStyling: LoginPageStyle =
{
	titlePanelsStyle:
	{
		displayStyling: new DisplayStyle({
			heightPixels: 340
		})
	},

	callTitlePanelStyle:
	{
		displayStyle: new DisplayStyle({
			widthPercentage: 90,
			heightPixels: 170,
			marginLeftPercentage: 5,
			floatLeft: true
		})
	},

	cheatTitlePanelStyle:
	{
		displayStyle: new DisplayStyle({
			widthPercentage: 90,
			heightPixels: 170,
			marginLeftPercentage: 5,
			marginTopPixels: 15,
			floatLeft: true
		})
	},

	loginComponentStyle:
	{
		cardComponentStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 40,
				marginLeftPercentage: 5,
				heightPixels: 400
			})
		},

		userButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				floatLeft: true,
				marginLeftPercentage: 5,
				widthPercentage: 45,
				heightPixels: 50
			})
		},

		guestButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				floatLeft: true,
				marginLeftPercentage: 2.5,
				widthPercentage: 45,
				heightPixels: 50
			})
		},

		loginButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 30,
				heightPixels: 50,
				marginLeftPercentage: 5,
				position: Position.absolute,
				bottomPixels: 10
			})
		},

		usernameLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 20
			})
		},

		passwordLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		}
	},

	registerComponentStyle:
	{
		cardComponentStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 30,
				heightPixels: 400
			})
		},

		usernameLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 20
			})
		},

		emailLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		},

		passwordLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		},

		confirmPasswordLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		},

		registerButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 30,
				heightPixels: 50,
				marginLeftPercentage: 5,
				position: Position.absolute,
				bottomPixels: 10
			})
		}
	}
}

const smallStyling: LoginPageStyle =
{
	titlePanelsStyle:
	{
		displayStyling: new DisplayStyle({ heightPixels: 340 })
	},

	callTitlePanelStyle:
	{
		displayStyle: new DisplayStyle({
			widthPercentage: 90,
			heightPixels: 170,
			marginLeftPercentage: 5,
			floatLeft: true
		})
	},

	cheatTitlePanelStyle:
	{
		displayStyle: new DisplayStyle({
			widthPercentage: 90,
			heightPixels: 170,
			marginLeftPercentage: 5,
			floatLeft: true
		})
	},

	loginComponentStyle:
	{
		cardComponentStyle:
		{
			displayStyle: new DisplayStyle({
				floatLeft: true,
				widthPercentage: 45,
				heightPixels: 400
			})
		},

		userButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				floatLeft: true,
				marginLeftPercentage: 5,
				widthPercentage: 45,
				heightPixels: 50
			})
		},

		guestButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				floatLeft: true,
				marginLeftPercentage: 2.5,
				widthPercentage: 45,
				heightPixels: 50
			})
		},

		loginButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 30,
				heightPixels: 50,
				marginLeftPercentage: 5,
				position: Position.absolute,
				bottomPixels: 10
			})
		},

		usernameLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 20
			})
		},

		passwordLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		}
	},

	registerComponentStyle:
	{
		cardComponentStyle:
		{
			displayStyle: new DisplayStyle({
				marginLeftPercentage: 8,
				widthPercentage: 45,
				heightPixels: 400
			})
		},

		usernameLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 20
			})
		},

		emailLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		},

		passwordLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		},

		confirmPasswordLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		},

		registerButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 30,
				heightPixels: 50,
				marginLeftPercentage: 5,
				position: Position.absolute,
				bottomPixels: 10
			})
		}
	}
}

const verySmallStyling: LoginPageStyle =
{
	titlePanelsStyle:
	{
		displayStyling: new DisplayStyle({ heightPixels: 340 })
	},

	callTitlePanelStyle:
	{
		displayStyle: new DisplayStyle({
			widthPercentage: 90,
			heightPixels: 170,
			marginLeftPercentage: 5,
			floatLeft: true
		})
	},

	cheatTitlePanelStyle:
	{
		displayStyle: new DisplayStyle({
			widthPercentage: 90,
			heightPixels: 170,
			marginLeftPercentage: 5,
			floatLeft: true
		})
	},

	loginComponentStyle:
	{
		cardComponentStyle:
		{
			displayStyle: new DisplayStyle({ widthPercentage: 90, heightPixels: 400 })
		},

		userButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				floatLeft: false,
				widthPercentage: 80,
				heightPixels: 50
			})
		},

		guestButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				floatLeft: false,
				widthPercentage: 80,
				heightPixels: 50
			})
		},

		loginButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 30,
				heightPixels: 50,
				marginLeftPercentage: 5
			})
		},

		usernameLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 20
			})
		},

		passwordLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		}
	},

	registerComponentStyle:
	{
		cardComponentStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 30,
				heightPixels: 400
			})
		},

		usernameLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 20
			})
		},

		emailLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		},

		passwordLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		},

		confirmPasswordLabelledInputStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		},

		registerButtonComponentStyle:
		{
			displayStyle: new DisplayStyle({
				widthPercentage: 30,
				heightPixels: 50,
				marginLeftPercentage: 5,
				position: Position.absolute,
				bottomPixels: 10
			})
		}
	}
}

export class LoginPageComponent extends BasePageComponent<LoginPageComponentProps, LoginPageComponentState>
{
	constructor(props: LoginPageComponentProps)
	{
		super(props);
		console.log(props);
		this.state =
		{
			loginPageStyle: largeStyle,
			userLogin: new UserLogin()
		};
	}

	render()
	{
		let titleWords = ["Call", "Cheat"];
		let titlePanelStylings = [this.state.loginPageStyle.callTitlePanelStyle, this.state.loginPageStyle.cheatTitlePanelStyle];

		return (
			<LoginPage>
				<TitlePanelsComponent
					titleWords={titleWords}
					titlePanelStyles={titlePanelStylings}
					titlePanelsStyle={this.state.loginPageStyle.titlePanelsStyle}>
				</TitlePanelsComponent>

				<PanelsContainer>
					<LoginComponent
						userLogin={this.state.userLogin}
						loginComponentStyle={this.state.loginPageStyle.loginComponentStyle}
						userLoginButtonClickHandler={this.userLoginButtonClickHandler}
						guestLoginButtonClickHandler={this.guestLoginButtonClickHandler}
						usernameInputOnChangeHandler={this.usernameInputOnChangeHandler}
						passwordInputOnChangeHandler={this.passwordInputOnChangeHandler}>
					</LoginComponent>
					<RegisterComponent
						registerComponentStyle={this.state.loginPageStyle.registerComponentStyle}>
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
		console.log(this.state.userLogin);
	}

	guestLoginButtonClickHandler = () => 
	{
		
	}

	onResizeLarge = () =>  
	{
		if (this.state.loginPageStyle != largeStyle)
		{
			this.setState({ loginPageStyle: largeStyle });
		}
	}

	onResizeMedium = () =>  
	{
		if (this.state.loginPageStyle != mediumStyling)
		{
			this.setState({ loginPageStyle: mediumStyling });
		}
	}

	onResizeSmall = () =>  
	{
		if (this.state.loginPageStyle != smallStyling)
		{
			this.setState({ loginPageStyle: smallStyling });
		}
	}

	onResizeVerySmall= () =>  
	{
		if (this.state.loginPageStyle != verySmallStyling)
		{
			this.setState({ loginPageStyle: verySmallStyling });
		}
	}
}