import { Typography, Button, Grid, Box } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Response = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const response = location.state.response;

  function goToHomePage() {
    navigate("/");
  }

  const formatText = (inputText) => {
    if (!inputText) return null; // Return null if text is undefined or empty
    // Split the input text by newlines first
    const lines = inputText.split("\n");

    return lines.map((line, lineIndex) => {
      line = line.trim();

      if (line === "*") {
        // Ignore lines that are just a single asterisk
        return null;
      }

      const parts = line.split(/(\*\*.*?\*\*)/g);

      return (
        <Typography key={lineIndex} paragraph>
          {parts.map((part, partIndex) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              // Highlighted words
              return (
                <Box
                  component="span"
                  key={`${lineIndex}-${partIndex}`}
                  sx={{ fontWeight: "bold", color: "#2eb36a" }}
                >
                  {part.slice(2, -2)}
                </Box>
              );
            } else {
              // Regular text
              return (
                <React.Fragment key={`${lineIndex}-${partIndex}`}>
                  {part}
                </React.Fragment>
              );
            }
          })}
        </Typography>
      );
    });
  };

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          mt: 5,
        }}
      >
        <Grid item>
          <Typography
            sx={{ color: "#2eb36a", fontSize: { xs: 35, md: 40, lg: 50 } }}
          >
            Analysis
          </Typography>
        </Grid>
        <Grid item>
          <Box
            sx={{
              border: 1,
              borderColor: "oklch(65.69% .196 275.75 / 1)",
              borderWidth: { xs: 2, md: 3, lg: 5 },
              borderRadius: 5,
              p: 3,
              m: 2,
              backgroundColor: "#171a18",
            }}
          >
            {response ? (
              <Typography sx={{ color: "white" }}>
                {formatText(response)}
              </Typography>
            ) : (
              <Typography sx={{ color: "white" }}>
                No response text available.
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item>
          <Button
            onClick={goToHomePage}
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "oklch(65.69% .196 275.75 / 1)",
              color: "black",
              "&:hover": {
                backgroundColor: "oklch(46.15% 0.196 275.75)",
                borderColor: "oklch(46.15% 0.196 275.75)",
                color: "white",
              },
              mb: { xs: 4 },
              fontWeight: "bold",
            }}
          >
            Try another response
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Response;
