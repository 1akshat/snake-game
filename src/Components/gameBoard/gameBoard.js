import React from 'react';
import './style.css';
import Snake from '../snake/snake';

const GameBoard = () => {
  return (
    <>
      <div className="game-window">
        <Snake />
      </div>
    </>
  )

}

export default GameBoard;