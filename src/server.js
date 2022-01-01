import http from "http";
import socketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));


const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
    socket.onAny((event) => {
        console.log(`socket Event: ${event}`);
    })
    socket.on("room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome");
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => socket.to(room).emit("bye"));
    })
    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", msg);
        done();
    })
})

server.listen(3000, handleListen);