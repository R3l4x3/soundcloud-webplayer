const express = require('express')
const app = express()
const port = 3000

const TelegramBot = require('node-telegram-bot-api')
const token = '';
const bot = new TelegramBot(token, {polling: true})

app.get('/playlist', (request, response) => {
    let playlist = [
        {
            id: '1',
            date: 'june',
            from: 'benny',
            scUrl: 'testUrl'
        },
        {
            id: '2',
            date: 'aug',
            from: 'aina',
            scUrl: 'testUrl'
        }
    ]
    
    bot.on('message', (msg) => {
    
        var Hi = "hi";
        if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id,"Hello dear user");
            
        } 
            
    });
    response.send(playlist)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})