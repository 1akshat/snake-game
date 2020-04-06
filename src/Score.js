import React from 'react';

const Score = ({ score }) => {

    return (
        <React.Fragment>
            <div className="score">
                <h2>Score: <span style={{ color: '#b6b428' }}>{score}</span></h2>
            </div>
        </React.Fragment>
    )
}

export default Score;