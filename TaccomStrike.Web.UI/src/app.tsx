import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
                        path="/login"
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
                    <Redirect from="/" to="/login"/>
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

    componentDidMount() 
    {
        let loadingScreen = document.getElementById("LoadingScreen");
        loadingScreen.style.display = "none";
    }
}