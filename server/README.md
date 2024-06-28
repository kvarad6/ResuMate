# ResuMate - Backend Server

- [1. Getting Started](#1-getting-started)
  - [1.1. Create a virtual environment](#11-create-a-virtual-environment)
  - [1.2. Install the dependencies](#12-install-the-dependencies)
  - [1.3. Additional Steps](#13-additional-steps)
- [2. Run in Local](#3-run-in-local)

# 1. Getting Started

## 1.1. Create a virtual environment

```bash
cd server
python3 -m venv venv
source venv/bin/activate
```

## 1.2. Install the dependencies

```bash
pip install -r requirements.txt
```

## 1.3. Additional Steps

You might need to perform some additional steps, before a successful run, please read on to understand

- Create API KEY to use Gemini LLM API on aistudio.google.com
- Add API_KEY into the .env file

# 3. Run in Local

- Run command -
  ```bash
  python3 main.py
  ```
