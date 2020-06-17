import React, { useState, useEffect } from 'react';
import { SERVER_URL, SNAKE_SPEED } from '../../utils/variables';
import { getRandomCoords } from '../../utils/utils';
import './style.css';

const webSocket = new WebSocket(SERVER_URL);

webSocket.onopen = () => {
  webSocket.addEventListener('message', (coordinates) => {
    console.log('Coordinates RECEIVED', JSON.parse(coordinates.data));
  });
};

const Snake = (props) => {
  const [snakeCoordinates, setSnakeCoordinates] = useState(props.coords || [[50, 0], [50, 3], [50, 6]]);
  const [snakeDirection, setSnakeDirection] = useState('Down');

  const [foodCoords, setFoodCoords] = [props.foodCoords, props.foodCoordsSetter];
  const [score, setScore] = [props.score, props.scoreSetter];

  const gameOver = () => {
    props.setGameOver(true);
    // Reset the snake coords
    setSnakeCoordinates([50, 0], [50, 3], [50, 6]);
    setSnakeDirection('Down');
  }

  const snakeCrossBoundaries = () => {
    const snakeCoords = [...snakeCoordinates];
    let head = snakeCoords[snakeCoords.length - 1];
    if (head[0] >= 97 || head[1] >= 97 || head[0] <= 1 || head[1] <= 1) {
      gameOver();
    }
  }

  const snakeHitsItself = () => {
    const snakeCoords = [...snakeCoordinates];
    let head = snakeCoords[snakeCoords.length - 1];
    snakeCoords.pop();
    snakeCoords.forEach(coords => {
      if (coords[0] === head[0] && coords[1] === head[1]) {
        gameOver();
      }
    })
  }

  const snakeEatFood = () => {
    const snakeCoords = [...snakeCoordinates];
    let head = snakeCoords[snakeCoords.length - 1];
    let food = foodCoords;
    if (head[0] === food[0] && head[1] === food[1]) {
      // Update the state of the food
      setFoodCoords(getRandomCoords());
      // Update the score
      setScore(score + 5);
      // Call function to increase the length of the snake
      increaseSnakeLength();
    }
  }

  const increaseSnakeLength = () => {
    const longSnakeCoordinates = [...snakeCoordinates];
    const newCoordinates = [];
    longSnakeCoordinates.unshift(newCoordinates);
    setSnakeCoordinates(longSnakeCoordinates);
  }

  const moveSnake = () => {
    const snakeCoords = [...snakeCoordinates];
    // console.log('Sending.... ', snakeCoords);
    // webSocket.send(JSON.stringify(snakeCoords));
    // Taking the last element as head
    let head = snakeCoords[snakeCoords.length - 1];
    const direction = snakeDirection;

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
    setSnakeCoordinates(snakeCoordinates.map((_element, index) => snakeCoords[index]));
  }

  useEffect(() => {
    document.addEventListener("keydown", _handleKeyDown);
    return () => {
      document.removeEventListener("keydown", _handleKeyDown);
    }
  });

  useEffect(() => {
    snakeCrossBoundaries();
    snakeHitsItself();
    snakeEatFood();
    const timerId = window.setTimeout(() => moveSnake(), SNAKE_SPEED);
    return () => {
      window.clearTimeout(timerId);
    }
  }, [moveSnake, snakeCoordinates, snakeEatFood, snakeCrossBoundaries, snakeHitsItself]);

  const _handleKeyDown = (event) => {
    if (event.keyCode === 37) {
      setSnakeDirection('Left');
    } else if (event.keyCode === 38) {
      setSnakeDirection('Up');
    } else if (event.keyCode === 39) {
      setSnakeDirection('Right');
    } else if (event.keyCode === 40) {
      setSnakeDirection('Down');
    }
  }

  return (
    <>
      {
        snakeCoordinates.map((coords, key) => {
          const style = {
            left: `${coords[0]}%`,
            top: `${coords[1]}%`
          }
          return (
            <div className="snake-module" style={style} key={key}></div>
          );
        })
      }
    </>
  );
}

export default Snake;