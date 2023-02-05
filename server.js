const express = require("express")
const { dirname } = require("path")
const path = require("path")

const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)


io.on("connection", function(socket){
    socket.on("newuser", function(username){
        console.log("Success")
        socket.broadcast.emit("update", username + " joined the room")
    })
    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " out the room")
    })
    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message)
    })
})

app.use(express.static(path.join(__dirname, "src/public")))
server.listen(3000, () => console.log(`http://localhost:${3000}`))