import React from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const styles = {
  height: "250px",
  paddingTop: "190px",
  textAlign: "center",
  paddingLeft: "35px"
};

const styles2 = {
  position: "absolute",
  bottom: "100px",
  left: "43.5%"
};

const Copyright = () => {
  return (
    <Box pt={4}>
      <Typography
        style={styles}
        variant="body2"
        color="textSecondary"
        align="center"
      >
        {"Copyright © "}
        <Link color="inherit" to="https://www.childcarewecare.com/">
          Childcare We Care
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Copyright;
