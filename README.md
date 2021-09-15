# Chaticket

Real-time chat webapp.

## Description

### What this project should look like?

It should be a website for chatting where users are authenticated based on the phone number (SMS). The users can create and name chats, invite friends and chat in one continuous message thread.

User send message, message is transferred to the server, server saves it somewhere and sends to other chat clients. Clients update thread and get notified in they are in other chat page.

Users invite their friends based on the *phone number or username*. The message thread is updated almost real-time via persistent WebSocket connection to the server.

Also website should provide search box for *searching* for chat or messages in the chat. The app should be secure and privacy concerned. Application should be running in production mode and available to all internet users. Basically it should be **simple but stable**.

I want it to look similar to the **Telegram web** client app: similar look and functionality. Additional features may be also added it time allows.

- chat application/messenger where users communicate with each other via text
- Django/SPA app (even it is not the most suitable option)
- messages should transfer nearly real-time (without refresh/poll)

### Similar apps

- Telegram
- Discord
- WhatsUp
- Slack

>  I may take some features from them

### This project roadmap

Committed branch features:

- [ ] Setup basic project (follow tutorial)

- [ ] Write tests

- [ ] Deploy

### This project features

* Back-end/QA (central)
* Front-end
* DevOps

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

### This project goals

Why starting this project?

- learn about new technologies while development
- improve not only programming skills (analyzing, designing)
- I was intended to care about security (privacy)
- improve software development skills as a whole
- experiment with new technologies
- I was just interesting in real-time client-server communication
