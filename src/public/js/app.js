const socket = io();

const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form")

const backendDone = (msg) => {
    console.log(msg)
}

const handleRoomSubmit = (event) => {
    event.preventDefault();
    const input = form.querySelector("input")
    socket.emit("room", input.value, backendDone)
    input.value = ""
}

form.addEventListener("submit", handleRoomSubmit)