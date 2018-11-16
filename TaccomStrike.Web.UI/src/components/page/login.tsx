import * as React from "react";
import { TitlePanelComponent, TitlePanelStyling } from "../general/titlepanel";
import { CardComponentStyling, CardComponent } from "../general/card";
import { LoginComponent, LoginComponentStyling } from "../general/login";

import styled from "styled-components";
import { TitlePanelsStyling, TitlePanelsComponent } from "../general/titlepanels";
import { DisplayStyling } from "../../styling/layout";

export interface LoginPageComponentProps { }

export interface LoginPageComponentState
{
	loginPageStyling: LoginPageStyling;
}

export interface LoginPageStyling
{
	titlePanelsStyling: TitlePanelsStyling;
	callTitlePanelStyling: TitlePanelStyling;
	cheatTitlePanelStyling: TitlePanelStyling;

	loginComponentStyling: LoginComponentStyling;
}

const LoginPage = styled.div`
	height: 100%;
`;

const largeStyling: LoginPageStyling =
{
	titlePanelsStyling:
	{
		heightPercentage: 20
	},

	callTitlePanelStyling:
	{
		widthPercentage: 40,
		heightPercentage: 100,
		marginLeftPercentage: 1,
		floatLeft: true
	},

	cheatTitlePanelStyling:
	{
		widthPercentage: 55,
		heightPercentage: 100,
		marginLeftPercentage: 3,
		floatLeft: true
	},

	loginComponentStyling:
	{
		cardComponentStyling:
		{
			displayStyling: new DisplayStyling({ widthPercentage: 25, heightPixels: 400})
		},

		loginAsUserButtonComponentStyling:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: true,
				widthPercentage: 40,
				heightPixels: 50
			})
		},

		loginAsGuestButtonComponentStyling:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: true,
				widthPercentage: 40,
				heightPixels: 50
			})
		}
	}
}

const mediumStyling: LoginPageStyling =
{
	titlePanelsStyling:
	{
		heightPercentage: 40
	},

	callTitlePanelStyling:
	{
		widthPercentage: 90,
		heightPercentage: 50,
		marginLeftPercentage: 5,
		floatLeft: true
	},

	cheatTitlePanelStyling:
	{
		widthPercentage: 90,
		heightPercentage: 50,
		marginLeftPercentage: 5,
		floatLeft: true
	},

	loginComponentStyling:
	{
		cardComponentStyling:
		{
			displayStyling: new DisplayStyling({ widthPercentage: 25, heightPixels: 400 })
		},

		loginAsUserButtonComponentStyling:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: false,
				widthPercentage: 80,
				heightPixels: 50
			})
		},

		loginAsGuestButtonComponentStyling:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: false,
				widthPercentage: 80,
				heightPixels: 50
			})
		}
	}
}

const smallStyling: LoginPageStyling =
{
	titlePanelsStyling:
	{
		heightPercentage: 40
	},

	callTitlePanelStyling:
	{
		widthPercentage: 90,
		heightPercentage: 50,
		marginLeftPercentage: 5,
		floatLeft: true
	},

	cheatTitlePanelStyling:
	{
		widthPercentage: 90,
		heightPercentage: 50,
		marginLeftPercentage: 5,
		floatLeft: true
	},

	loginComponentStyling:
	{
		cardComponentStyling:
		{
			displayStyling: new DisplayStyling({ widthPercentage: 25, heightPixels: 400 })
		},

		loginAsUserButtonComponentStyling:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: false,
				widthPercentage: 80,
				heightPixels: 50
			})
		},

		loginAsGuestButtonComponentStyling:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: false,
				widthPercentage: 80,
				heightPixels: 50
			})
		}
	}
}

const verySmallStyling: LoginPageStyling =
{
	titlePanelsStyling:
	{
		heightPercentage: 40
	},

	callTitlePanelStyling:
	{
		widthPercentage: 90,
		heightPercentage: 50,
		marginLeftPercentage: 5,
		floatLeft: true
	},

	cheatTitlePanelStyling:
	{
		widthPercentage: 90,
		heightPercentage: 50,
		marginLeftPercentage: 5,
		floatLeft: true
	},

	loginComponentStyling:
	{
		cardComponentStyling:
		{
			displayStyling: new DisplayStyling({ widthPercentage: 25, heightPixels: 400 })
		},

		loginAsUserButtonComponentStyling:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: false,
				widthPercentage: 80,
				heightPixels: 50
			})
		},

		loginAsGuestButtonComponentStyling:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: false,
				widthPercentage: 80,
				heightPixels: 50
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
			loginPageStyling: largeStyling
		};
	}

	render()
	{
		let titleWords = ["Call", "Cheat"];
		let titlePanelStylings = [this.state.loginPageStyling.callTitlePanelStyling, this.state.loginPageStyling.cheatTitlePanelStyling];

		return (
			<LoginPage>
				<TitlePanelsComponent
					titleWords={titleWords}
					titlePanelStylings={titlePanelStylings}
					titlePanelsStyling={this.state.loginPageStyling.titlePanelsStyling}>
				</TitlePanelsComponent>

				<LoginComponent
					loginComponentStyling={this.state.loginPageStyling.loginComponentStyling}>
				</LoginComponent>
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

		if (w > 1400)
		{
			if (this.state.loginPageStyling != largeStyling)
			{
				this.setState({ loginPageStyling: largeStyling });
			}
		}
		else if (w > 1200)
		{
			if (this.state.loginPageStyling != mediumStyling)
			{
				this.setState({ loginPageStyling: mediumStyling });
			}
		}
		else if (w > 1000)
		{
			if (this.state.loginPageStyling != smallStyling)
			{
				this.setState({ loginPageStyling: smallStyling });
			}
		}
		else
		{
			if (this.state.loginPageStyling != verySmallStyling)
			{
				this.setState({ loginPageStyling: verySmallStyling });
			}
		}
	}
}