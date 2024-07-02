import {
  TextField,
  Grid,
  Button,
  FormControl,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobForm = () => {
  const [formData, setFormData] = useState({
    jobRole: "",
    jobDescription: "",
  });

  const [analysisResult, setAnalysisResult] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://resumate-eysg.onrender.com/job_details",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        console.log("form submitted successfully!");
        setFormData({ jobRole: "", jobDescription: "" });
        setAnalysisResult(response.data);
        navigate("/response", { state: { response: response.data } });
      } else {
        console.log("Error in submitting the form", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    console.log("inside handleChange");
    setFormData((prevState) => {
      const { name, value } = event.target;
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Grid item>
              <TextField
                type="text"
                name="jobRole"
                placeholder="Job Role"
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    border: "1px solid oklch(65.69% .196 275.75 / 1)",
                  },
                  width: { xs: 250, md: 300, lg: 350 },
                  backgroundColor: "#171a18",
                }}
                value={formData.jobRole}
                onChange={handleChange}
                required
              >
                Job Role
              </TextField>
            </Grid>

            <Grid item>
              <TextField
                type="text"
                name="jobDescription"
                placeholder="Job Description"
                multiline
                rows={8}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    border: "1px solid oklch(65.69% .196 275.75 / 1)",
                  },
                  width: { xs: 330, md: 500, lg: 650 },
                  backgroundColor: "#171a18",
                }}
                value={formData.jobDescription}
                onChange={handleChange}
                required
              >
                Job description
              </TextField>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  width: { xs: 100, md: 130, lg: 150 },
                  textTransform: "none",
                  color: "oklch(65.69% .196 275.75 / 1)",
                  borderColor: "oklch(65.69% .196 275.75 / 1)",
                  "&:hover": {
                    backgroundColor: "oklch(65.69% .196 275.75 / 1)",
                    borderColor: "oklch(65.69% .196 275.75 / 1)",
                    color: "white",
                  },
                  fontWeight: "bold",
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="primary" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </>
  );
};

export default JobForm;
