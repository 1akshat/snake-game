import React, { useEffect, useState } from 'react';
import { getRandomCoords } from '../../utils/utils';
import Food from '../food/food';
import LeaderBoard from '../loaderboard/loaderboard';
import Snake from '../snake/snake';
import './style.css';

const GameBoard = (props) => {
  const [foodCoords, setFoodCoords] = useState(getRandomCoords());
  const [score, setScore] = useState(0);
  const [otherUsersSnake, setOtherUsersSnake] = useState(null);
  const webSocket = props.socket;

  const otherUsersID = props.usersID || [];

  useEffect(() => {
    if (webSocket !== undefined) {
      webSocket.addEventListener('message', updateOtherUsersData);
      return closeWebSocket;
    }
  })

  const closeWebSocket = () => {
    webSocket.close();
  }

  const updateOtherUsersData = (message) => {
    const usersData = JSON.parse(message.data);
    let filteredOtherUsers;

    if (Array.isArray(usersData)) {
      filteredOtherUsers = usersData.filter(user => otherUsersID.indexOf(user.id) >= 0);
    }

    if (Array.isArray(filteredOtherUsers)) {
      const otherUsersSnake = filteredOtherUsers.map(users => users.snake);
      setOtherUsersSnake(otherUsersSnake);
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-md-10">
          <div className="game-window">
            <Snake foodCoords={foodCoords} foodCoordsSetter={setFoodCoords} score={score} scoreSetter={setScore} setGameOver={props.setGameOver} players={props.players} uuid={props.uuid} socket={webSocket} />
            {
              otherUsersSnake &&
              otherUsersSnake.map(snake => <Snake coords={snake.coords} />)
            }
            <Food foodCoordinates={foodCoords} />
          </div>
        </div>
        <div className="col-md-2">
          <LeaderBoard name={props.name} uuid={props.uuid} players={props.players} score={score} />
        </div>
      </div>
    </>
  )

}

export default GameBoard;