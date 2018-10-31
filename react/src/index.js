import React, { Component} from "react";
// import {hot} from "react-hot-loader";
import ReactDOM from "react-dom";
import App from "./App.js";
import Tag from "./Tag.js";
import MainNavbar from "./MainNavbar";

import "normalize.css";
import "bulma/css/bulma.css";

class Index extends Component {
    render(){
        return(
            <div className="Index">
                <MainNavbar />
                <App />
                <Tag />
            </div>
        )
    }
}
ReactDOM.render(<Index />, document.getElementById("root"));
// ReactDOM.render(<App />, document.getElementById("root"));
// ReactDOM.render(<Game />, document.getElementById("ttt"));
// ReactDOM.render(<Tag />, document.getElementById("tag"));