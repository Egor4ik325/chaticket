import React, { useState } from "react";
import { Form, FormControl } from "react-bootstrap";

const chatSocket = new WebSocket('ws://localhost/ws/chats/default/')

const Messages = props => {
    const [log, setLog] = useState('');
    const [message, setMessage] = useState('');

    chatSocket.onmessage = e => {
        const data = JSON.parse(e.data);
        setLog(log + data.message + '\n');
    }

    chatSocket.onclose = e => {
        console.error("WebSocket error!");
    }

    // useEffect(() => {

    // }, [setLog, setMessage]);

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
        <Form onSubmit={handleSubmit}>
            <FormControl as="textarea" type="text" id="log" value={log}
                className="mb-3"
            />
            <FormControl type="text" onChange={handleChange} className="mb-1" />
            <FormControl type="submit" value="Send" />
        </Form>
    );
}
export default Messages;