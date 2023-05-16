let users = [];

// users trung lap
const SocketServer = (socket) => {
	// Connect - Disconnect
	socket.on('joinUser', (user) => {
		let index = users.findIndex((item) => item.socketId === socket.id);
		let newUser = {
			info: user,
			socketId: socket.id,
		};
		if (index === -1) {
			users.push(newUser);
		} else {
			users[index] = newUser;
		}
	});

	socket.on('disconnect', () => {
		users = users.filter((user) => user.socketId !== socket.id);
	});
};

module.exports = SocketServer;
