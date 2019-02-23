import * as React from "react";
import { BasePageComponent, BasePageComponentProps, BasePageComponentState } from "./base";
import { ChatConnectionsService } from "../../services/hub/chatconnections";
import { ChatUserConnected } from "../../models/hub/chatuserconnected";
import { HomePageStyle } from "../pagestyles/home";
import styled from "styled-components";
import { ChatRoomsService } from "../../services/rest/chatrooms";
import { GetChatRoom } from "../../models/rest/getchatroom";
import { NavbarComponent } from "../general/navbar";
import { TitlePanelsComponent } from "../general/titlepanels";
import { DisplayStyle } from "../../styles/displaystyle";
import { ColorStyle } from "../../styles/colorstyle";

const HomePage = styled.div`
	height: 100%;
	font-family: 'Cormorant Upright', serif;
`;

const PanelsContainer = styled.div`
	overflow: auto;
	padding-top: 25px;
	padding-bottom: 50px;
`;

const StatusPanel = styled.div`
	width: ${(p: DisplayStyleProps) => p.displayStyle.getWidthString()};
	height: ${(p: DisplayStyleProps) => p.displayStyle.getHeightString()};
	float: ${(p: DisplayStyleProps) => p.displayStyle.getFloatString()};

	background-color: ${ColorStyle.pallet3};
	-webkit-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	-moz-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	border-style: solid;
	border-width: 2px;
	border-color: rgba(0, 0, 0, 0.1);
`;

class DisplayStyleProps 
{
	displayStyle: DisplayStyle;
}

export interface HomePageComponentProps extends BasePageComponentProps {}

export class HomePageComponentState extends BasePageComponentState {}

export class HomePageComponent extends BasePageComponent<HomePageComponentProps, HomePageComponentState> 
{
	constructor(props: HomePageComponentProps) 
	{
		super(props);
		let pageStyle = new HomePageStyle().large();
		this.state = {
			pageStyle: pageStyle,
            useMobileStyle: false
		};
	}

    render() 
    {
		let homePageStyle = this.state.pageStyle as HomePageStyle;
		let titleWords = ["Call", "Cheat"];
		let titlePanelStylings = [homePageStyle.callTitlePanelStyle, homePageStyle.cheatTitlePanelStyle];

        return (
			<HomePage>
				<TitlePanelsComponent
					titleWords={titleWords}
					titlePanelStyles={titlePanelStylings}
					titlePanelsStyle={homePageStyle.titlePanelsStyle}>
				</TitlePanelsComponent>

				<PanelsContainer>
					<StatusPanel
						displayStyle={homePageStyle.statusPanelStyle}>

					</StatusPanel>
				</PanelsContainer>

				<NavbarComponent
					history={this.props.history}
                    navbarComponentStyle={homePageStyle.navbarComponentStyle}
                    playNavbarItemStyle={homePageStyle.playNavbarItemStyle}
                    communityNavbarItemStyle={homePageStyle.communityNavbarItemStyle}
                    newsNavbarItemStyle={homePageStyle.newsNavbarItemStyle}>
                </NavbarComponent>
			</HomePage>
		);
	}
}