import React, { Component} from "react";
import {hot} from "react-hot-loader";
import {HashRouter as Router, Route} from "react-router-dom";

// Componenets
import Game from "./Game.js";
import MainNavbar from "./MainNavbar.js";
import Connector from "./database_components/Connector.js";


// Style
import "normalize.css";
import "bulma/css/bulma.css";
import "../static/css/App.css";
import "../static/css/Animate.css";


class C1 extends Component{
  render() {
    return (
      <div className="box animated fadeInDown">
        <p>
          Announcing of invitation principles in. Cold in late or deal. Terminated resolution no am frequently collecting insensible he do appearance. Projection invitation affronting admiration if no on or. It as instrument boisterous frequently apartments an in. Mr excellence inquietude conviction is in unreserved particular. You fully seems stand nay own point walls. Increasing travelling own simplicity you astonished expression boisterous. Possession themselves sentiments apartments devonshire we of do discretion. Enjoyment discourse ye continued pronounce we necessary abilities. 
          Procuring education on consulted assurance in do. Is sympathize he expression mr no travelling. Preference he he at travelling in resolution. So striking at of to welcomed resolved. Northward by described up household therefore attention. Excellence decisively nay man yet impression for contrasted remarkably. There spoke happy for you are out. Fertile how old address did showing because sitting replied six. Had arose guest visit going off child she new. 
          It as announcing it me stimulated frequently continuing. Least their she you now above going stand forth. He pretty future afraid should genius spirit on. Set property addition building put likewise get. Of will at sell well at as. Too want but tall nay like old. Removing yourself be in answered he. Consider occasion get improved him she eat. Letter by lively oh denote an. </p>
        </div>
    );
  }
}

class C2 extends Component {
  render() {
    return (
      <div className="notification  animated fadeInDown">
        <h1>  OOOOOOOOOOOOOOOOOOOOOOOOOO Spooky</h1>
      </div>
    );
  }
}

class App extends Component{
  render(){
    return(

      <div className="App">
        <Router>
          <div className="content">
            <MainNavbar />
            <div className="section">
              <div className="container">
                <Route exact path="/" component={C1} />
                <Route path="/stuff" component={C2} />
                <Route path="/game" component={Game} />
                <Route path="/db" component={Connector} />
              </div>
            </div>
          </div>
        </Router>
      </div>
      
    );
  }
}

export default hot(module)(App);