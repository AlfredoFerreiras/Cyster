import axios from "axios";

const GET_USERS = "GET_USERS";

export const getUsers = (users) => ({ type: GET_USERS, users });

export const fetchUsers = () => async (dispatch) => {
  const { data } = await axios.get("/api/users");
  dispatch(getUsers(data));
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
};

export default reducer;
