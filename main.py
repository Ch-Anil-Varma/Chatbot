from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as ai
from datetime import datetime, timedelta
import pytz
import re
import requests
import time
import os

# Configure API Keys
API_KEY = "AIzaSyCJjKXOgEK-17ttmQc34pCLiSTDMh26bl8"  
TMDB_API_KEY = "6f995e618b5363998bf015b9927a64d1"  
WEATHER_API_KEY = "your_openweathermap_api_key"
NEWS_API_KEY = "be536862cd90465eb45e85018860b9bd"
SPORTS_API_KEY = "your_sports_api_key"

ai.configure(api_key=API_KEY)

# Initialize the chatbot model
model = ai.GenerativeModel("gemini-pro")
chat = model.start_chat()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication
@app.route("/")
def home():
    return "Flask server is running!"


def get_day_and_date(offset=0):
    timezone = pytz.timezone("Asia/Kolkata")  # Set timezone (IST)
    target_date = datetime.now(timezone) + timedelta(days=offset)
    
    day_str = target_date.strftime("%A")  # Example: Wednesday
    date_str = target_date.strftime("%B %d, %Y")  # Example: February 05, 2025
    return day_str, date_str

def get_weather(city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={WEATHER_API_KEY}&units=metric"
    response = requests.get(url).json()
    if response.get("cod") != 200:
        return "Sorry, I couldn't find the weather for that location."
    temp = response['main']['temp']
    description = response['weather'][0]['description']
    return f"The weather in {city} is {description} with a temperature of {temp}°C."

def get_news():
    url = f"https://newsapi.org/v2/top-headlines?country=in&apiKey={NEWS_API_KEY}"
    response = requests.get(url).json()
    if response.get("status") != "ok":
        return "Sorry, I couldn't fetch news at the moment."
    articles = response['articles'][:5]
    news_summary = "\n".join([f"- {article['title']}" for article in articles])
    return f"Here are the latest news headlines:\n{news_summary}"

def get_sports_news():
    url = f"https://newsapi.org/v2/top-headlines?category=sports&country=in&apiKey={SPORTS_API_KEY}"
    response = requests.get(url).json()
    if response.get("status") != "ok":
        return "Sorry, I couldn't fetch sports news at the moment."
    articles = response['articles'][:5]
    sports_summary = "\n".join([f"- {article['title']}" for article in articles])
    return f"Latest sports updates:\n{sports_summary}"

def detect_intent(user_message):
    keywords = {
        "weather": ["weather", "temperature"],
        "news": ["news", "headlines"],
        "sports": ["sports", "game", "match"],
    }
    for intent, words in keywords.items():
        if any(word in user_message for word in words):
            return intent
    return "chat"


@app.route("/chat", methods=["POST"])
def chat_with_ai():
    data = request.json
    user_message = data.get("message", "").strip().lower()

    if not user_message:
        return jsonify({"response": "Please enter a valid message."})
    
    intent = detect_intent(user_message)
    
    if intent == "weather":
        city = user_message.split("in")[-1].strip()
        response = get_weather(city)
        return jsonify({"response": response})
    
    if intent == "news":
        response = get_news()
        return jsonify({"response": response})
    
    if intent == "sports":
        response = get_sports_news()
        return jsonify({"response": response})

    # Typing animation delay simulation
    time.sleep(1)
    
    # If not handled, ask Gemini AI
    try:
        response = chat.send_message(user_message)
        bot_response = response.text.replace(". ", ".\n")
    except Exception:
        bot_response = "Sorry, I couldn't process your request. Please try again."
    
    return jsonify({"response": bot_response})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Use Render's assigned port or default to 5000
    app.run(host="0.0.0.0", port=port, debug=True)

