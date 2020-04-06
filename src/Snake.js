import React from 'react';

const Snake = ({snakeCoordinates}) => {
    return (
        <React.Fragment>
            {
                snakeCoordinates.map( (coords, key) => {
                    const style = {
                        left: `${coords[0]}%`,
                        top: `${coords[1]}%`
                    }
                    return ( <div className="snake-module" style={style} key={key}></div> );
                })
            }

        </React.Fragment>
    );
}

export default Snake;