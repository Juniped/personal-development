import React, { Component} from "react";
import {hot} from "react-hot-loader";

function Line(props) {
    return (
        <tr className="animated lightSpeedIn">
            <th>{props.num}</th>
            <td>{props.value['random_data']}</td>
        </tr>
    );
}


class Data extends Component {
    constructor(props){
        super(props);
    }
    getLines() {
        let d = [];
        // d.push()
        let row = [];
        let row_num = 1;
        for(let i=0; i < this.props.value.length; i++){
            d.push(<Line value={this.props.value[i]} num={i + 1} key={i + 1} />);
        }
        return d;
    }
    render() {
        return (
            <div className="box">
                <div className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <tbody>
                    
                        {this.getLines()}
                    </tbody>
                </div>
            </div>
        );
    }
    // let d = []
    // for (var obj in props){
    //     d.push({})
    // }
    // return (

    // )
}

class Connector extends Component{
    constructor(props){
        super(props);
        this.state = {
            examples: [],
        };
    }
    clearDB() {
        this.setState({
            examples: []
        })
    }
    
    queryDatabase() {
        let url="http://localhost:5000/dict";

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json())
            .then(
                (result) => {
                    const examples = this.state.examples.slice()
                    let foo = []
                    for (let i = 0; i < result.length; i++) {
                        let res = result[i]['Example'];
                        foo.push(res)
                    }
                    this.setState({
                        examples: examples.concat(foo),
                    });
                    console.log(examples);


                },
                (error) => {
                    this.setState({
                        random_data:"error"
                    });
                }
            )
    }
    render(){
        return(
            <div className="database-connector">
                <h1>Hello Database</h1>
                
                <div className="section animated fadeInDown">
                    <div className="container">
                        <a className="button is-primary" onClick={() => this.queryDatabase()}>
                            Query Database
                        </a>
                        <a className="button is-danger" onClick={() => this.clearDB()}>
                            Clear Results
                        </a>
                    </div>
                    <div className="container">
                        <Data value={this.state.examples} />
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default hot(module)(Connector);
