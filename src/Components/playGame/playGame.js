import React from 'react';
import Snake from '../snake/snake';
import Food from '../food/food';
import Score from '../score/score';
import LevelButton from '../levelButton/levelButton';
import { getRandomCoords } from '../../utils/utils';
import { SERVER_URL } from '../../utils/variables';
import './style.css';

const webSocket = new WebSocket(SERVER_URL);

webSocket.onopen = () => {
  webSocket.addEventListener('message', (coordinates) => {
    console.log('Coordinates RECEIVED', JSON.parse(coordinates.data));
  });
};

class PlayGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newbie: false,
      intermediate: false,
      expert: false,
      // Hardcoded positions of the snake-modules on init.
      snakeCoordinates: [[50, 0], [50, 3], [50, 6]],
      direction: 'Down',
      foodCoordinates: getRandomCoords(),
      score: 0
    }
  }

  // Call on Init
  componentDidMount = () => {
    document.addEventListener("keydown", this._handleKeyDown);
  }

  // // Call on each Update
  componentDidUpdate = () => {
    this.snakeCrossBoundaries();
    this.snakeHitsItself();
    this.snakeEatFood();
  }

  // Call in the End
  componentWillUnmount = () => {
    document.removeEventListener("keydown", this._handleKeyDown);
    document.removeEventListener("click", this._handleButtonClick);

  }

  _handleKeyDown = (event) => {
    console.log(event);
    if (event.keyCode === 37) {
      this.setState({ direction: 'Left' })
    } else if (event.keyCode === 38) {
      this.setState({ direction: 'Up' })
    } else if (event.keyCode === 39) {
      this.setState({ direction: 'Right' })
    } else if (event.keyCode === 40) {
      this.setState({ direction: 'Down' })
    }
  }

  moveSnake = () => {
    const snakeCoords = [...this.state.snakeCoordinates];
    console.log('Sending.... ', snakeCoords);
    webSocket.send(JSON.stringify(snakeCoords));
    // Taking the last element as head
    let head = snakeCoords[snakeCoords.length - 1];
    const direction = this.state.direction;

    if (direction === 'Left') {
      head = [head[0] - 2, head[1]]
    } else if (direction === 'Up') {
      head = [head[0], head[1] - 2]
    } else if (direction === 'Right') {
      head = [head[0] + 2, head[1]]
    } else if (direction === 'Down') {
      head = [head[0], head[1] + 2]
    }

    snakeCoords.push(head);
    // Just remove the first element/ tail of the snake array just to interpret as snake is moving
    snakeCoords.shift();
    this.setState({ snakeCoordinates: snakeCoords });
  }


  // Conditions for Game Over
  snakeCrossBoundaries = () => {
    const snakeCoords = [...this.state.snakeCoordinates];
    let head = snakeCoords[snakeCoords.length - 1];
    if (head[0] >= 97 || head[1] >= 97 || head[0] <= 1 || head[1] <= 1) {
      this.gameOver();
    }
  }

  snakeHitsItself = () => {
    const snakeCoords = [...this.state.snakeCoordinates];
    let head = snakeCoords[snakeCoords.length - 1];
    snakeCoords.pop();
    snakeCoords.forEach(coords => {
      if (coords[0] === head[0] && coords[1] === head[1]) {
        this.gameOver();
      }
    })
  }

  snakeEatFood = () => {
    const snakeCoords = [...this.state.snakeCoordinates];
    let head = snakeCoords[snakeCoords.length - 1];
    let food = this.state.foodCoordinates;
    if (head[0] === food[0] && head[1] === food[1]) {
      // Update the state of the food
      this.setState({ foodCoordinates: getRandomCoords() });
      // Update the score
      this.setState({ score: this.state.score + 5 });
      // Call function to increase the length of the snake
      this.increaseSnakeLength();
    }
  }

  increaseSnakeLength = () => {
    const longSnakeCoordinates = [...this.state.snakeCoordinates];
    const newCoordinates = [];
    longSnakeCoordinates.unshift(newCoordinates);
    this.setState({ snakeCoordinates: longSnakeCoordinates })
  }


  gameOver = () => {
    alert(`Game Over. Your Score is ${this.state.score}`);
    // Reset the snake coords
    this.setState({
      newbie: false,
      intermediate: false,
      expert: false,
      // Snake speed is in Milliseconds (ms).
      snakeSpeed: 100,
      // Hardcoded positions of the snake-modules on init.
      snakeCoordinates: [[50, 0], [50, 3], [50, 6]],
      direction: 'Down',
      foodCoordinates: getRandomCoords(),
      score: 0
    });
  }

  renderRow(props) {
    return (
      <tr>
        <td>{props.id}</td>
        <td>{props.name}</td>
      </tr>
    );
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-10">
            <LevelButton newBie={this.state.newbie} intermediate={this.state.intermediate} expert={this.state.expert} moveSnake={this.moveSnake} />
            <div className="game-window">
              <Snake snakeCoordinates={this.state.snakeCoordinates} />
              <Food foodCoordinates={this.state.foodCoordinates} />
            </div>
          </div>
          <h1 className="main-title">{this.props.title}</h1>

          {/* LEADERBOARD */}
          <div className="col-md-2">
            <div className="leaderboard-wrapper">
              <div className="para-wrapper">
                <p className="custom-padding">Player Name: <strong>{this.props.name}</strong></p>
                <p className="custom-padding">Game ID: <strong>{this.props.uuid}</strong></p>
                <div className="custom-padding">
                  <Score score={this.state.score} />
                </div>
                <p className="custom-padding"><span className="dot"></span><strong> ONLINE PLAYERS</strong></p>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.players.map((obj, key) => {
                    return (
                      <tr key={key}>
                        <td>{obj.id}</td>
                        <td>{obj.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default PlayGame;
