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
    socket.on("room", (roomName, done) => {
        console.log(roomName);
        setTimeout(() => {
            done("hello from the backend");
        }, 5000)
    });
})
/* 

const wss = new WebSocket.Server({ server });

function onSocketClose() {
    console.log("Disconnected from the Browser ❌");
}

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("Connected to Browser ✅");
    socket.on("close", onSocketClose);
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch (message.type) {
            case "new_message":
                sockets.forEach((aSocket) =>
                    aSocket.send(`${socket.nickname}: ${message.payload}`)
                );
            case "nickname":
                socket["nickname"] = message.payload;
        }
    });
}); */

server.listen(3000, handleListen);