"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var hello_1 = require("./components/hello");
require("../styles/card.css");
ReactDOM.render(React.createElement(hello_1.Hello, { compiler: "TypeScript", framework: "React" }), document.getElementById("root"));
//# sourceMappingURL=index.js.map