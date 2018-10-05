import * as React from "react";
import { TitlePanelComponent } from "../general/titlepanel";
import styled from "styled-components";

export class LoginPageComponentProps { }

export class LoginPageComponentState
{
	titlePart1: string;
	titlePart2: string;
}

const LoginPage = styled.div`
	height: 100%;
`;

export class LoginPageComponent extends React.Component<LoginPageComponentProps, LoginPageComponentState>
{
	constructor(props: LoginPageComponentProps)
	{
		super(props);
		this.state = { titlePart1: "Call" , titlePart2: "Cheat"};
	}

	render()
	{
		return (
			<LoginPage>
				<TitlePanelComponent title={this.state.titlePart1} titlePanelStyling={{ heightPercentage:20 }} />
				<TitlePanelComponent title={this.state.titlePart2} titlePanelStyling={{ heightPercentage: 20 }}/>
			</LoginPage>
		);
	}

	componentDidMount()
	{

	}

	componentWillUnmount()
	{

	}
}