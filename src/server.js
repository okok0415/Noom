import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

console.log("Hello");
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (req, res) => res.render("home"));
app.get("/", (req, res) => res.render("home"));


const handleListen = () => console.log(`Listening on http://localhost:3000/`)
// Http와 Websocket을 동시에 만족하기 위해
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

/*
function handleConnection(socket) {
    console.log(socket);
}
*/
wss.on("connection", (socket) => {
    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log("Disconnected from the Browser ❌"));
    socket.on("message", (message) => {
        console.log(message);
    });
    socket.send("hello!!!");
});

server.listen(3000, handleListen);