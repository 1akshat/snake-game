import React from 'react';
import Score from '../score/score';
import './style.css';

const LeaderBoard = (props) => {
  const score = 0;
  return (
    <>
      <div className="leaderboard-wrapper">
        <div className="para-wrapper">
          <p className="custom-padding">Player Name: <strong>{props.name}</strong></p>
          <p className="custom-padding">Game ID: <strong>{props.uuid}</strong></p>
          <div className="custom-padding">
            <Score score={score} />
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
            {props.players.map((obj, key) => {
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
    </>
  )
}

export default LeaderBoard;