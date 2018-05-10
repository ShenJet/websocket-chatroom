/*
 * @Author: ShenJie 
 * @Date: 2018-05-10 11:26:45 
 * @Last Modified by:   ShenJie 
 * @Last Modified time: 2018-05-10 11:26:45 
 */
const express = require('express')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'))

app.get('/',(req, res) =>{

    res.sendFile(__dirname + '/public')

})
//    io.on(‘connection’,function(socket));//监听客户端连接,回调函数会传递本次连接的socket
//
//    io.sockets.emit(‘String’,data);//给所有客户端广播消息
//
//    io.sockets.socket(socketid).emit(‘String’, data);//给指定的客户端发送消息
//
//    socket.on(‘String’,function(data));//监听客户端发送的信息
//
//    socket.emit(‘String’, data);//给该socket的客户端发送消息

io.on('connection',(socket)=>{
    let userlist = {}
    console.log('connection')
    console.log(socket.id)
    
    socket.on('username',(data)=>{
        userlist[socket.id] = data
        console.log(userlist)
        io.emit('hello',`系统：欢迎${data}加入~`);//向所有用户发消息
    })

    //socket.emit('hello','系统：欢迎新用户加入'); //向单一用户发消息
    
    socket.on('sendmsg',(data)=>{
        console.log('sendmsg')
    // console.log(socket)
    //socket.emit('hello','系统：欢迎新用户加入'); //向单一用户发消息
        io.emit('msg',{username:userlist[socket.id],data,socketid:socket.id});//向所有用户发消息
    })

})



const server = http.listen('3000',()=>{
    console.log('listen @3000 now')
})