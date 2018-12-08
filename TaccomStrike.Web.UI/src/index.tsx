import * as React from "react";
import * as ReactDOM from "react-dom";
import { LoginPageComponent } from "./components/page/login";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { MainPageComponent } from "./components/page/main";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={LoginPageComponent}/>
			<Route path="/main" component={MainPageComponent}/>
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);