import { Typography } from "@mui/material";
import React from "react";

const Loader = () => {
  console.log("inside loader");
  return (
    <div className="loader">
      <Typography variant="body2" color="white">
        Loading...
      </Typography>
    </div>
  );
};

export default Loader;
