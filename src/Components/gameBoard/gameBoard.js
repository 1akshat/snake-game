import React, { useEffect, useState } from 'react';
import { getRandomCoords } from '../../utils/utils';
import Food from '../food/food';
import LeaderBoard from '../loaderboard/loaderboard';
import Snake from '../snake/snake';
import './style.css';
import deepEqual from 'deep-equal';

const GameBoard = (props) => {
  const [foodCoords, setFoodCoords] = useState(getRandomCoords());
  const [score, setScore] = useState(0);
  const [otherUsers, setOtherUsers] = useState([]);
  const webSocket = props.socket;

  // const otherUsersID = props.usersID || [];

  useEffect(() => {
    if (webSocket !== undefined) {
      webSocket.addEventListener('message', updateOtherUsersData);
      //   // return closeWebSocket;
    }

    return () => webSocket.removeEventListener('message', updateOtherUsersData);
  })

  const closeWebSocket = () => {
    webSocket.close();
  }

  const updateOtherUsersData = (message) => {
    const usersData = JSON.parse(message.data);
    let filteredOtherUsers = [];

    if (props.uuid === null || !Array.isArray(usersData)) {
      return;
    }

    filteredOtherUsers = usersData.filter(user => user.id !== props.uuid);

    for (const otherUser of filteredOtherUsers) {
      console.log(otherUsers);
      const [otherUserCurrentData] = otherUsers.filter(user => user.id === otherUser.id);

      if (otherUserCurrentData === undefined) {
        return setOtherUsers(otherUsers => [...otherUsers, otherUser]);
      }

      if (!deepEqual(otherUser.snakeCoords, otherUserCurrentData.snakeCoords)) {
        return setOtherUsers(otherUsers.map(user => {
          if (user.id === otherUserCurrentData.id) {
            user.snakeCoords = otherUserCurrentData.snakeCoords
          }
          return user;
        }))
      }
    }

    // console.log(otherUsers.map(user => {
    //   const otherUser = filteredOtherUsers.filter(otherUser => otherUser.id === user.id);
    //   if (otherUser.length === 1) {
    //     user.snakeCoords = otherUser.snakeCoords;
    //   }
    //   return user;
    // }));
  }

  return (
    <>
      <div className="row">
        <div className="col-md-10">
          <div className="game-window">
            <Snake foodCoords={foodCoords} foodCoordsSetter={setFoodCoords} score={score} scoreSetter={setScore} setGameOver={props.setGameOver} players={props.players} uuid={props.uuid} socket={webSocket} />
            {
              Array.isArray(otherUsers) &&
              otherUsers.length > 0 &&
              otherUsers.map(snake => <Snake coords={snake.coords} />)
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