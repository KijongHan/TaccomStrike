import * as React from "react";
import * as ReactDOM from "react-dom";
import { LoginPageComponent } from "./components/page/login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MainPageComponent } from "./components/page/main";
import { PlayPageComponent } from "./components/page/play";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={LoginPageComponent}/>
			<Route path="/play" component={PlayPageComponent}/>
			<Route path="/main" component={MainPageComponent}/>
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);