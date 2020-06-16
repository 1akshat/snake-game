import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Card, Button, Form } from 'react-bootstrap';
import GameBoard from '../gameBoard/gameBoard';
import { randomNumber } from '../../utils/number';
import { SERVER_URL, NO_INPUT_ALERT_MESSAGE } from '../../utils/variables';

const StartGame = () => {
  const [name, setName] = useState(null);
  const [click, setClick] = useState(false);
  const [uuid, setUuid] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const createSocketConnection = () => {
    const webSocket = new WebSocket(SERVER_URL);
    const user = { id: randomNumber(6), name: name };
    webSocket.onopen = () => {
      // user is registered to back-end server
      webSocket.send(JSON.stringify(user));
      webSocket.addEventListener('message', (message) => {
        // message.data will be used to recieve user objects
        const allPlayersObject = JSON.parse(message.data);
        setPlayers(allPlayersObject);
        setUuid(user.id);
      });
    };
  }

  const handleChange = (event) => {
    setName(event.target.value);
  }

  const handleClick = () => {
    if (name) {
      setClick(true);
      setIsGameOver(false);
      // create a connection with the server
      createSocketConnection();
    } else {
      alert(NO_INPUT_ALERT_MESSAGE);
    }
  }

  return (
    <>
      {(click && !isGameOver) ?
        <GameBoard name={name} uuid={uuid} players={players} setGameOver={setIsGameOver} />
        :
        <div className="container">
          <Card border="dark" style={{ width: '40rem' }} className="cardWrapper">
            <Card.Header className="cardHeader">The Snake Game</Card.Header>
            <Card.Body>
              <Card.Text>
                <Form.Control type="text" placeholder="PLAYER NAME" style={{ width: '300px', textAlign: 'center', display: 'block', margin: '0 auto', marginBottom: '20px' }} onChange={handleChange} />
                <Button variant="outline-primary" className="start-button" onClick={handleClick}>Play</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      }
    </>
  )
}

export default StartGame;