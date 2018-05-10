 // 使用socket.io
 var socket = null

 function join() {
     socket = io()
     socket.username = document.getElementById('a').value
     socket.on('connect', function () {
         console.log(socket.id);
         socket.emit('username', document.getElementById('a').value)
     })
     socket.on('msg', function (v) {
         console.log(v)
         console.log(socket.id)
         let newd = document.createElement('div')
         v.socketid === socket.id ? newd.className = 'mychat' : newd.className = 'chat'

         let newp0 = document.createElement('span')
         newp0.innerText = v.username + " : "
         newp0.className = 'bb'
         let newp = document.createElement('span')
         newp.innerText = v.data
         newp.className = 'b'

         newd.appendChild(newp0)
         newd.appendChild(newp)

         document.getElementById('main').appendChild(newd)

     })
     socket.on('welcome', function (v) {
         console.log(v)
     })
     socket.on('news', function (v) {
         console.log(v)

     })
     socket.on('hello', function (v) {
         console.log(v)
         let newd = document.createElement('div')
         newd.style.textAlign = 'center'
         newd.style.color = '#888'
         newd.style.fontSize = "12px";
         newd.innerText = v
         document.getElementById('main').appendChild(newd)
     })

 }

 function sub() {
     console.log('sub', document.getElementById('c').value)
     socket.emit('sendmsg', document.getElementById('c').value)
 }
 document.addEventListener('keydown', function (e) {
     console.log()
     if (e.keyCode == 13) {
         sub()
     }
 })