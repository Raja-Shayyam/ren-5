// Simple modification of your existing server
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http'
import path from 'path';
import { fileURLToPath } from "url";
import { networkInterfaces } from 'os';

const myPort = 3000;

const App = express();
const server = createServer(App)

const io = new Server(server, {
  cors: {
    // origin:[ '*',"https://celebrated-toffee-5e72e2.netlify.app/"],
    origin:"https://ren-5-l6tt.vercel.app/",
    methods: ["GET", "POST"],
    credentials: true,
  }
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

App.use(express.static(__dirname))

App.get("/", (Request, res) => {
  res.send('salam alíkúm')
})

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Simple function to get your computer's IP
const getLocalIP = () => {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
};

io.on("connection", (socket) => {
  const cooloor = getRandomColor()

  socket.emit("specific-color", cooloor);
  let name_id = ''
  
  socket.on("user", (a) => {
    name_id = a;
    console.log("Username set:", name_id, "for socket:", socket.id);
    socket.broadcast.emit('userwelcome', `User ${name_id || 'Anonymous'} joined the server.`);
  });

  socket.broadcast.emit('welcome', '= USER = JOINED to ren-3 Server IS ' + name_id + '::' + socket.id);

  socket.on("mesage", (values) => {
    console.log(':================= ', values, "<->", cooloor, '..:..', socket.id,);
    io.emit("mesage-toAll", values, socket.id, cooloor, name_id);
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user left', `User ${socket.id} has left.`);
    console.log('disconnected ', socket.id)
  })
})

server.listen(myPort, "0.0.0.0", () => {
  const localIP = getLocalIP();
  console.log(`server is running on port ${myPort}`);
  console.log(`📱 Access from mobile: http://${localIP}:${myPort}`);
  console.log(`💻 Access from computer: http://localhost:${myPort}`);
});