const {Server}=require('socket.io');
const io = new Server(8000, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});

const users={};
io.on('connection',(socket)=>{
    socket.on('new-join',(name)=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',(message)=>{
        socket.broadcast.emit('receive',{'name':users[socket.id],'message':message});
    });

    socket.on('disconnect',()=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})