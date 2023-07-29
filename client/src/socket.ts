import io from 'socket.io-client';

const socketConnection = io('http://localhost/');

export default socketConnection;
