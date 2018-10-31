import React, { Component} from "react";
import {hot} from "react-hot-loader";
import img from "../static/images/made-with-bulma.png";


class Tag extends Component{
    render() {
        return(
            <div className="Tag">
                <a href="https://bulma.io">
                    <img src={img} alt="Made with Bulma" width="128" height="24" />
                </a> 
            </div>
        );
    }
}

export default hot(module)(Tag);
