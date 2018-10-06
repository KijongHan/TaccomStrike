import * as React from "react";
import { TitlePanelComponent, TitlePanelStyling } from "../general/titlepanel";
import styled from "styled-components";

export interface LoginPageComponentProps { }

export interface LoginPageComponentState
{
	loginPageStyling: LoginPageStyling;
}

export interface LoginPageStyling
{
	callTitlePanelStyling: TitlePanelStyling;
	cheatTitlePanelStyling: TitlePanelStyling;
}

const LoginPage = styled.div`
	height: 100%;
`;

const TitlesPanel = styled.div`
	overflow: hidden;
	-webkit-perspective: 800px;
	perspective: 800px;
    margin-top: 20px;
    margin-bottom: 50px;
    padding-bottom: 10px;
	height: 100%;
`;

const largeStyling: LoginPageStyling =
{
	callTitlePanelStyling:
	{
		widthPercentage: 40,
		heightPercentage: 20,
		marginLeftPercentage: 1,
		floatLeft: true
	},

	cheatTitlePanelStyling:
	{
		widthPercentage: 55,
		heightPercentage: 20,
		marginLeftPercentage: 3,
		floatLeft: true
	}
}

const mediumStyling: LoginPageStyling =
{
	callTitlePanelStyling:
	{
		widthPercentage: 90,
		heightPercentage: 20,
		marginLeftPercentage: 5,
		floatLeft: true
	},

	cheatTitlePanelStyling:
	{
		widthPercentage: 90,
		heightPercentage: 20,
		marginLeftPercentage: 5,
		floatLeft: true
	}
}

const smallStyling: LoginPageStyling =
{
	callTitlePanelStyling:
	{
		widthPercentage: 90,
		heightPercentage: 20,
		marginLeftPercentage: 5,
		floatLeft: true
	},

	cheatTitlePanelStyling:
	{
		widthPercentage: 90,
		heightPercentage: 20,
		marginLeftPercentage: 5,
		floatLeft: true
	}
}

const verySmallStyling: LoginPageStyling =
{
	callTitlePanelStyling:
	{
		widthPercentage: 90,
		heightPercentage: 20,
		marginLeftPercentage: 5,
		floatLeft: true
	},

	cheatTitlePanelStyling:
	{
		widthPercentage: 90,
		heightPercentage: 20,
		marginLeftPercentage: 5,
		floatLeft: true
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
		return (
			<LoginPage>
				<TitlesPanel>
					<TitlePanelComponent title="Call" titlePanelStyling={this.state.loginPageStyling.callTitlePanelStyling} />
					<TitlePanelComponent title="Cheat" titlePanelStyling={this.state.loginPageStyling.cheatTitlePanelStyling} />
				</TitlesPanel>
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
			resizeTimeout = setTimeout(function ()
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

		if (w > 1200)
		{
			if (this.state.loginPageStyling != largeStyling)
			{
				this.setState({ loginPageStyling: largeStyling });
			}
		}
		else if (w > 992)
		{
			if (this.state.loginPageStyling != mediumStyling)
			{
				this.setState({ loginPageStyling: mediumStyling });
			}
		}
		else if (w > 768)
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