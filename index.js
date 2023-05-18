const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const SocketServer = require('./socketServer');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

// Socket
const http = require('http');
const socketServer = http.createServer(server); // https server
const { Server } = require('socket.io');
const io = new Server(socketServer, {
	cors: {
		origin: '*',
	},
	//transports: ['websocket'],
	//allowUpgrades: false,
	allowEIO3: true,
});

// socket io
io.on('connection', (socket) => {
	SocketServer(socket);
});

server.use(router);

const PORT = 8000;

socketServer.listen(PORT, () => {
	console.log(`JSON Server and socket are running on http://localhost:${PORT}`);
});
