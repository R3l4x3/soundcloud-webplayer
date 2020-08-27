
const express = require('express');


const app = express();

const TelegramBot = require('node-telegram-bot-api')
const token = '';
const bot = new TelegramBot(token, {polling: true})

const server = app.listen(3000, function() {
    console.log('server running on port 3000');
});


const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log('connected:',socket.id)
    // socket.on('SEND_MESSAGE', function(data) {
    //     io.emit('MESSAGE', data)

    // });

    bot.on('message', (msg) => {
        var urlExists = require('url-exists');
        var checkSoundcloud = "soundcloud";
        var checkBeforeSend = '';
        
        if (msg.text.includes('soundcloud')) {
            urlExists(msg.text, function(err, exists) {

                if (exists == true && checkBeforeSend != msg.text){
                    console.log('url-is valid')
                    // playlist.push(msg.text)
                    // console.log(playlist.length)
                    checkBeforeSend = msg.text
                    console.log('chekbeforeSend: ', checkBeforeSend)
                    bot.sendMessage(msg.chat.id,"Hello dear user youre track will be added to the queue")
                    setTimeout(() =>{
                        io.emit('MESSAGE', msg.text)
                        console.log (msg.text)
                    }, 1000)
                    
                }

            });
        } 
            
    });
});