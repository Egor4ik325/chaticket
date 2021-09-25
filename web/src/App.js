import React, { Fragment, useEffect, useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";

import { Chat, Login, Register, ChatCreate, Sidebar } from "./components";
import { ensureCsrfCookie, getUser, logout } from "./adaptors"


function App() {
  ensureCsrfCookie();

  // Currect session (logged-in) user
  const [user, setUser] = useState(null);

  const update = useCallback(async () => {
    // Fetch & set session user
    getUser().then(setUser);
  }, [setUser])

  useEffect(() => {
    update();
  }, [update]);

  const handleLogout = async () => {
    await logout();
    await update();
  }

  return (
    <Router>
      <Row style={{ height: '100vh' }}>
        <Col sm="2" xs="3">
          <Sidebar />
        </Col>
        <Col sm="10" xs="9">
          <Container className="py-3">
            {/* Static content */}
            <h3>Home page</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/chat">Chat</Link></li>
              {
                user ?
                  <Fragment>
                    <div>Hello, <b>{user.username}</b>!</div>
                    <Button type="button" variant="dark" onClick={handleLogout}>Logout</Button>
                  </Fragment>
                  :
                  <Fragment>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                  </Fragment>
              }
            </ul>
            <hr />
            {/* Dynamic content */}
            <Switch>
              <Route exact path="/">
                <p>
                  Chaticket – real-time chat webapp.
                </p>
              </Route>
              <Route path="/chat">
                <Chat />
              </Route>
              <Route path="/login">
                <Login update={update} />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route exact path="/chats">
                <ChatCreate update={update} />
              </Route>
              <Route path="/chats/:id" children={<Chat />} />
            </Switch>
            {/* Static content */}
            <hr />
            <p>Some footer.</p>
          </Container>
        </Col>
      </Row>
    </Router>
  );
}

export default App;
