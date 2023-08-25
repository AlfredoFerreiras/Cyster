import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Home = (props) => {
  const { username } = props;

  return (
    <div className="home-container">
      <h3>Welcome, {username}</h3>
      <div
        className="safe-space"
        style={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://media.istockphoto.com/id/925882154/vector/pcos-symptoms-infographic.jpg?s=612x612&w=0&k=20&c=heoWNhoeRXguzHSSPGpS2Sn0d4_u3FQg4o7WXxWKtjg="
          alt="PCOS Symptoms"
        />

        <div style={{ width: "50%", marginLeft: "20px" }}>
          <p>
            The cause of polycystic ovary syndrome isn't well understood, but
            may involve a combination of genetic and environmental factors.
            Symptoms include menstrual irregularity, excess hair growth, acne,
            and obesity. Treatments include birth control pills to regularize
            periods, a medication called metformin to prevent diabetes, statins
            to control high cholesterol, hormones to increase fertility, and
            procedures to remove excess hair.
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/about">
              <button className="separated-button">Learn More</button>
            </Link>
            <Link to="/resources">
              <button>Get Help</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
