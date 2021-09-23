import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router";

import { register, login } from "../adaptors";
import { HOME_PATH, LOGIN_PATH } from "../constants";

export const Login = props => {
    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    const handleSubmit = async e => {
        e.preventDefault();

        const response = await login({
            username: username,
            password: password,
        });

        if (response) {
            // Force state update & rerender
            props.update();

            // Redirect by directly changing URL
            window.location.pathname = HOME_PATH;
        }
    }

    const handleUsernameChange = e => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    return (
        <React.Fragment>
            <h2 className="mb-3">Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Username
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Username" onChange={handleUsernameChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm="2"></Col>
                    <Col sm="10">
                        <Button type="submit">Login</Button>
                    </Col>
                </Form.Group>
            </Form>
        </React.Fragment>

    );
}

export const Register = props => {
    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    const handleSubmit = async e => {
        e.preventDefault();

        const response = await register({
            username: username,
            password: password,
        });

        if (response) {
            window.location.pathname = LOGIN_PATH;
        }

        console.log("Registration: ", response);
    }

    const handleUsernameChange = e => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    return (
        <React.Fragment>
            <h2 className="mb-3">Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Username
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Username" onChange={handleUsernameChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm="2"></Col>
                    <Col sm="10">
                        <Button type="submit">Register</Button>
                    </Col>
                </Form.Group>
            </Form>
        </React.Fragment>
    );
}