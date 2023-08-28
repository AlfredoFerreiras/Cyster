// store/index.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import auth from "./auth";
import messagesReducer from "./messages";
import safespacesReducer from "./safespaces";
import usersReducer from "./users";
import { socket, cystersSocket } from "../socket";
import doctorsReducer from "./doctors";

const reducer = combineReducers({
  auth,
  messages: messagesReducer,
  safespaces: safespacesReducer,
  users: usersReducer,
  doctors: doctorsReducer,
});

const middleware = applyMiddleware(
  thunkMiddleware.withExtraArgument({ socket, cystersSocket }),
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./messages";
export * from "./safespaces";
export * from "./users";
export * from "./doctors";
