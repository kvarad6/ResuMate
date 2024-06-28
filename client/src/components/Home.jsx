import React from "react";
import { Typography, Grid } from "@mui/material";
import ResumeUpload from "./ResumeUpload";
import JobForm from "./JobForm";

const Home = () => {
  return (
    <div>
      <Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 35, md: 40, lg: 50 },
              color: "#2eb36a",
              mt: 3,
            }}
          >
            ResuMate
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: 20, md: 25, lg: 30 },
              color: "#5897f5",
            }}
          >
            Your AI-powered Resume Coach
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: 15, md: 20, lg: 25 },
              color: "#5897f5",
            }}
          >
            Get instant, actionable feedback on your resume in seconds.
          </Typography>
          {/* <Typography sx={{ textAlign: 'center', fontSize: { xs: 14, md: 15, lg: 20 }, color: '#4f89e0', ml: { xs: 4 }, mr: { xs: 4 } }}>GenAI powered AI model analyze your resume for formatting, keywords, and more.</Typography> */}
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 7,
            mt: 10,
          }}
        >
          <ResumeUpload />
          <JobForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
