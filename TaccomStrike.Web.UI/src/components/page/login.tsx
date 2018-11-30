import * as React from "react";
import { TitlePanelComponent, TitlePanelStyle } from "../general/titlepanel";
import { CardComponentStyle, CardComponent } from "../general/card";
import { LoginComponent, LoginComponentStyle } from "../general/login";

import styled from "styled-components";
import { TitlePanelsStyle, TitlePanelsComponent } from "../general/titlepanels";
import { DisplayStyle, Position } from "../../styles/displaystyle";

export interface LoginPageComponentProps { }

export interface LoginPageComponentState
{
	loginPageStyle: LoginPageStyle;
}

export interface LoginPageStyle
{
	titlePanelsStyle: TitlePanelsStyle;
	callTitlePanelStyle: TitlePanelStyle;
	cheatTitlePanelStyle: TitlePanelStyle;

	loginComponentStyle: LoginComponentStyle;
}

const LoginPage = styled.div`
	height: 100%;
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
	}
}

export class LoginPageComponent extends React.Component<LoginPageComponentProps, LoginPageComponentState>
{
	constructor(props: LoginPageComponentProps)
	{
		super(props);
		this.state =
		{
			loginPageStyle: largeStyle
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
						loginComponentStyle={this.state.loginPageStyle.loginComponentStyle}>
					</LoginComponent>
				</PanelsContainer>
			</LoginPage>
		);
	}

	componentDidMount()
	{
		window.addEventListener('resize', this.throttledResizeEventHandler);
		this.resizeEventHandler();
	}

	componentWillUnmount()
	{
		window.removeEventListener('resize', this.throttledResizeEventHandler);
	}

	throttledResizeEventHandler = () =>
	{
		this.throttledEventHandler(this.resizeEventHandler);
	}

	throttledEventHandler = (eventHandler: ()=>void) =>
	{
		let resizeTimeout;
		if (!resizeTimeout)
		{
			resizeTimeout = setTimeout(() =>
			{
				resizeTimeout = null;
				eventHandler();
			}, 500);
		}
	}

	resizeEventHandler = () =>
	{
		let w = window.innerWidth;
		let h = window.innerHeight;

		if (w > 1100)
		{
			if (this.state.loginPageStyle != largeStyle)
			{
				this.setState({ loginPageStyle: largeStyle });
			}
		}
		else if (w > 950)
		{
			if (this.state.loginPageStyle != mediumStyling)
			{
				this.setState({ loginPageStyle: mediumStyling });
			}
		}
		else if (w > 850)
		{
			if (this.state.loginPageStyle != smallStyling)
			{
				this.setState({ loginPageStyle: smallStyling });
			}
		}
		else
		{
			if (this.state.loginPageStyle != verySmallStyling)
			{
				this.setState({ loginPageStyle: verySmallStyling });
			}
		}
	}
}