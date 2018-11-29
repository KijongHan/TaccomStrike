import * as React from "react";
import { TitlePanelComponent, TitlePanelStyling } from "../general/titlepanel";
import { CardComponentStyle, CardComponent } from "../general/card";
import { LoginComponent, LoginComponentStyle } from "../general/login";

import styled from "styled-components";
import { TitlePanelsStyling, TitlePanelsComponent } from "../general/titlepanels";
import { DisplayStyling } from "../../styling/displaystyling";

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

	loginComponentStyling: LoginComponentStyle;
}

const LoginPage = styled.div`
	height: 100%;
`;

const largeStyling: LoginPageStyling =
{
	titlePanelsStyling:
	{
		displayStyling: new DisplayStyling({ heightPixels: 170 })
	},

	callTitlePanelStyling:
	{
		displayStyling: new DisplayStyling({
			widthPercentage: 40,
			heightPixels: 170,
			marginLeftPercentage: 1,
			floatLeft: true
		})
	},

	cheatTitlePanelStyling:
	{
		displayStyling: new DisplayStyling({
			widthPercentage: 55,
			heightPixels: 170,
			marginLeftPercentage: 3,
			floatLeft: true
		})
	},

	loginComponentStyling:
	{
		cardComponentStyle:
		{
			displayStyling: new DisplayStyling({ widthPercentage: 30, heightPixels: 400})
		},

		loginAsUserButtonComponentStyle:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: true,
				widthPercentage: 30,
				heightPixels: 50,
				marginLeftPercentage: 5
			})
		},

		loginAsGuestButtonComponentStyle:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: true,
				widthPercentage: 30,
				heightPixels: 50,
				marginLeftPercentage: 5
			})
		},

		usernameLabelledInputStyle:
		{
			displayStyling: new DisplayStyling({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		}
	}
}

const mediumStyling: LoginPageStyling =
{
	titlePanelsStyling:
	{
		displayStyling: new DisplayStyling({ heightPixels: 340 })
	},

	callTitlePanelStyling:
	{
		displayStyling: new DisplayStyling({
			widthPercentage: 90,
			heightPixels: 170,
			marginLeftPercentage: 5,
			floatLeft: true
		})
	},

	cheatTitlePanelStyling:
	{
		displayStyling: new DisplayStyling({
			widthPercentage: 90,
			heightPixels: 170,
			marginLeftPercentage: 5,
			floatLeft: true
		})
	},

	loginComponentStyling:
	{
		cardComponentStyle:
		{
			displayStyling: new DisplayStyling({ widthPercentage: 25, heightPixels: 400 })
		},

		loginAsUserButtonComponentStyle:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: false,
				widthPercentage: 80,
				heightPixels: 50
			})
		},

		loginAsGuestButtonComponentStyle:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: false,
				widthPercentage: 80,
				heightPixels: 50
			})
		},

		usernameLabelledInputStyle:
		{
			displayStyling: new DisplayStyling({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		}
	}
}

const smallStyling: LoginPageStyling =
{
	titlePanelsStyling:
	{
		displayStyling: new DisplayStyling({ heightPixels: 340 })
	},

	callTitlePanelStyling:
	{
		displayStyling: new DisplayStyling({
			widthPercentage: 90,
			heightPixels: 170,
			marginLeftPercentage: 5,
			floatLeft: true
		})
	},

	cheatTitlePanelStyling:
	{
		displayStyling: new DisplayStyling({
			widthPercentage: 90,
			heightPixels: 170,
			marginLeftPercentage: 5,
			floatLeft: true
		})
	},

	loginComponentStyling:
	{
		cardComponentStyle:
		{
			displayStyling: new DisplayStyling({ widthPercentage: 90, heightPixels: 400 })
		},

		loginAsUserButtonComponentStyle:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: false,
				widthPercentage: 80,
				heightPixels: 50
			})
		},

		loginAsGuestButtonComponentStyle:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: false,
				widthPercentage: 80,
				heightPixels: 50
			})
		},

		usernameLabelledInputStyle:
		{
			displayStyling: new DisplayStyling({
				widthPercentage: 90,
				marginLeftPercentage: 5,
				marginTopPixels: 10
			})
		}
	}
}

const verySmallStyling: LoginPageStyling =
{
	titlePanelsStyling:
	{
		displayStyling: new DisplayStyling({ heightPixels: 340 })
	},

	callTitlePanelStyling:
	{
		displayStyling: new DisplayStyling({
			widthPercentage: 90,
			heightPixels: 170,
			marginLeftPercentage: 5,
			floatLeft: true
		})
	},

	cheatTitlePanelStyling:
	{
		displayStyling: new DisplayStyling({
			widthPercentage: 90,
			heightPixels: 170,
			marginLeftPercentage: 5,
			floatLeft: true
		})
	},

	loginComponentStyling:
	{
		cardComponentStyle:
		{
			displayStyling: new DisplayStyling({ widthPercentage: 90, heightPixels: 400 })
		},

		loginAsUserButtonComponentStyle:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: false,
				widthPercentage: 80,
				heightPixels: 50
			})
		},

		loginAsGuestButtonComponentStyle:
		{
			layoutStyling: new DisplayStyling({
				floatLeft: false,
				widthPercentage: 80,
				heightPixels: 50
			})
		},

		usernameLabelledInputStyle:
		{
			displayStyling: new DisplayStyling({
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
					loginComponentStyle={this.state.loginPageStyling.loginComponentStyling}>
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

		if (w > 1100)
		{
			if (this.state.loginPageStyling != largeStyling)
			{
				this.setState({ loginPageStyling: largeStyling });
			}
		}
		else if (w > 1050)
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