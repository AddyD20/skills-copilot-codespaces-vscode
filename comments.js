// Create web server 
const express = require('express'); 
const app = express(); 
// Create server 
const server = require('http').createServer(app); 
// Create socket 
const io = require('socket.io')(server); 
// Create port 
const port = process.env.PORT || 3000; 
// Create array comments 
const comments = []; 
// Create socket 
io.on('connection', socket => { 
socket.emit('previousComments', comments); 
socket.on('sendComment', data => { 
comments.push(data); 
socket.broadcast.emit('receivedComment', data); 
}); 
}); 
// Use server 
server.listen(port); 
// Use express 
app.use(express.static(__dirname + '/public')); 
// Use ejs 
app.set('view engine', 'ejs'); 
// Use router 
app.get('/', (req, res) => { 
res.render('index'); 
}); 

