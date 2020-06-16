import React, { useState } from 'react';
import './style.css';
import Snake from '../snake/snake';
import Food from '../food/food';
import { getRandomCoords } from '../../utils/utils';
import LeaderBoard from '../loaderboard/loaderboard';

const GameBoard = (props) => {
  const [foodCoords, setFoodCoords] = useState(getRandomCoords());
  const [score, setScore] = useState(0);

  return (
    <>
      <div className="row">
        <div className="col-md-10">
          <div className="game-window">
            <Snake foodCoords={foodCoords} foodCoordsSetter={setFoodCoords} score={score} scoreSetter={setScore} />
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