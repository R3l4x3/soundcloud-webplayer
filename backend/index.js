
const express = require('express');


const app = express();

const TelegramBot = require('node-telegram-bot-api')
const token = '';
const bot = new TelegramBot(token, {polling: true})

const server = app.listen(3000, function() {
    console.log('server running on port 3000');
});


const io = require('socket.io')(server);

let telegramId;

io.on('connection', function(socket) {
    console.log('connected:',socket.id)
    // socket.on('SEND_MESSAGE', function(data) {
    //     io.emit('MESSAGE', data)

    // });
    
    socket.on('SEND_MESSAGE', function(data) {
        console.log(telegramId)
        bot.sendMessage(telegramId,"Hello dear user youre track will be added to the queue")
        console.log('message back to user')
    });
});

bot.on('message', (msg) => {
    var urlExists = require('url-exists');
    var checkSoundcloud = "soundcloud";
    
    if (msg.text.includes('soundcloud')) {
        urlExists(msg.text, function(err, exists) {

            if (exists == true){
                console.log('url-is valid')
                telegramId= msg.chat.id
                // playlist.push(msg.text)
                // console.log(playlist.length)
                
                
                io.emit('MESSAGE', msg.text)
                console.log (msg.text)
                
                
            }

        });
    } 
        
});