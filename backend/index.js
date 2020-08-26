const express = require('express')
const app = express()
const port = 3000

const TelegramBot = require('node-telegram-bot-api')
const token = '';
const bot = new TelegramBot(token, {polling: true})

app.get('/playlist', (request, response) => {
    let playlist = []
    // {
    //     id: '1',
    //     date: 'june',
    //     from: 'benny',
    //     scUrl: 'testUrl'
    // }
    
    bot.on('message', (msg) => {
        var urlExists = require('url-exists');
        var checkSoundcloud = "soundcloud";
        
        if (msg.text.includes('soundcloud')) {
            urlExists(msg.text, function(err, exists) {

                if (exists == true){
                    console.log('url-is valid')
                    playlist.push(msg.text)
                    console.log(playlist.length)
                    bot.sendMessage(msg.chat.id,"Hello dear user youre track will be added to the queue");
                }

            });
        } 
            
    });
    response.send(playlist)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})