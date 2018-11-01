import React, { Component} from "react";
import {hot} from "react-hot-loader";
import img from "../static/images/SleepingPanda.gif";


// const navbarStyle = {
//     backgroundColor: "#ce1616",
//     // margin: "0px",
// }




class MainNavbar extends Component{
    render(){
        return (
            <nav className="navbar is-black" role="navigation" arai-label="main-navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item">
                            {/* <i className="fab fa-rebel icon is-large"></i> */}
                            <img src={img} alt="Juniped" width="30" height="30" />

                        </a>
                    </div>
                    <div className="navbar-menu">
                        <a href="/" className="navbar-item has-text-warning">
                            Home
                        </a>
                        <a href="/nothome" className="navbar-item has-text-warning">
                            Not Home
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default hot(module)(MainNavbar);
