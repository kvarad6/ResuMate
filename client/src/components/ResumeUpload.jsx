import { TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;
    // setFile(uploadedFile);
    console.log("uploadedFile:", uploadedFile);

    const formData = new FormData();
    formData.append("file", uploadedFile);
    console.log("formData:", formData);
    sendPDFForExtraction(formData);
  };

  const sendPDFForExtraction = async (formData) => {
    console.log(formData);
    const response = await axios.post(
      "http://localhost:8000/upload_pdf",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (response.status == 200) {
      console.log("form submitted successfully!");
    } else {
      console.log("Error in submitting the form", response.statusText);
    }
  };

  return (
    <div>
      <TextField
        type="file"
        accepts="application/pdf"
        onChange={handleFileUpload}
        sx={{
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            // border: '1px solid #8f4af7',
            border: "1px solid oklch(65.69% .196 275.75 / 1)",
          },
          width: { xs: 250, md: 300, lg: 350 },
          backgroundColor: "#171a18",
        }}
        value={file}
      />
    </div>
  );
};

export default ResumeUpload;
