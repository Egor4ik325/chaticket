import { Fragment, useState, useEffect } from "react";
import { Image, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../logo.svg";
import { chatList } from "../adaptors";

export default function Sidebar() {
    const [chats, setChats] = useState(null);

    useEffect(() => {
        chatList().then(setChats);
    }, [setChats])

    function renderChats() {
        if (chats) {
            const chatListGroupItems = chats.map(chat =>
                <Link className="list-group-item list-group-item-action" to={`/chats/${chat.id}`}>
                    {chat.name}
                </Link>
            );

            return chatListGroupItems;
        }
        return (
            <Fragment>
                <div className="d-flex align-items-center py-2">
                    <span class="spinner-border text-primary me-2"></span>
                    <span>Loading chats...</span>
                </div>
            </Fragment>
        );
    }

    return (
        <div
            className="d-flex flex-column align-items-stretch flex-shrink-0 bg-light"
            style={{ height: '100vh' }}
        >
            <Link
                className="d-flex align-items-center flex-shrink-0
                p-3 link-dark text-decoration-none border-bottom"
                to="/"
            >
                <Image className="me-2" src={logo} width={48} />
                <span className="fs-3 fw-bold">Chaticket</span>
            </Link>
            <Link to="/chats" className="btn btn-success m-3">
                Create chat
            </Link>
            <ListGroup className="border-bottom scrollarea mx-1">
                {renderChats()}
            </ListGroup>
        </div >
    );
}