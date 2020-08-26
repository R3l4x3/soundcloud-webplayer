const express = require('express')
const app = express()
const port = 3000

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
    response.send(playlist)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})