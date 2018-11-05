import React, { Component} from "react";
import {hot} from "react-hot-loader";

function Line(props) {
    return (
        <tr className="animated fadeIn">
            <th>{props.value['id']}</th>
            <td>{props.value['data']}</td>
            <td className="has-text-centered">
                <button className="button is-danger is-small"  onClick={props.onClick}>
                    <i className="fas fa-backspace" />
                </button>
            </td>
        </tr>
    );
}

class DataForm extends Component {
    constructor(props){
        super(props);
        this.state ={
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitDatabase = this.submitDatabase.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    submitDatabase(event) {
        let url="http://localhost:5000/add/example";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                newData: this.state.value,
            })
        })
        .then((results) => results.json())
        .then((resJson) => {
            this.props.addData(resJson);
        })
        event.preventDefault();

    }
    render() {
        return (
            <div className="DataForm">
                <form onSubmit={this.submitDatabase}>
                    <label>
                        Data:
                        <input 
                            id="data"
                            type="text" 
                            value={this.state.value}
                            onChange={this.handleChange} /> 
                    </label>
                    <br />
                    <input 
                        className="button is-primary" 
                        type="submit" 
                        value="Submit!"
                        />
                </form>
            </div>
        )
    }
}

class Data extends Component {
    constructor(props){
        super(props);
    }
    getLines() {
        let d = [];
        for(let i=0; i < this.props.examples.length; i++){
            let id = this.props.examples[i]['id'];
            d.push(
                <Line 
                    value={this.props.examples[i]} 
                    key={id} 
                    onClick={() => this.props.onClick(id)}/>);
        }
        return d;
    }
    render() {
        const loading = this.props.loading;
        let body = loading ?
            (<div className="has-text-centered">
                <br />
                <i className="fas fa-spinner icon fa-spin is-large has-text-info" />
            </div>) : 
            (
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <tbody>            
                    {this.getLines()}
                </tbody>
            </table>
            );
        return(
            <div>{body}</div>
        );
    }
}
class DBView extends Component {
    constructor(props){
        super(props);
        this.state = {
            examples: [],
            loading: true,
        };
        this.sleep = this.sleep.bind(this);
        this.queryDatabase = this.queryDatabase.bind(this);
        this.addData = this.addData.bind(this);
    }
    componentDidMount(){
        // Ensure mounting before accessing API
        this.queryDatabase();
    }
    clearDB() {
        this.setState({
            examples: []
        })
    }
    handleDelete(id) {
        const examples = this.state.examples.slice();
        var remaining_item = examples.filter(item => item['id'] != id);
        console.log(remaining_item);
        let url = "http://localhost:5000/delete/example"
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            })
        })
        .then(() => {
            this.setState({examples: remaining_item});
        })
        .catch((err) => {
            console.log(err)
        });

    }
    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }
    queryDatabase() {
        this.setState({loading:true});
        this.clearDB();
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
                    let new_data = []
                    for (let i = 0; i < result.length; i++) {
                        let res = result[i];
                        new_data.push(res)
                    }
                    this.setState({
                        examples: examples.concat(new_data),
                        loading: false,
                    });
                },
            )
            .catch(() => {
                console.log('Swallowed!')
            });
    }
    addData(i) {
        const examples = this.state.examples.slice();
        let new_data = []
        new_data.push(i);
        this.setState({
            examples: examples.concat(new_data),
        });
    }
    render() {
        return(
            <div>
                <div className="columns">
                    <div className="container column">
                        <DataForm addData={this.addData} examples={this.state.examples}/>
                    </div>
                    <div className="box container column">
                        <div className="container has-text-centered">
                            <a className="button is-primary" onClick={() => this.queryDatabase()}>
                                Query Database
                            </a>
                            <a className="button is-danger" onClick={() => this.clearDB()}>
                                Clear Results
                            </a>
                        </div>
                        <hr />
                        <Data 
                            loading={this.state.loading} 
                            examples={this.state.examples}
                            onClick={(id) => this.handleDelete(id)}
                            />
                    </div>
                </div>
            </div>
        );
    }
}

class Connector extends Component{
    render(){
        return(
            <div className="database-connector">
                <h1>The "DATABASE" Section</h1>
                <hr />
                <DBView />
            </div>
        );
    }
}
export default hot(module)(Connector);
