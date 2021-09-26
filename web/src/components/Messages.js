import React, { Component, useState } from "react";
import { Form, FormControl } from "react-bootstrap";


class Messages extends Component {
    constructor(props) {
        super(props);

        // Make a chat connection to transfer messages
        this.chatSocket = new WebSocket(`ws://localhost/ws/chats/${props.id}/`);

        this.state = {
            log: '',
            body: ''
        }

        this.chatSocket.onmessage = e => {
            const data = JSON.parse(e.data);
            this.setState({ log: this.state.log + data.body + '\n' });
        }

        this.chatSocket.onclose = e => {
            console.error("WebSocket error!");
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        // Send message
        this.chatSocket.send(JSON.stringify({ body: this.state.body }));
        this.setState({ body: '' })
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({ body: e.target.value });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormControl as="textarea" type="text" id="log" value={this.state.log} className="mb-3" />
                <FormControl type="text" onChange={this.handleChange} className="mb-1" />
                <FormControl type="submit" value="Send" />
            </Form>
        );
    }
}
export default Messages;