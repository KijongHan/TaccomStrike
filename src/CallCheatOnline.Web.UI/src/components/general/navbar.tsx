import * as React from "react";
import styled from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";
import { CardComponent, CardComponentStyle, CardRotationAnimation } from "./card";
import { ColorStyle } from "../../styles/colorstyle";
import { History } from "history";

const PlayIcon = require("../../res/play.png");
const CommunityIcon = require("../../res/community.png");
const NewsIcon = require("../../res/news.png");

const Navbar = styled.div`
    position: ${(props: NavbarComponentStyle) => props.displayStyle.getPositionString()}; 
    display: none;
    width: ${(props: NavbarComponentStyle) => props.displayStyle.getWidthString()};
    height: ${(props: NavbarComponentStyle) => props.displayStyle.getHeightString()};
    margin: ${(props: NavbarComponentStyle) => props.displayStyle.getMarginString()};
    padding: ${(props: NavbarComponentStyle) => props.displayStyle.getPaddingString()};
    top: ${(props: NavbarComponentStyle) => props.displayStyle.getTopString()};
`;

const NavbarItemText = styled.div`
    margin: auto;
    font-size: 1.5em;
    color: ${ColorStyle.pallet2};
    text-align: center;
`;

const NavbarItemPlay = styled.div`
    height: 55px;
    width: 55px;
    background-size: 100% 100%;
    background-image: url(${PlayIcon});
`;

const NavbarItemCommunity = styled.div`
    height: 55px;
    width: 55px;
    background-size: 100% 100%;
    background-image: url(${CommunityIcon});
`;

const NavbarItemNews = styled.div`
    height: 55px;
    width: 55px;
    background-size: 100% 100%;
    background-image: url(${NewsIcon});
`;

const PlayNavbarItem = styled.div`
    width: 100%;
    height: 100%;
    -webkit-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet1};
	-moz-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet1};
	box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet1};
    background-color: ${(prop: NavbarItemStyleProp) => prop.isSelected ? ColorStyle.pallet4 : ColorStyle.pallet5};
    display: flex;

    &:hover {
		cursor: pointer;
	}
`;

const CommunityNavbarItem = styled.div`
    width: 100%;
    height: 100%;
    -webkit-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet1};
	-moz-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet1};
	box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet1};
    background-color: ${(prop: NavbarItemStyleProp) => prop.isSelected ? ColorStyle.pallet4 : ColorStyle.pallet5};
    display: flex;

    &:hover {
		cursor: pointer;
	}
`;

const NewsNavbarItem = styled.div`
    width: 100%;
    height: 100%;
    -webkit-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet1};
	-moz-box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet1};
	box-shadow: 0px 0px 1px 1px ${ColorStyle.pallet1};
    background-color: ${(prop: NavbarItemStyleProp) => prop.isSelected ? ColorStyle.pallet4 : ColorStyle.pallet5};
    display: flex;

    &:hover {
		cursor: pointer;
	}
`;  

export class NavbarComponentProps 
{
    navbarComponentStyle: NavbarComponentStyle;
    playNavbarItemStyle: NavbarItemStyle;
    communityNavbarItemStyle: NavbarItemStyle;
    newsNavbarItemStyle: NavbarItemStyle;
    history: History<any>;
}

export class NavbarComponentStyle 
{
    displayStyle: DisplayStyle;
}

export class NavbarItemStyle 
{
    isSelected: boolean;
    cardComponentStyle: CardComponentStyle;
    cardRotationAnimation: CardRotationAnimation;
    cardHoverAnimation: CardRotationAnimation;

    showIcon: boolean;
    showText: boolean;
}

class NavbarItemStyleProp 
{
    isSelected: boolean;
}

export class NavbarComponent extends React.Component<NavbarComponentProps, {}> 
{
    constructor(props: NavbarComponentProps) 
    {
        super(props);
    }

    render() 
    {
        return (
            <Navbar
                displayStyle={this.props.navbarComponentStyle.displayStyle}>
                {this.getPlayNavbarItem()}
                {this.getCommunityNavbarItem()}
                {this.getNewsNavbarItem()}
            </Navbar>
        );
    }

    getPlayNavbarItem = () => 
    {
        let icon: JSX.Element;
        let text: JSX.Element;
        if(this.props.playNavbarItemStyle.showIcon) 
        {
            icon = <NavbarItemPlay/>
        }
        if(this.props.playNavbarItemStyle.showText) 
        {
            text = (
                <NavbarItemText>
                    Play
                </NavbarItemText>
            );
        }

        return (
            <CardComponent
                front={
                    <PlayNavbarItem
                        onClick={this.playNavbarItemClickHandler}
                        isSelected={this.props.playNavbarItemStyle.isSelected}>
                        {icon}
                        {text}
                    </PlayNavbarItem>}
                cardStyle={this.props.playNavbarItemStyle.cardComponentStyle}
                rotationAnimation={this.props.playNavbarItemStyle.cardRotationAnimation}
                hoverAnimation={this.props.playNavbarItemStyle.cardHoverAnimation}>
            </CardComponent>
        );
    }

    getCommunityNavbarItem = () => 
    {
        let icon: JSX.Element;
        let text: JSX.Element;
        if(this.props.communityNavbarItemStyle.showIcon) 
        {
            icon = <NavbarItemCommunity/>
        }
        if(this.props.communityNavbarItemStyle.showText) 
        {
            text = (
                <NavbarItemText>
                    Home
                </NavbarItemText>
            );
        }

        return (
            <CardComponent
                front={
                    <CommunityNavbarItem
                        onClick={this.communityNavbarItemClickHandler}
                        isSelected={this.props.communityNavbarItemStyle.isSelected}>
                        {icon}
                        {text}
                    </CommunityNavbarItem>}
                cardStyle={this.props.communityNavbarItemStyle.cardComponentStyle}
                rotationAnimation={this.props.communityNavbarItemStyle.cardRotationAnimation}
                hoverAnimation={this.props.communityNavbarItemStyle.cardHoverAnimation}>
            </CardComponent>
        );
    }

    getNewsNavbarItem = () => 
    {
        let icon: JSX.Element;
        let text: JSX.Element;
        if(this.props.newsNavbarItemStyle.showIcon) 
        {
            icon = <NavbarItemNews/>
        }
        if(this.props.newsNavbarItemStyle.showText) 
        {
            text = (
                <NavbarItemText>
                    News
                </NavbarItemText>
            );
        }

        return (
            <CardComponent
                front={
                    <NewsNavbarItem
                        onClick={this.newsNavbarItemClickHandler}
                        isSelected={this.props.newsNavbarItemStyle.isSelected}>
                        {icon}
                        {text}
                    </NewsNavbarItem>}
                cardStyle={this.props.newsNavbarItemStyle.cardComponentStyle}
                rotationAnimation={this.props.newsNavbarItemStyle.cardRotationAnimation}
                hoverAnimation={this.props.newsNavbarItemStyle.cardHoverAnimation}>
            </CardComponent>
        );
    }

    playNavbarItemClickHandler = () => 
    {
        this.props.history.push("/play");
    }

    communityNavbarItemClickHandler = () => 
    {
        this.props.history.push("/home");
    }

    newsNavbarItemClickHandler = () => 
    {
        this.props.history.push("/news");
    }
}