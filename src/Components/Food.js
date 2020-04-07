import React from 'react';

const Food = ({foodCoordinates}) => {
    const style = {
        left: `${foodCoordinates[0]}%`,
        top: `${foodCoordinates[1]}%`
    }

    return (
        <div className="snake-food" style={style}></div>
    );
}

export default Food;