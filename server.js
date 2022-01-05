const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set("port", 5000);
app.use("/static", express.static(__dirname + "/static"));

app.get("/", function (request, response) {
	response.sendFile(path.join(__dirname + "/static", "index.html"));
});

server.listen(5000, function () {
	console.log("Starting server on port 5000");
});

const players = [];
let count = 1;
io.on("connection", function (socket) {
	socket.on("new player", function () {
		players.push({
			id: socket.id,
			count: count,
		});
		count++;
		socket.emit("state", players);
	});
	socket.on("disconnect", function () {
		players.pop();
		socket.emit("state", players);
		count--;
	});
});
