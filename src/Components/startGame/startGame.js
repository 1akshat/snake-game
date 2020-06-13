import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Card, Button, Form } from 'react-bootstrap';
import PlayGame from '../playGame/playGame';

const StartGame = () => {
  const [name, setName] = useState(null);
  const [click, setClick] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  }

  const handleClick = () => {
    if (name) {
      setClick(true);
      console.log('Click = ', click)
    } else {
      alert('please provide a name before continuing.');
    }
  }

  return (
    <>
      {click ? <PlayGame name={name} /> :
        <div className="container">
          <Card border="dark" style={{ width: '40rem' }} className="cardWrapper">
            <Card.Header className="cardHeader">The Snake Game</Card.Header>
            <Card.Body>
              <Card.Text>
                <Form.Control type="text" placeholder="PLAYER NAME" style={{ width: '300px', textAlign: 'center', display: 'block', margin: '0 auto' }} onChange={handleChange} />
                <hr />
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
