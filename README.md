# Chaticket

Real-time chat webapp.

## Description

### What this project should look like?

It should be a website for chatting where users are authenticated based on the phone number (SMS). The users can create and name chats, invite friends and chat in one continuous message thread.

User send message, message is transferred to the server, server saves it somewhere and sends to other chat clients. Clients update thread and get notified in they are in other chat page.

Users invite their friends based on the _phone number or username_. The message thread is updated almost real-time via persistent WebSocket connection to the server.

Also website should provide search box for _searching_ for chat or messages in the chat. The app should be secure and privacy concerned. Application should be running in production mode and available to all internet users. Basically it should be **simple but stable**.

I want it to look similar to the **Telegram web** client app: similar look and functionality. Additional features may be also added it time allows.

- chat application/messenger where users communicate with each other via text
- Django/SPA app (even it is not the most suitable option)
- messages should transfer nearly real-time (without refresh/poll)

### Similar apps

- Telegram
- Discord
- WhatsUp
- Slack

> I may take some features from them

### This project roadmap

Committed branch features:

- [x] Authentication
- [x] Store chats in the persistant storage
- [x] Messages backend
- [x] Messages frontend
- [ ] Deploy for presentation
- [ ] User invitation
- [ ] Basic profile
- [ ] Chat-looking UI
- [ ] Real-time capabilities
- [ ] Messaging features

### This project features

- Back-end/QA (central)
- Front-end
- DevOps

Features that might appear in this project:

- **Real-time/WebSocket functionality (central)**
- Auth via SMS
- Web SPA (probably React)
- Profile
- Multiple chats
- Notifications
- Messages features (staring, replying, resending, ...)
- Secure chatting (HTTPs)
- Unit testing
- Backend concepts
- Production-ready

> Keep the number of features short but enough

#### Chats

Users can create, update, view and delete chats. Chat will have a name (used to search for chat)
and a full chat name. User won't be able to cat on the object if he is not it's creator.

#### Authentication

The authentication method used in this application is secured from CSRF attacks because it
exposes and uses CSRF token in the way that other websites aren't able to reproduce.

- CSRF set-cookie endpoint on the same domain (CORS)
- CSRF should be in either form field (csrftoken) or request header (X-CSRFToken)

So the attacker needs to get the cookie from the website, which is not possible because it
can only be sent along-side the request (without set header).

CSRF security:

- store session in _localstorage_ (like in token auth)
- validate request by _custom headers/json body/multipart body_ (not unsecured cookies)

Authentication libraries:

- django.contrib.auth
- django-rest-framework authtoken
- django-allauth
- dj-rest-auth

For social authentication allauth (no URLs will be used) + dj-rest-auth (only social endpoints) will be used.

The social authentication will be split into:

1. SPA - handles redirecting to social login URL.
2. API - handles token/code verification, logging-in, session management (between client and server).

The session is stored in the _cookie_ thus **shared between the interface and API on every request**.

### This project goals

Why starting this project?

- learn about new technologies while development
- improve not only programming skills (analyzing, designing)
- I was intended to care about security (privacy)
- improve software development skills as a whole
- experiment with new technologies
- I was just interesting in real-time client-server communication
