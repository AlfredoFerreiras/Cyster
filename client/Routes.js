import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Routes, Route } from "react-router-dom"; // Added necessary imports here

import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import About from "./components/About";
import Resources from "./components/Resources";
import PCOSDiagnosis from "./components/PCOSDiagnosis";
import SafeSpaceComponent from "./components/SafeSpaceComponent";

class Routess extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Resources" element={<Resources />} />
            <Route path="/Diagnosis" element={<PCOSDiagnosis />} />
            <Route path="/SafeSpace" element={<SafeSpaceComponent />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Routess);
