from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from voice_functions import listen, ask_gemini, threaded_speak, stop_tts

app = FastAPI()

# CORS setup for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/listen/")
def listen_api():
    text = listen()
    response = ask_gemini(text)
    threaded_speak(response)
    return {"response": response}

@app.post("/stop/")
def stop_api():
    stop_tts()
    return {"status": "stopped"}
