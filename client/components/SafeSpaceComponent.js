import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";

import { fetchMessagesThunk, sendMessage } from "../store/messages";
import io from "socket.io-client";
import { addNewMessageThunk } from "../store/messages";
import { startListeningToNewMessagesThunk } from "../store/messages";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lime, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  },
});

const SafeSpaceComponent = ({
  messages,
  loadMessages,
  sendNewMessage,
  addNewMessage,
  startListeningToNewMessages,
}) => {
  const [message, setMessage] = useState("");
  const socket = io.connect("http://localhost:8080");

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    loadMessages(); // Load initial messages when the component mounts

    startListeningToNewMessages(); // Start listening for new messages

    socket.on("new-message", (newMessage) => {
      addNewMessage(newMessage);
    });

    // Cleanup listener when the component unmounts
    return () => {
      socket.off("new-message");
    };
  }, []);

  const handleSend = () => {
    if (message.trim() !== "") {
      socket.emit("send-message", message);
      sendNewMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="safe-space">
      <div className="messages-list">
        {messages?.map((msg, idx) => (
          <div key={idx} className="message">
            {msg.content}{" "}
            <span className="message-author">- {msg?.user?.username}</span>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <ThemeProvider theme={theme}>
          <Button variant="contained" onClick={handleSend}>
            Send
          </Button>
          <Button variant="contained" color="secondary">
            Send
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
  loadMessages: () => dispatch(fetchMessagesThunk()),
  sendNewMessage: (messageContent) => dispatch(sendMessage(messageContent)),
  addNewMessage: (message) => dispatch(addNewMessageThunk(message)),
  startListeningToNewMessages: () =>
    dispatch(startListeningToNewMessagesThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SafeSpaceComponent);
