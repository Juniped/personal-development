import React, { Component} from "react";
// import {hot} from "react-hot-loader";
import {HashRouter as Router} from "react-router-dom";
import ReactDOM from "react-dom";
import MainNavbar from "./MainNavbar.js";
import App from "./App.js";
import Tag from "./Tag.js";

// Style Imports
import "normalize.css";
import "bulma/css/bulma.css";


class Index extends Component {
    render(){
        return(
            <div className="Index">
                {/* <Router> */}
                    {/* <div> */}
                        {/* <MainNavbar /> */}
                        <App />
                        <Tag />
                    {/* </div> */}
                {/* </Router> */}
            </div>
        );
    }
}
ReactDOM.render(<Index />, document.getElementById("root"));
// ReactDOM.render(<App />, document.getElementById("root"));
// ReactDOM.render(<Game />, document.getElementById("ttt"));
// ReactDOM.render(<Tag />, document.getElementById("tag"));