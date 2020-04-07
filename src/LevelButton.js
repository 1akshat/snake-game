import React, {useState} from 'react';


const LevelButton = (props) => {
	
	const [status, setStatus] = useState(0);

	const startNewbie = () => {
    setStatus({ newBie: true });
    setInterval(props.moveSnake,300);
  }

  const startIntermediate = () => {
    setStatus({ intermediate: true });
    setInterval(props.moveSnake, 80);
  }

  const startExpert = () => {
    setStatus({ expert: true });
    setInterval(props.moveSnake,30);
  }

	return (
		<React.Fragment>
			<div className="button-group">
        <p>Click on the buttons below to start the game.</p>
        <button className="play-button" onClick={startNewbie}>Newbie</button>
        <button className="play-button" onClick={startIntermediate}>Intermediate</button>
        <button className="play-button" onClick={startExpert}>Expert</button>
      </div>
		</React.Fragment>
	)
}

export default LevelButton;