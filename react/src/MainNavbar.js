import React, { Component} from "react";
import {hot} from "react-hot-loader";

const navbarStyle = {
    backgroundColor: "#ce1616",
    // margin: "0px",
}




class MainNavbar extends Component{
    render(){
        return (
            <nav className="navbar" style={navbarStyle} role="navigation" arai-label="main-navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item">
                            <i className="fab fa-rebel icon is-large"></i>
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default hot(module)(MainNavbar);
