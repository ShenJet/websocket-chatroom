const express = require('express')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'))

app.get('/',(req, res) =>{

    res.sendFile(__dirname + '/public')

})

io.on('connection',(socket)=>{
    console.log('connect')
})

app.get('/wsaddr',(req, res) =>{
    // 建立ws连接
    res.send('root')

})


const server = http.listen('3000',()=>{
    console.log('listen @3000 now')
})