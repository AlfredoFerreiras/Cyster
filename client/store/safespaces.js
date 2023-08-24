// safespaces.js
import axios from "axios";

const FETCH_SAFESPACES = "FETCH_SAFESPACES";

export const fetchSafespaces = (safespaces) => ({
  type: FETCH_SAFESPACES,
  safespaces,
});

export const fetchSafespacesThunk = () => async (dispatch) => {
  const { data } = await axios.get("/api/safespaces");
  dispatch(fetchSafespaces(data));
};

const safespacesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_SAFESPACES:
      return action.safespaces;
    default:
      return state;
  }
};

export default safespacesReducer;
