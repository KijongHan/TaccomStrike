import * as React from "react";
import styled from "styled-components";
import { ColorStyle } from "../../styles/colorstyle";

const Footer = styled.div`
    height: 100px;
    background-color: ${ColorStyle.pallet3};
`;

const FooterContent = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
`;

const FooterCopyright = styled.div`
    margin: auto;
    text-align: center;
    font-size: 1.1em;
    color: ${ColorStyle.pallet1};
`;

const Divider = styled.div`
	width: 100%;
	height: 2px;
	background-color: rgba(0,0,0,0.2);
`;

export class FooterComponent extends React.Component<{}, {}> 
{
    constructor(p: {}) 
    {
        super(p);
    }

    render() 
    {
        return (
            <Footer>
                <Divider/>       
                <FooterContent>
                    <FooterCopyright>
                        Copyright © 2019 Thomas Han. All Rights Reserved.
                        <Divider/>
                        Version 0.1.0
                    </FooterCopyright>
                </FooterContent>
            </Footer>
        );
    }
}