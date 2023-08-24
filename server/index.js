const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");

const server = http.createServer(app); // Create a server instance
const io = socketIo(server); // Socket.io server instance

module.exports.io = io; // Export the socket.io server instance

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("user-login", async (credentials) => {
    try {
      const token = await User.authenticate(credentials);
      socket.emit("login-response", { token });
    } catch (error) {
      socket.emit("login-error", error.message);
    }
  });

  socket.on("user-signup", async (credentials) => {
    try {
      const user = await User.create(credentials);
      const token = await user.generateToken();
      socket.emit("signup-response", { token });
    } catch (error) {
      socket.emit("signup-error", error.message);
    }
  });

  socket.on("send-message", (message) => {
    socket.broadcast.emit("new-message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await require("../script/seed")();
    } else {
      await db.sync();
    }
    server.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
