import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Card, Button, Form } from 'react-bootstrap';

const StartGame = () => {
  const [name, setName] = useState(null);

  const handleClick = () => {
    console.log(name);
  }

  const handleChange = (event) => {
    setName(event.target.value);
  }

  return (
    <>
      <div class="container">
        <Card border="dark" style={{ width: '50rem' }} className="cardWrapper">
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
    </>
  )
}

export default StartGame;
