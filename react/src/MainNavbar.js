import React, { Component} from "react";
import {hot} from "react-hot-loader";
import {NavLink} from "react-router-dom";
import img from "../static/images/SleepingPanda.gif";


import "../static/css/Navbar.css";
// impor
class MainNavbar extends Component{
    handleClick(i) {

    } 
    render(){
        return (
            <nav className="navbar is-dark" role="navigation" arai-label="main-navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item">
                            {/* <i className="fab fa-rebel icon is-large"></i> */}
                            <img src={img} alt="Juniped" width="30" height="30" />

                        </a>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-start">
                            <NavLink exact to="/" className="navbar-item"> Home        </NavLink>
                            <NavLink  to="/stuff" className="navbar-item"> Stuff       </NavLink>
                            <NavLink   to="/game" className="navbar-item"> Tic-Tac-Toe </NavLink>
                            <NavLink     to="/db" className="navbar-item"> Database    </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default hot(module)(MainNavbar);
