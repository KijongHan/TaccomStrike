import * as React from "react";
import { ButtonComponent, ButtonComponentStyle } from "./button";

import styled from "styled-components";
import { CardComponent, CardComponentStyle } from "./card";

export interface RegisterComponentProps
{
	loginComponentStyling: RegisterComponentStyling
}

export interface RegisterComponentState { }

export interface RegisterComponentStyling
{
	cardComponentStyling: CardComponentStyle;
	registerButtonComponentStyling: ButtonComponentStyle;
}

const LoginComponentElement = styled.div`
	height: 100%;
	width: 100%;
`;