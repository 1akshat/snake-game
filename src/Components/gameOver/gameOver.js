import React from 'react';

const Gameover = ({ state, getRandomCoords }) => {
  this.setState({
    // Snake speed is in Milliseconds (ms).
    snakeSpeed: 100,
    // Hardcoded positions of the snake-modules on init.
    snakeCoordinates: [[50, 0], [50, 3], [50, 6]],
    direction: 'Down',
    foodCoordinates: getRandomCoords()
  });
  return (
    <p>Game Over!</p>
  )
}

export default Gameover;