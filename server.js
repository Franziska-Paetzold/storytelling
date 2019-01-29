const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const server = express().use(express.static('public')).listen(PORT, port);

let Schema = mongoose.Schema;
const dbUrl = "mongodb://admin:admin123@ds141674.mlab.com:41674/storytelling"

let sentenceSchema = new Schema(
    {
        scentence: String
    });
let Scentence = mongoose.model('story_scentence', ScentenceSchema);
    

io = socketIO.listen(server); 
io.on('connection', connectionLive); 

function port()
{
    console.log(`Listening on ${ PORT }`);
}




function connectionLive(socket)
{
    console.log('Client connected');

    Scentence.find(getAllSentencesFromDB);
    function getAllSentencesFromDB(err, scentence)
    {
        if (err) return console.error(err);

        if(data.length == 0)
        {
            console.log('Init Database');
            socket.emit('getScentences');
        }
        else
        {
            console.log('Init Client');
            //TODO socket.emit('initSketch', data);
        }
    }

    socket.on('sayingHello', receivingHello);
    socket.on('setNewScentence', getNewScentence);

    function receivingHello(data)
    {
        console.log('Got the hello', data);
    }

    function getNewScentence(data)
    {
        console.log('Got scentence: ', data);
        socket.socket.broadcast.emit('broadcastScentence', data);

        Scentence.findOne({ scentence:String(data) }, saveData);
        function saveData(err, dataDb)
        {
            // console.log('Save data', dataDb);
            if (err) return console.error(err);

            if(dataDb !== null) // update
            {
                dataDb.scentence = data;
                dataDb.save();
            }
            else // initialize
            {
                let tmpScentence = data;
                tmpScentence.save(saveNewScentence);
                function saveNewScentence(err, element) 
                {
                    if (err) return console.error(err);

                    console.log('New element saved', element);
                };
            }
        };
    }
};