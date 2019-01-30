const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const server = express().use(express.static('public')).listen(PORT, port);

let Schema = mongoose.Schema;
const dbUrl = "mongodb://admin:admin123@ds141674.mlab.com:41674/storytelling"

let ScentenceSchema = new Schema(
    {
        index: Number,
        scentence: String,
        font: String
    });
let Scentence = mongoose.model('story_scentence', ScentenceSchema);
    

const io = socketIO(server); 
io.on('connection', connectionLive); 

function port()
{
    console.log(`Listening on ${ PORT }`);
}


mongoose.connect(dbUrl, {useNewUrlParser: true}, dbConnected);
function dbConnected(err)
{
    if (err)
    {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } 
    else 
    {
        console.log('Connection established to', dbUrl);
    }
}

function connectionLive(socket)
{
    console.log('Client connected');

    Scentence.find(getAllSentencesFromDB);
    function getAllSentencesFromDB(err, data)
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
            socket.emit('initSketch', data);
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
        console.log('Got data: ', data);
        socket.broadcast.emit('broadcastScentence', data);

        Scentence.findOne({ index:Number(data.index) }, saveData);
        function saveData(err, dataDb)
        {
            // console.log('Save data', dataDb);
            if (err) return console.error(err);

            if(dataDb !== null) // update
            {
                dataDb.scentence = data.scentence;
                dataDb.font = data.font;
                dataDb.save();
            }
            else // initialize
            {
                let tmpScentence = new Scentence(data);
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