import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Container, Image, Form, FormControl } from "react-bootstrap";

const chatSocket = new WebSocket('ws://localhost/ws/chats/default/')

function App() {
  const [log, setLog] = useState('');
  const [message, setMessage] = useState('');

  chatSocket.onmessage = e => {
    const data = JSON.parse(e.data);
    setLog(log + data.message + '\n');
  }

  chatSocket.onclose = e => {
    console.error("WebSocket error!");
  }

  useEffect(() => {

  }, [setLog, setMessage]);

  // const [room, setRoom] = useState(null);
  // const [chat, setChat] = useState(false);

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   setChat(true);
  // }

  // const handleChange = e => {
  //   setRoom(e.target.value);
  // }

  const handleSubmit = e => {
    e.preventDefault();

    // Send message
    chatSocket.send(JSON.stringify({ 'message': message }));
    setMessage('');
  }

  const handleChange = e => {
    e.preventDefault();
    setMessage(e.target.value);
  }

  return (
    <Container>
      <Image src={logo} width={64} height={64} />
      <p>Hello, World!</p>

      <Form onSubmit={handleSubmit}>
        <FormControl as="textarea" type="text" id="log" value={log} />
        <FormControl type="text" onChange={handleChange} />
        <FormControl type="submit" value="Send" />
      </Form>
    </Container>
  );
}

export default App;
