import * as React from "react";
import styled from "styled-components";
import { DisplayStyle } from "../../styles/displaystyle";
import { CardComponent, CardComponentStyle, CardRotationAnimation } from "./card";

const Navbar = styled.div`
    overflow: hidden;
    display: inline-block;
    width: ${(props: NavbarComponentStyle) => props.displayStyle.getWidthString()};
    height: ${(props: NavbarComponentStyle) => props.displayStyle.getHeightString()};
    margin: ${(props: NavbarComponentStyle) => props.displayStyle.getMarginString()};
    padding: ${(props: NavbarComponentStyle) => props.displayStyle.getPaddingString};
`;

const PlayNavbarItem = styled.div`
    width: 100%;
    height: 100%;
    font-size: 1.5em;
    color: white;
    background-color: black;
    text-align: center;
    line-height: ${(prop: CardComponentStyle) => prop.displayStyle.getHeightString()}
`;

const CommunityNavbarItem = styled.div`
    width: 100%;
    height: 100%;
    font-size: 1.5em;
    color: white;
    background-color: black;
    text-align: center;
    line-height: ${(prop: CardComponentStyle) => prop.displayStyle.getHeightString()}
`;

const NewsNavbarItem = styled.div`
    width: 100%;
    height: 100%;
    font-size: 1.5em;
    color: white;
    background-color: black;
    text-align: center;
    line-height: ${(prop: CardComponentStyle) => prop.displayStyle.getHeightString()}
`;

export class NavbarComponentProps 
{
    navbarComponentStyle: NavbarComponentStyle;
    navbarItemStyle: NavbarItemStyle;
}

export class NavbarComponentStyle 
{
    displayStyle: DisplayStyle;
}

export class NavbarItemStyle 
{
    cardComponentStyle: CardComponentStyle;
    cardRotationAnimation: CardRotationAnimation;
    cardHoverAnimation: CardRotationAnimation;
}

export class NavbarComponent extends React.Component<NavbarComponentProps, {}> 
{
    render() 
    {
        return (
            <Navbar
                displayStyle={this.props.navbarComponentStyle.displayStyle}>
                <CardComponent
                    front={
                        <PlayNavbarItem
                            displayStyle={this.props.navbarItemStyle.cardComponentStyle.displayStyle}
                            perspectiveStyle={this.props.navbarItemStyle.cardComponentStyle.perspectiveStyle}>
                            Play
                        </PlayNavbarItem>}
                    cardStyle={this.props.navbarItemStyle.cardComponentStyle}
                    rotationAnimation={this.props.navbarItemStyle.cardRotationAnimation}
                    hoverAnimation={this.props.navbarItemStyle.cardHoverAnimation}>
                </CardComponent>
                <CardComponent
                    front={
                        <CommunityNavbarItem
                            displayStyle={this.props.navbarItemStyle.cardComponentStyle.displayStyle}
                            perspectiveStyle={this.props.navbarItemStyle.cardComponentStyle.perspectiveStyle}>
                            Community
                        </CommunityNavbarItem>}
                    cardStyle={this.props.navbarItemStyle.cardComponentStyle}
                    rotationAnimation={this.props.navbarItemStyle.cardRotationAnimation}
                    hoverAnimation={this.props.navbarItemStyle.cardHoverAnimation}>
                </CardComponent>
                <CardComponent
                    front={
                        <NewsNavbarItem
                            displayStyle={this.props.navbarItemStyle.cardComponentStyle.displayStyle}
                            perspectiveStyle={this.props.navbarItemStyle.cardComponentStyle.perspectiveStyle}>
                            News
                        </NewsNavbarItem>}
                    cardStyle={this.props.navbarItemStyle.cardComponentStyle}
                    rotationAnimation={this.props.navbarItemStyle.cardRotationAnimation}
                    hoverAnimation={this.props.navbarItemStyle.cardHoverAnimation}>
                </CardComponent>
            </Navbar>
        );
    }
}