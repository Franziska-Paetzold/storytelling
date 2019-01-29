const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const server = express()
                .use(express.static('public'))
                .listen(PORT, port);

io = socketIO.listen(server); 
io.on('connection', connectionLive); 

function port()
{
    console.log(`Listening on ${ PORT }`);
}

function connectionLive(socket)
{
    console.log('Client connected');

    socket.on('sayingHello', receivingHello);
    function receivingHello()
    {
        console.log('Got the hello', data);
    }
};