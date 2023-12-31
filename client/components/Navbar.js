import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import logo from "../../images/logo.png";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <div className="container">
      <h3 className="cysters">CYSTERS</h3>
    </div>

    <nav style={{ textAlign: "center" }}>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/">Home</Link>

          <Link to="/about">About</Link>
          <Link to="/Resources">Resources</Link>
          <Link to="/Diagnosis">PCOS Diagnosis</Link>
          <Link to="/SafeSpace">HUB</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
