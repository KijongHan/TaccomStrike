import { NavbarComponentStyle, NavbarItemStyle } from "../general/navbar";

export abstract class BasePageStyle 
{
    navbarComponentStyle: NavbarComponentStyle;
    playNavbarItemStyle: NavbarItemStyle;
    communityNavbarItemStyle: NavbarItemStyle;
    newsNavbarItemStyle: NavbarItemStyle;

    abstract large: () => BasePageStyle;

    abstract medium: () => BasePageStyle;

    abstract small: () => BasePageStyle;

    abstract verysmall: () => BasePageStyle;

    abstract portrait: () => BasePageStyle;

    abstract landscape: () => BasePageStyle;
}