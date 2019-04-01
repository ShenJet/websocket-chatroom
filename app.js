/*
 * @Author: ShenJie 
 * @Date: 2018-05-10 11:26:45 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019年4月1日17:17:20
 */
const express = require('express')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'))

app.get('/',(req, res) =>{
    res.sendFile(__dirname + '/public')
})

io.on('connection',(socket)=>{
    let userlist = {}
    console.log('connection')
    console.log(socket.id)
    
    socket.on('join',(data)=>{
        userlist[socket.id] = data
        console.log(userlist)
        io.emit('hello', {
            msg:`系统：欢迎${data}加入~`,
            userid: socket.id
        });//向所有用户发消息
    })

    socket.on('toBeController',(data)=>{
        console.log(userlist)
        io.emit('hascontroller', {
            data: data,
            msg:`系统：${data}已成为主控端`
        });//向所有用户发消息
    })

    socket.on("command_to_server", function (data) {
        console.log("客户端发来指令：");
        console.log(data);
        
        socket.broadcast.emit("command_to_client", data)
    })
    
    socket.on('username',(data)=>{
        userlist[socket.id] = data
        console.log(userlist)
        socket.broadcast.emit('hello',`通知：${data}已加入同步课堂`);//向所有用户发消息
    })

    //socket.emit('hello','系统：欢迎新用户加入'); //向单一用户发消息
    
    socket.on('sendmsg',(data)=>{
        console.log('sendmsg')
    // console.log(socket)
    //socket.emit('hello','系统：欢迎新用户加入'); //向单一用户发消息
        io.emit('msg',{username:userlist[socket.id],data,socketid:socket.id});//向所有用户发消息
    })

    // 接收文件
    socket.on('voiceupload',(data)=>{
        console.log('fileupload')
        // console.log('data:')
        // console.log(data)

    //socket.emit('hello','系统：欢迎新用户加入'); //向单一用户发消息
        io.emit('voice',{username:userlist[socket.id],data,socketid:socket.id});//向所有用户发消息
    })

})

const server = http.listen('3000',()=>{
    console.log('listen @3000 now')
})