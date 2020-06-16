import React, { useState } from 'react';
import './style.css';
import Snake from '../snake/snake';
import Food from '../food/food';
import { getRandomCoords } from '../../utils/utils';
import LeaderBoard from '../loaderboard/loaderboard';

const GameBoard = (props) => {
  const [foodCoords, setFoodCoords] = useState(getRandomCoords());

  return (
    <>
      <div className="row">
        <div className="col-md-10">
          <div className="game-window">
            <Snake foodCoords={foodCoords} foodCoordsSetter={setFoodCoords} />
            <Food foodCoordinates={foodCoords} />
          </div>
        </div>
        <div className="col-md-2">
          <LeaderBoard name={props.name} uuid={props.uuid} players={props.players} />
        </div>
      </div>
    </>
  )

}

export default GameBoard;