import * as React from "react";
import { ButtonComponent, ButtonComponentStyling } from "./button";

import styled from "styled-components";
import { CardComponent, CardComponentStyling } from "./card";

export interface RegisterComponentProps
{
	loginComponentStyling: RegisterComponentStyling
}

export interface RegisterComponentState { }

export interface RegisterComponentStyling
{
	cardComponentStyling: CardComponentStyling;
	registerButtonComponentStyling: ButtonComponentStyling;
}

const LoginComponentElement = styled.div`
	height: 100%;
	width: 100%;
`;