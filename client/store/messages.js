// messages.js
import axios from "axios";
import socket from "../socket";

const FETCH_MESSAGES = "FETCH_MESSAGES";
const ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE";
const TOKEN = "token";

export const fetchMessages = (messages) => ({
  type: FETCH_MESSAGES,
  payload: messages,
});

export const addNewMessage = (message) => ({
  type: ADD_NEW_MESSAGE,
  payload: message,
});

export const fetchMessagesThunk = () => async (dispatch) => {
  const { data } = await axios.get("/api/messages");

  dispatch(fetchMessages(data));
};

export const addNewMessageThunk = (messageContent) => async (dispatch) => {
  try {
    // Send the content of the message to the server
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios.post("/api/messages", {
      content: messageContent,
      token: token,
    });

    // Expecting the server to return the saved message
    const savedMessage = response.data;

    // Dispatch the addNewMessage action with the saved message data
    dispatch(addNewMessage(savedMessage));
  } catch (error) {
    console.error("Failed to add new message:", error);
  }
};

// Function to send a message:
export const sendMessage =
  (messageContent) =>
  (dispatch, getState, { socket }) => {
    const newMessage = {
      content: messageContent,
      userId: getState().auth.id,
    };
    socket.emit("new-message", newMessage);
    dispatch({ type: "ADD_NEW_MESSAGE", payload: newMessage }); // Dispatch an action
  };

// Listening for a new message:
export const startListeningToNewMessagesThunk = () => (dispatch) => {
  socket.on("new-message", () => {
    dispatch(fetchMessagesThunk()); // Note: fetchMessagesThunk doesn't need the message as argument based on your current code.
  });
};
// Assuming a messages reducer like:
const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_MESSAGES":
      return action.payload;
    case "ADD_NEW_MESSAGE":
      return [...state, action.payload];

    default:
      return state;
  }
};

export default messagesReducer;
