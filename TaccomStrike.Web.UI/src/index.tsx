import * as React from "react";
import * as ReactDOM from "react-dom";
import { LoginPageComponent } from "./components/page/login";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={LoginPageComponent}/>
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);