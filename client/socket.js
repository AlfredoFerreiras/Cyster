import socketIoClient from "socket.io-client";

const socket = socketIoClient("http://localhost:8080");
const cystersSocket = socketIoClient("https://cysters.onrender.com/");

export { socket, cystersSocket };
