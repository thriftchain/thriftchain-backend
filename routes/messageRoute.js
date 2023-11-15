const express= require('express')
const { getMessages, addMessage } = require('../controllers/messageController')
const route =express.Router()

route.ws('/chat', (ws, req) => {
    getMessages(req, { json: (messages) => ws.send(JSON.stringify(messages)) });

    ws.on('message', (message) => {
    addMessage(message, req.app.get('wsInstance'));
    });
});
route.get('/messages', getMessages)

module.exports = route