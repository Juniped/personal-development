import React, { Component} from "react";
import {hot} from "react-hot-loader";
import {NavLink} from "react-router-dom";
import img from "../static/images/SleepingPanda.gif";


import "../static/css/Navbar.css";


function Burger(props){
    if(props.active){
        return (
                <div className="navbar-burger is-active" aria-label="menu" onClick={props.onClick} data-target="burgerNav">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </div>
            )
        } else {
            return(
                <div className="navbar-burger" aria-label="menu" onClick={props.onClick}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </div>
            )
        }
}
class MainNavbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            burgerActive: false,
        }
    }
    toggleBurger(){
        this.setState({
            burgerActive: !this.state.burgerActive,
        })
        console.log(this.state.burgerActive);
    }
    render(){
        const burgerActive = this.state.burgerActive;
        return (
            <nav className="navbar is-dark" role="navigation" arai-label="main-navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item">
                            <img src={img} alt="Juniped" width="30" height="30" />
                        </a>
                        <Burger active={burgerActive} onClick={() => this.toggleBurger()}/>
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
