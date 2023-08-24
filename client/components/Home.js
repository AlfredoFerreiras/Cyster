import React from "react";
import { connect } from "react-redux";
import { Stack, Text } from "@chakra-ui/react";

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
          src="https://media.istockphoto.com/id/925882154/vector/pcos-symptoms-infographic.jpg?s=612x612&w=0&k=20&c=heoWNhoeRXguzHSSPGpS2Sn0d4_u3FQg4o7WXxWKtjg="
          style={{ width: "50%", marginRight: "20px" }}
        />
        <Stack>
          <article style={{ flex: 1 }}>
            <Text fontSize="xs">
              The cause of polycystic ovary syndrome isn't well understood, but
              may involve a combination of genetic and environmental factors.
              Symptoms include menstrual irregularity, excess hair growth, acne,
              and obesity. Treatments include birth control pills to regularize
              periods, a medication called metformin to prevent diabetes,
              statins to control high cholesterol, hormones to increase
              fertility, and procedures to remove excess hair.
            </Text>
          </article>
        </Stack>
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
