import axios from "axios";

const FETCH_DOCTORS = "FETCH_DOCTORS";

export const getDoctors = (doctors) => {
  return {
    type: FETCH_DOCTORS,
    payload: doctors,
  };
};

export const fetchDoctors = () => async (dispatch) => {
  const { data } = await axios.get("/api/GYNDoctor");
  dispatch(getDoctors(data));
};

const doctorsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_DOCTORS:
      return action.payload;
    default:
      return state;
  }
};

export default doctorsReducer;
