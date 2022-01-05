const socket = io();

const reloadUsers = (data) => {
	for (let i = 0; i < data.length; i++) {
		const hello = document.createElement("div");
		hello.innerText = `id игрока: ${data[i].id} игрок: ${data[i].count}`;
		document.body.appendChild(hello);
	}
};

socket.emit("new player");

socket.on("state", function (data) {
	reloadUsers(data);
});
