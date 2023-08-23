import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Welcome, {username}</h3>
      <div
        className="wallpaper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}>
        <img
          src="https://as2.ftcdn.net/v2/jpg/02/82/33/09/1000_F_282330944_uwPsx1QOekptEOQBBgaiaIRRIDfalgLV.jpg"
          style={{ width: "50%", marginRight: "20px" }}
        />
        <article style={{ flex: 1 }}>
          <p>
            The cause of polycystic ovary syndrome isn't well understood, but
            may involve a combination of genetic and environmental factors.
            Symptoms include menstrual irregularity, excess hair growth, acne,
            and obesity. Treatments include birth control pills to regularize
            periods, a medication called metformin to prevent diabetes, statins
            to control high cholesterol, hormones to increase fertility, and
            procedures to remove excess hair.
          </p>
        </article>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
