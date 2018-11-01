import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "../static/css/Game.css";

function Square(props) {
  if (props.winner) {
    return (
      <button className="square" onClick={props.onClick}>
      <mark><b>{props.value}</b></mark>
    </button>
    )
  } else {
    return (
      <button className="square" onClick={props.onClick}>
        <small>{props.value}</small>
      </button>
    );
  }
}

class Board extends React.Component {
  renderBoard() {
    let board = []
    for (let i = 0; i < 9; i += 3) {
      let row = []
      for (let j = i; j < i + 3; j++) {
        let key="square"+j
        let winningLine = false;
        if ( this.props.winningLines ){
          winningLine = j in this.props.winningLines;
        }
        if (winningLine) {
          row.push(
            <Square 
              key={key} 
              value={this.props.squares[j]} 
              onClick={() => this.props.onClick(j)} 
              winner={true} />
          );
        } else {
          row.push(
            <Square 
              key={key} 
              value={this.props.squares[j]} 
              onClick={() => this.props.onClick(j)} 
              winner={false} />
          );
        }
      }
      let key = "row" + i/3;
      board.push(<div key={key} className="board-row">{row}</div>);
    }
    return board;
  }
  render() {
    return (
      <div>
        {this.renderBoard()}
      </div>
    );
  }
}

class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        moves: [],
      }],
      draw: false,
      stepNumber: 0,
      xIsNext: true,
      order: "Descending",
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const moves = current.moves.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    } else if (isDraw(squares)) {
      this.setState({draw: true});
      return; 
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    moves.push(i);
    this.setState({
      history: history.concat([{
        squares: squares,
        moves: moves,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  toggleOrder() {
    if (this.state.order === "Descending") {
      this.setState({order:"Ascending"});
    } else {
      this.setState({order:"Descending"});
    }
  }
  renderMovesList() {
    const history = this.state.history;
    const order = this.state.order;
    let moves = history.map((step,move) => {
      const pos = getMove(step.moves[move - 1]);
      const desc = move ?
          'Go to move #' + move + ": " + pos :
          'Go to game start';
      const link = (
        <li key={move}>
        <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
      if (move == this.state.stepNumber) {
        return (<b key={move}>{link}</b>);
      } else {
        return link;
      }
    });
    if (order === "Ascending"){
      moves = moves.reverse();
      return(<ol reversed>{moves}</ol>);
    }
    return (<ol>{moves}</ol>);
  }
  render() {
    const order = this.state.order;
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const draw = isDraw(current.squares);
    let winningLines = null;
    let status;
    if (winner) {
      status = 'Winner: ' + winner.winner;
      winningLines = winner.lines;
    } else if (draw){
      status = 'DRAW';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="Game animated fadeInDown">
        <div className="container">
          <div className="tile">
            <div className="notification has-info">
            <h3>
              Game code is from completion and expansion of tutorial found  
              <a href="https://reactjs.org/tutorial/tutorial.html#completing-the-game"> here</a>
            </h3>
            </div>
          </div>
        </div>
        <hr className="hr" style={hrStyle} />
        <div className="section">
          {/* <br /> */}
          <div className="container">
            <div className="columns">
              <div className="column is-one-quarter is-offset-one-quarter">
                <div className="game-board">
                  <Board
                    squares={current.squares}
                    winningLines={winningLines}
                    onClick={(i) => this.handleClick(i)}
                  />
                </div>
              </div>
              <div className="column is-one-quarter">
                <div className="game-info">
                  <div>{status}</div>
                  <button onClick={() => this.toggleOrder()}>{order}</button>
                  {this.renderMovesList()}
                </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
export default hot(module)(Game);
  
// Helper Functions ---------------------------------------
function getMove(i) {
  const pairs = [
    "(1,1)",
    "(2,1)",
    "(3,1)",
    "(1,2)",
    "(2,2)",
    "(3,2)",
    "(1,3)",
    "(2,3)",
    "(3,3)",
  ];
  return pairs[i];
}

function isDraw(squares){
  for (let i = 0; i < squares.length; i++){
    if (squares[i] == null){
      return false;
    }
  }
  return true;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      let val = {
        winner: squares[a],
        lines: lines[i]
      };
      return val;
    }
  }
  return null;
}
  

// Style Constants

const hrStyle = {
  marginBottom: "0px"

}