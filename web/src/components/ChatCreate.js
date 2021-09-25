import { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

import { userList, chatCreate } from "../adaptors";
import { HOME_PATH } from "../constants";

export default function ChatCreate(props) {
    const [users, setUsers] = useState(null);
    const [name, setName] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [isPublic, setIsPublic] = useState(null);
    const [members, setMembers] = useState(null);

    useEffect(() => {
        userList().then(setUsers);
    }, [setUsers])

    const handleNameChange = e => setName(e.target.value);
    const handleFullNameChange = e => setFullName(e.target.value);
    const handleIsPublicChange = e => setIsPublic(e.target.value);
    const handleMembersChange = e => setMembers(e.target.value);

    const handleSubmit = async e => {
        e.preventDefault();

        const data = {
            name: name,
            full_name: fullName,
            public: isPublic,
            members: [members]
        }
        const result = await chatCreate(data);

        if (result) {
            props.update();
            window.location.pathname = HOME_PATH;
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h3>Create chat</h3>
            <Row
                className="mb-2">
                <Col>
                    <Form.Control placeholder="Name" onChange={handleNameChange} />
                </Col>
                <Col>
                    <Form.Control placeholder="Full name" onChange={handleFullNameChange} />
                </Col>
            </Row>
            <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Public"
                onChange={handleIsPublicChange}
            />
            <Form.Label>Select Members</Form.Label>
            <Form.Control as="select" multiple className="mb-2" aria-describedby="passwordHelpBlock" onChange={handleMembersChange} >
                <option disabled>Open this select menu</option>
                {
                    users && users.map(user =>
                        <option value={user.pk}>{user.username}</option>)
                }
            </Form.Control>

            <p>
                <Form.Text id="passwordHelpBlock" muted>
                    Hold <b>cmd</b> to select multiple members.
                </Form.Text>
            </p>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}