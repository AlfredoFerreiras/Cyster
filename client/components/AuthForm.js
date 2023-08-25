import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { useNavigate } from "react-router-dom";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const formContainerStyle = {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const buttonContainerStyle = {
    marginTop: "20px",
  };

  const errorMessageStyle = {
    color: "red",
    marginTop: "10px",
  };

  const navigate = useNavigate();

  const onSubmit = async (evt) => {
    handleSubmit(evt); // Your original handle submit
    // Navigate to the home page after submitting the form.
    navigate("/");
  };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={onSubmit} name={name}>
        <div>
          <label htmlFor="username" style={labelStyle}>
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password" style={labelStyle}>
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div style={buttonContainerStyle}>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && (
          <div style={errorMessageStyle}> {error.response.data} </div>
        )}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
