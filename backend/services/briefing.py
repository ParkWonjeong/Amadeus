import random
from datetime import datetime

class BriefingService:
    def get_news(self):
        # In a real app, use NewsAPI or similar.
        # Returning mock data for "Executive Secretary" feel.
        headlines = [
            {"title": "Global AI Market Projected to Reach $1.5T by 2030", "source": "TechCrunch", "time": "2 hours ago"},
            {"title": "Bitcoin Surges Past $100k Amid Institutional Adoption", "source": "CoinDesk", "time": "4 hours ago"},
            {"title": "New Quantum Computing Breakthrough Announced", "source": "Science Daily", "time": "6 hours ago"},
            {"title": "SpaceX Successfully Launches Starship V3", "source": "SpaceNews", "time": "8 hours ago"},
            {"title": "Fed Signals Potential Rate Cut Next Quarter", "source": "Bloomberg", "time": "10 hours ago"},
        ]
        return random.sample(headlines, 3)

    def get_weather(self):
        # Mock weather data
        return {
            "temp": 22,
            "condition": "Sunny",
            "location": "Seoul",
            "humidity": 45
        }
