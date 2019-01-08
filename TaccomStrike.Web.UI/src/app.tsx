import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as React from "react";
import { LoginPageComponent, LoginPageComponentProps } from "./components/page/login";
import { MainPageComponent, MainPageComponentProps } from "./components/page/main";
import { PlayPageComponent, PlayPageComponentProps } from "./components/page/play";
import { GetUser } from "./models/rest/getuser";
import { LoginComponentProps } from "./components/general/login";

export class AppComponentState 
{
    loggedInUser: GetUser;
}

export class AppComponent extends React.Component<{}, AppComponentState> 
{
    constructor(props: any) 
    {
        super(props);
        this.state = {
            loggedInUser: null
        };
    } 

	render() 
	{
		return (
			<BrowserRouter>
				<Switch>
                    <Route 
                        exact path="/"
                        render={
                            (props: LoginPageComponentProps) => 
                            <LoginPageComponent
                                loggedInUser={this.state.loggedInUser}
                                userLoggedIn={this.userLoggedInHandler}
                                history={props.history}
                                location={props.location}
                                match={props.match}>    
                            </LoginPageComponent>}/>
                    <Route 
                        path="/play"
                        render={
                            (props: PlayPageComponentProps) => 
                            <PlayPageComponent
                                loggedInUser={this.state.loggedInUser}
                                history={props.history}
                                location={props.location}
                                match={props.match}>    
                            </PlayPageComponent>}/>
                    <Route 
                        path="/main"
                        render={
                            (props: MainPageComponentProps) => 
                            <PlayPageComponent
                                loggedInUser={this.state.loggedInUser}
                                history={props.history}
                                location={props.location}
                                match={props.match}>    
                            </PlayPageComponent>}/>
				</Switch>
			</BrowserRouter>
		);
    }
    
    userLoggedInHandler = (user: GetUser) => 
    {
        this.setState({
            loggedInUser: user
        });
    }
}