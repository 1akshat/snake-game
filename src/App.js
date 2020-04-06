import React from 'react';
import Snake from './Snake';
import Food from './Food';
import Score from './Score';
import Gameover from './Gameover';


const getRandomCoords = () => {
  const [min, max] = [1, 97];
  // Reference: https://gist.github.com/kerimdzhanov/7529623
  const xCord = Math.round((Math.random() * (max - min) + min)/2) * 2;
  const yCord = Math.round((Math.random() * (max - min) + min)/2) * 2;
  return [xCord, yCord]
}


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newbie: false,
      intermediate: false,
      expert: false,
      // Hardcoded positions of the snake-modules on init.
      snakeCoordinates: [ [50,0], [50,3], [50,6] ],
      direction: 'Down',
      foodCoordinates: getRandomCoords(),
      score: 0
    }
  }

  startNewbie = () => {
    this.setState({ newBie: true});
    setInterval(this.moveSnake,300);
  }

  startIntermediate = () => {
    this.setState({ intermediate: true});
    setInterval(this.moveSnake, 80);
  }

  startExpert = () => {
    this.setState({ expert: true});
    setInterval(this.moveSnake,30);
  }

  // REACT LIFECYCLE METHODS

  // Call on Init
  componentDidMount = () => {
    document.addEventListener("keydown", this._handleKeyDown);
  }

  // Call on each Update
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
    // Taking the last element as head
    let head = snakeCoords[snakeCoords.length - 1];
    const direction = this.state.direction;
    console.log(direction);

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
      this.setState( { foodCoordinates: getRandomCoords() });
      // Update the score
      this.setState( { score: this.state.score + 5 });
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
      snakeCoordinates: [ [50,0], [50,3], [50,6] ],
      direction: 'Down',
      foodCoordinates: getRandomCoords(),
      score: 0
    });
  }

  render() {
    return (
        <React.Fragment>
          <h1 className="main-title">{ this.props.title }</h1>
          <div className="button-group">
            <p>Click on the buttons below to start the game.</p>
            <button className="play-button" onClick={this.startNewbie}>Newbie</button>
            <button className="play-button" onClick={this.startIntermediate}>Intermediate</button>
            <button className="play-button" onClick={this.startExpert}>Expert</button>
          </div>
          <Score score={this.state.score}/>
          <div className="game-window">
            <Snake snakeCoordinates={ this.state.snakeCoordinates }/>
            <Food foodCoordinates={ this.state.foodCoordinates }/>
          </div>
        </React.Fragment>
    )
  }
}

export default App;
