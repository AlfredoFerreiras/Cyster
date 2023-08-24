import socketIoClient from "socket.io-client";
const socket = socketIoClient("http://localhost:8080");
export default socket;
