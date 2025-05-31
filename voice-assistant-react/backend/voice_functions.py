import speech_recognition as sr
import google.generativeai as genai
import threading
from langdetect import detect
from gtts import gTTS
from playsound import playsound
import os
import uuid

# Configure Gemini
genai.configure(api_key="AIzaSyAQSvLsUaeDS_BYFnw9RBUgSNaFf9Q2IEE")
model = genai.GenerativeModel("gemini-1.5-flash")

# TTS threading variables
tts_thread = None
tts_lock = threading.Lock()
is_speaking = False
stop_event = threading.Event()

def threaded_speak(text, lang="en"):
    global tts_thread, is_speaking

    def _speak():
        global is_speaking
        with tts_lock:
            try:
                is_speaking = True
                stop_event.clear()

                # Use gTTS for multilingual speech
                tts = gTTS(text=text, lang=lang)
                filename = f"temp_{uuid.uuid4()}.mp3"
                tts.save(filename)

                playsound(filename)
                os.remove(filename)

            except Exception as e:
                print("TTS error:", e)
            finally:
                is_speaking = False

    # Stop previous TTS before starting new
    if tts_thread is not None and tts_thread.is_alive():
        stop_tts()
        tts_thread.join()

    stop_event.clear()
    tts_thread = threading.Thread(target=_speak)
    tts_thread.start()

def stop_tts():
    global is_speaking
    with tts_lock:
        if is_speaking:
            print("Stopping TTS...")
            stop_event.set()
            # Note: gTTS + playsound doesn't support real-time stop
            # For advanced control, use pygame or pydub
            is_speaking = False
        else:
            print("TTS is not active.")

def listen():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        try:
            r.adjust_for_ambient_noise(source, duration=1)
            print("Listening...")
            audio = r.listen(source, timeout=7, phrase_time_limit=14)
            text = r.recognize_google(audio)
            return text
        except sr.WaitTimeoutError:
            return "ERROR: Timeout. You didn't speak in time."
        except sr.UnknownValueError:
            return "ERROR: Could not understand audio."
        except sr.RequestError as e:
            return f"ERROR: Could not request results; {e}"

def ask_gemini(text, context=None, lang=None):
    try:
        if lang is None:
            lang = detect(text)

        if context and len(context) > 3000:
            context = context[:3000]

        prompt = f"You are a helpful assistant. Answer based only on the content below:\n\n{context}\n\nQuestion: {text}" if context else text
        if lang != 'en':
            prompt = f"Respond in language: {lang}\n{prompt}"

        response = model.generate_content(prompt)
        print("Gemini Response:", response.text)
        return response.text

    except Exception as e:
        print(f"Gemini error: {e}")
        lang = lang or detect(text)
        if lang == 'mr':
            return "माफ करा, मला उत्तर देता आले नाही."
        elif lang == 'hi':
            return "क्षमा करें, उत्तर नहीं दे सका।"
        else:
            return "Sorry, Gemini failed to respond."

def translate_to_lang(text, lang):
    if lang == "en":
        return text
    try:
        prompt = f"Translate the following to {lang}:\n{text}"
        translation = model.generate_content(prompt)
        return translation.text
    except Exception as e:
        print("Translation error:", e)
        return text
