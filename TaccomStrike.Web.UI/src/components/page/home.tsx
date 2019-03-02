import * as React from "react";
import { BasePageComponent, BasePageComponentProps, BasePageComponentState } from "./base";
import { HomePageStyle } from "../pagestyles/home";
import styled from "styled-components";
import { NavbarComponent } from "../general/navbar";
import { TitlePanelsComponent } from "../general/titlepanels";
import { DisplayStyle } from "../../styles/displaystyle";
import { ColorStyle } from "../../styles/colorstyle";
import { GameLobbiesService } from "../../services/rest/gamelobbies";
import { UserLoginsService } from "../../services/rest/userlogins";
import { ButtonComponent } from "../general/button";
import { CardComponent } from "../general/card";
import { GetUserComplete } from "../../models/rest/getusercomplete";
import { ChatRoomsService } from "../../services/rest/chatrooms";
import { GetChatRoom } from "../../models/rest/getchatroom";
import { FooterComponent } from "../general/footer";

const FacebookIcon = require("../../res/facebook_icon.png");
const TwitterIcon = require("../../res/twitter_icon.png");
const RedditIcon = require("../../res/reddit_icon.png");
const YoutubeIcon = require("../../res/youtube_icon.png");

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
	margin: ${(p: DisplayStyleProps) => p.displayStyle.getMarginString()};
	padding: 15px 15px 15px 15px; 

	background-color: ${ColorStyle.pallet3};
	-webkit-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	-moz-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	border-style: solid;
	border-width: 2px;
	border-color: rgba(0, 0, 0, 0.1);
`;

const PlayNowPanel = styled.div`
	width: ${(p: DisplayStyleProps) => p.displayStyle.getWidthString()};
	height: ${(p: DisplayStyleProps) => p.displayStyle.getHeightString()};
	float: ${(p: DisplayStyleProps) => p.displayStyle.getFloatString()};
	margin: ${(p: DisplayStyleProps) => p.displayStyle.getMarginString()};
	padding: 15px 15px 15px 15px; 

	background-color: ${ColorStyle.pallet3};
	-webkit-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	-moz-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	border-style: solid;
	border-width: 2px;
	border-color: rgba(0, 0, 0, 0.1);
`;

const SocialMediaPanel = styled.div`
	width: ${(p: DisplayStyleProps) => p.displayStyle.getWidthString()};
	height: ${(p: DisplayStyleProps) => p.displayStyle.getHeightString()};
	float: ${(p: DisplayStyleProps) => p.displayStyle.getFloatString()};
	margin: ${(p: DisplayStyleProps) => p.displayStyle.getMarginString()};
	padding: 15px 15px 15px 15px; 

	background-color: ${ColorStyle.pallet3};
	-webkit-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	-moz-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	border-style: solid;
	border-width: 2px;
	border-color: rgba(0, 0, 0, 0.1);
	display: flex;
`;

const SocialIconFacebook = styled.div`
	flex: 1;
	margin: 0 1%;
	background-size: 100% 100%;
	background-image: url(${FacebookIcon});
	opacity: 0.7;
	cursor: pointer;

	&:hover {
		opacity: 0.9;
	}
`;

const SocialIconReddit = styled.div`
	flex: 1;
	margin: 0 1%;
	background-size: 100% 100%;
	background-image: url(${RedditIcon});
	opacity: 0.7;
	cursor: pointer;

	&:hover {
		opacity: 0.9;
	}
`;

const SocialIconYoutube = styled.div`
	flex: 1;
	margin: 0 1%;
	background-size: 100% 100%;
	background-image: url(${YoutubeIcon});
	opacity: 0.7;
	cursor: pointer;

	&:hover {
		opacity: 0.9;
	}
`;

const SocialIconTwitter = styled.div`
	flex: 1;
	margin: 0 1%;
	background-size: 100% 100%;
	background-image: url(${TwitterIcon});
	opacity: 0.7;
	cursor: pointer;

	&:hover {
		opacity: 0.9;
	}
`;

const PanelOne = styled.div`
	margin: ${(p: DisplayStyleProps) => p.displayStyle.getMarginString()}; 
	width: ${(p: DisplayStyleProps) => p.displayStyle.getWidthString()};
	float: ${(p: DisplayStyleProps) => p.displayStyle.getFloatString()};
`;

const YoutubeTrailer = styled.div`
	width: ${(p: DisplayStyleProps) => p.displayStyle.getWidthString()};
	height: 0;
	float: ${(p: DisplayStyleProps) => p.displayStyle.getFloatString()};
	margin: ${(p: DisplayStyleProps) => p.displayStyle.getMarginString()};
	position: relative;
	padding-bottom: 35%;
`;

const YoutubeVideo = styled.iframe`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const StatusText = styled.li`
	font-size: 1.2em;
	color: ${ColorStyle.pallet1};
`;

const SubPanel = styled.div`
	width: 100%;
	height: 100%;
	padding: 15px 15px 15px 15px; 
	background-color: ${ColorStyle.pallet3};
	-webkit-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	-moz-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet3};
	border-style: solid;
	border-width: 2px;
	border-color: rgba(0, 0, 0, 0.1);
	display: flex; 
	flex-direction: column;
`;

const SubTitle = styled.div`
	font-size: 2em;
	font-weight: bold;
	width: 100%;
	color: ${ColorStyle.pallet2};
`;

const Divider = styled.div`
	width: 100%;
	height: 1px;
	background-color: ${ColorStyle.pallet2};
`;

const SubPanelContent = styled.div`
	flex-grow: 1;
	width: 100%;
`;

const LeaderboardTable = styled.table`
	width: 100%;
	height: 100%;
`;

const LeaderboardHeader = styled.th`
	background-color: rgba(0,0,0,0.3);
	color: ${ColorStyle.pallet2};
`;

const LeaderboardNumberData = styled.td`
	padding: 8px;
	text-align: right;
`;

const LeaderboardStringData = styled.td`
	padding: 8px;
`;

const LeaderboardEvenRow = styled.tr`
	background-color: rgba(0,0,0,0.1);
`;

const LeaderboardOddRow = styled.tr`

`;

const ChatRoomsPanel = styled.div`
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
`;

const ChatRoomItem = styled.div`
	height: 50px;
	width: 98%;
	margin-left: 1%;
	padding: 10px;
	background-color: ${ColorStyle.pallet2};
	border-style: solid;
	border-width: 1px;
	border-color: ${ColorStyle.pallet3};
	display: inline-block
	color: ${ColorStyle.pallet1};

	&:hover {
		background-color: rgba(255, 255, 255, 0.5);
		cursor: pointer;
	}
`;

class DisplayStyleProps 
{
	displayStyle: DisplayStyle;
}

export interface HomePageComponentProps extends BasePageComponentProps {}

export class HomePageComponentState extends BasePageComponentState 
{
	gameLobbiesCount: number;
	connectedUsersCount: number;

	statusRefreshIntervalID: number;
	leaderboard: GetUserComplete[];
	chatrooms: GetChatRoom[];
}

export class HomePageComponent extends BasePageComponent<HomePageComponentProps, HomePageComponentState> 
{
	constructor(props: HomePageComponentProps) 
	{
		super(props);
		let pageStyle = new HomePageStyle().large();
		this.state = {
			pageStyle: pageStyle,
			useMobileStyle: false,
			gameLobbiesCount: 0,
			connectedUsersCount: 0,

			statusRefreshIntervalID: null,
			leaderboard: [],
			chatrooms: []
		};

		UserLoginsService
			.getLeaderboard(5)
			.then((value: GetUserComplete[]) => {
				this.setState({
					leaderboard: value
				});
			});
		ChatRoomsService
			.getChatRooms()
			.then((value: GetChatRoom[]) => {
				this.setState({
					chatrooms: value
				});
			});
	}

    render() 
    {
		let homePageStyle = this.state.pageStyle as HomePageStyle;
		let titleWords = ["Call", "Cheat"];
		let titlePanelStylings = [homePageStyle.callTitlePanelStyle, homePageStyle.cheatTitlePanelStyle];

		let tableRows = this.state.leaderboard.map((value: GetUserComplete, index: number) => {
			if(index%2===0) {
				return (
					<LeaderboardEvenRow>
						<LeaderboardNumberData>{index++}</LeaderboardNumberData>
						<LeaderboardStringData>{value.username}</LeaderboardStringData>
						<LeaderboardNumberData>{value.gameScore}</LeaderboardNumberData>
					</LeaderboardEvenRow>
				);
			}
			else {
				return (
					<LeaderboardOddRow>
						<LeaderboardNumberData>{index++}</LeaderboardNumberData>
						<LeaderboardStringData>{value.username}</LeaderboardStringData>
						<LeaderboardNumberData>{value.gameScore}</LeaderboardNumberData>
					</LeaderboardOddRow>
				);
			}
		});

		let chatRoomItems = this.state.chatrooms.map((value: GetChatRoom) => {
			return (
				<ChatRoomItem>
					{value.chatRoomName} ({value.participants.length})
				</ChatRoomItem>
			);
		});

		let leaderboard = (
			<SubPanel>
				<SubTitle>Leader Board</SubTitle>
				<Divider></Divider>
				<SubPanelContent>
					<LeaderboardTable>
						<tr>
							<LeaderboardHeader>Rank</LeaderboardHeader>
							<LeaderboardHeader>Player</LeaderboardHeader>
							<LeaderboardHeader>Score</LeaderboardHeader>
						</tr>
						{tableRows}
					</LeaderboardTable>
				</SubPanelContent>
			</SubPanel>
		);
		let news = (
			<SubPanel>
				<SubTitle>Game News</SubTitle>
				<Divider></Divider>
			</SubPanel>
		);
		let community = (
			<SubPanel>
				<SubTitle>Community</SubTitle>
				<Divider></Divider>
				<SubPanelContent>
					<ChatRoomsPanel>
						{chatRoomItems}
					</ChatRoomsPanel>
				</SubPanelContent>
			</SubPanel>
		);

        return (
			<HomePage>
				<TitlePanelsComponent
					titleWords={titleWords}
					titlePanelStyles={titlePanelStylings}
					titlePanelsStyle={homePageStyle.titlePanelsStyle}>
				</TitlePanelsComponent>

				<PanelsContainer>
					<PanelOne
						displayStyle={homePageStyle.panelOneStyle}>
						<SocialMediaPanel
							displayStyle={homePageStyle.socialMediaPanelStyle}>
							<SocialIconFacebook/>
							<SocialIconReddit/>
							<SocialIconYoutube/>
							<SocialIconTwitter/>
						</SocialMediaPanel>

						<PlayNowPanel
							displayStyle={homePageStyle.playNowPanelStyle}>
							<ButtonComponent
								buttonComponentStyle={homePageStyle.playNowButtonStyle}
								buttonText={"Play Now"}
								buttonClickHandler={this.playNowButtonClickHandler}>
							</ButtonComponent>
						</PlayNowPanel>					

						<StatusPanel
							displayStyle={homePageStyle.statusPanelStyle}>
							<StatusText>
								There are <b>{this.state.connectedUsersCount}</b> players online
							</StatusText>
							<StatusText>
								There are <b>{this.state.gameLobbiesCount}</b> game lobbies active
							</StatusText>
						</StatusPanel>
					</PanelOne>

					<YoutubeTrailer
						displayStyle={homePageStyle.youtubeTrailerStyle}>
						<YoutubeVideo
							src="http://www.youtube.com/embed/n_dZNLr2cME?rel=0&hd=1">
						</YoutubeVideo>
					</YoutubeTrailer>

					<CardComponent
						cardStyle={homePageStyle.leaderboardStyle}
						front={leaderboard}>
					</CardComponent>
					<CardComponent
						cardStyle={homePageStyle.newsStyle}
						front={news}>
					</CardComponent>
					<CardComponent
						cardStyle={homePageStyle.communityStyle}
						front={community}>
					</CardComponent>
				</PanelsContainer>
				<FooterComponent/>

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

	componentDidMount() 
	{
		super.componentDidMount();
		this.getStatusInformation();
		let intervalID = window.setInterval(() => {
			this.getStatusInformation();
		}, 15000);
		this.setState({
			statusRefreshIntervalID: intervalID
		});
	}

	componentWillUnmount() 
	{
		super.componentWillUnmount();
		window.clearInterval(this.state.statusRefreshIntervalID);
		this.setState({
			statusRefreshIntervalID: null
		});
	}

	playNowButtonClickHandler = () => 
	{
		this.props.history.push("/play");
	}

	getStatusInformation = () => 
	{
		GameLobbiesService
			.getGameLobbiesCount()
			.then((value: number) => {
				this.setState({
					gameLobbiesCount: value
				})
			});
		UserLoginsService
			.getConnectedUsersCount()
			.then((value: number) => {
				this.setState({
					connectedUsersCount: value
				});
			});
	}
}