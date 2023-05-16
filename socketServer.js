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

	// book table
	socket.on('bookTable', (table) => {
		const admins = users.filter((user) => user.info.role === 'admin');

		if (admins.length > 0) {
			admins.forEach((admin) => {
				socket.to(`${admin.socketId}`).emit('adminBookTable', table);
			});
		}
	});

	socket.on('disconnect', () => {
		users = users.filter((user) => user.socketId !== socket.id);
	});
};

module.exports = SocketServer;
