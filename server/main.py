import uvicorn
from fastapi import FastAPI, UploadFile, File, Body, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from app_utils import *
from pydantic import BaseModel


import google.generativeai as genai


import pdfminer.high_level
import pdfminer.layout


from typing import Union
from pathlib import Path


import os
from dotenv import load_dotenv
load_dotenv()
API_KEY = os.getenv("API_KEY")
app = FastAPI()


origins = ["*"]


app.add_middleware(GZipMiddleware, minimum_size=512)
app.add_middleware(
   CORSMiddleware,
   allow_origins=origins,
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"],
)


log = putlog("MainExecutor")


configFile = "config/app.setting.json"
configuration = readJson(configFile)


GeminiModel = configuration["GenAI"]["GeminiModel"]


genai.configure(api_key=API_KEY)


text = ""
jobRole = ""
jobDescription = ""




@app.get("/")
def base():
   return JSONResponse({"ResuMate": "Your AI-Powered Resume Coach"})




@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
   """This function handles uploading PDF files.
   Args:
       file (UploadFile, optional): An object representing the uploaded PDF file. Defaults to `File(...)` which ensures a file is provided.
   Returns:
       dict: A dictionary with a success message ("file uploaded successfully") on success or an error message ("error": str(e)) in case of exceptions.
   """
   try:
       contents = await file.read()


       filename = file.filename
       # Create the uploads directory if it doesn't exist
       os.makedirs('uploads', exist_ok=True)


       filepath = f"uploads/{filename}"


       with open(filepath, "wb") as buffer:
           buffer.write(contents)
       return {"file uploaded successfully"}


   except Exception as e:
       return {"error": str(e)}




@app.post("/job_details")
async def jobDetails(data: dict = Body(...)):
   """This function analyzes a resume based on a provided job role and description.
   Args:
       data (dict, optional): A dictionary containing the job details. Defaults to `Body(...)` which ensures a request body is provided.
       jobRole (str, required): The key in the dictionary containing the job title or role.
       jobDescription (str, required): The key in the dictionary containing the job description text.


   Returns:
       dict: The function calls an external function `analyseResume` (likely defined elsewhere) and returns its response, which could be analysis results or relevant information.
       dict (on error): If the request body is missing the required keys "jobRole" or "jobDescription", a dictionary with an error message ("error": "Missing jobRole or jobDescription in request body") is returned.
   """
   try:
       jobRole = data['jobRole']
       jobDescription = data['jobDescription']


       response = analyseResume(jobRole, jobDescription)
       return response


   except KeyError:
       return {"error": "Missing jobRole or jobDescription in request body"}




def analyseResume(jobRole: str, jobDescription: str):
   try:
       file = ""
       text = ""
       for filename in os.listdir("uploads"):
           if filename.endswith(".pdf"):
               file = os.path.join("uploads", filename)
               text = pdfminer.high_level.extract_text(f"{file}")


       prompt = f"""
           you are a resume reviwer.
           Analyse the resume based on content, job role and job description.
           Summerize the analysis in a bulleted list, highlighting the key points.
           Keep the analysis short and crisp.
           details provided:
           resume: {text},
           job role: {jobRole},
           job description: {jobDescription}


           structure:
           **Resume Analysis for {jobRole} Role**
           * Strengths:
               - Identify the strengths of candidate and match it with the job description


           * Area of Improvement:
               - Identify the gap the candidate resume have when compared with job description.
               - Suggest scope of improvements.


           * Recommendations:
               - Suggest recommendation to increase the candidate changes to getting the job.


           Format instructions:
               - Add each pointer in seperate line with space inbetween.
               - keep gap inbetween two pointers.


       """


       model = genai.GenerativeModel(GeminiModel)
       response = model.generate_content(prompt)


       updatedPrompt = f"""
           You are resume reviwer. You have to summarize the resume analysis given below such that it should highlight the important points containing exact details for resume improvements:
           {response}
           Add job specific analysis point in summary.
           Don't mention about the resume analysis.
           Just mention the improvements as a reviwer.
       """


       summerisedResponse = model.generate_content(updatedPrompt)
       os.remove(file)
       return summerisedResponse.text


   except Exception as e:
       return {"error": str(e)}




if __name__ == "__main__":
   uvicorn.run(app,
               host=configuration["App"]["Host"],
               port=configuration["App"]["Port"])




