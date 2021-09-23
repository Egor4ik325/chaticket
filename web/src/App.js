import React, { Fragment, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from "react-router-dom";
import { Container, Image, Button } from "react-bootstrap";

import { Chat, Login, Register } from "./components";
import logo from './logo.svg';
import { getUser, logout } from "./adaptors"


function App() {
  // Currect session (logged-in) user
  const [user, setUser] = useState(null);

  const update = async () => {
    // Fetch & set session user
    getUser().then(setUser);
  }

  const handleLogout = async () => {
    await logout();
    await update();
  }

  useEffect(() => {
    update();
  }, [update]);

  return (
    <Router>
      <Container>
        {/* Static content */}
        <Image src={logo} width={64} height={64} />
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
        </Switch>
        {/* Static content */}
        <hr />
        <p>Some footer.</p>
      </Container>
    </Router>
  );
}

export default App;
