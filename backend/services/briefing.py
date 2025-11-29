import random
from datetime import datetime

class BriefingService:
    def get_market_data(self):
        import yfinance as yf
        
        tickers = ['BTC-USD', 'SPY']
        data = {}
        
        for ticker in tickers:
            try:
                # Get 1 month of history
                stock = yf.Ticker(ticker)
                hist = stock.history(period="1mo")
                
                # Format data for frontend
                chart_data = []
                for date, row in hist.iterrows():
                    chart_data.append({
                        "date": date.strftime('%Y-%m-%d'),
                        "price": round(row['Close'], 2)
                    })
                
                # Get current price and change
                current_price = chart_data[-1]['price']
                prev_price = chart_data[-2]['price']
                change = round(((current_price - prev_price) / prev_price) * 100, 2)
                
                data[ticker] = {
                    "current_price": current_price,
                    "change": change,
                    "chart_data": chart_data
                }
            except Exception as e:
                print(f"Error fetching data for {ticker}: {e}")
                data[ticker] = None
                
        return data

    def get_news(self):
        # In a real app, use NewsAPI or similar.
        # Returning mock data for "Executive Secretary" feel.
        headlines = [
            {"title": "Global AI Market Projected to Reach $1.5T by 2030", "source": "TechCrunch", "time": "2 hours ago", "url": "https://www.google.com/search?q=Global+AI+Market+Projected+to+Reach+$1.5T+by+2030"},
            {"title": "Bitcoin Surges Past $100k Amid Institutional Adoption", "source": "CoinDesk", "time": "4 hours ago", "url": "https://www.google.com/search?q=Bitcoin+Surges+Past+$100k"},
            {"title": "New Quantum Computing Breakthrough Announced", "source": "Science Daily", "time": "6 hours ago", "url": "https://www.google.com/search?q=New+Quantum+Computing+Breakthrough"},
            {"title": "SpaceX Successfully Launches Starship V3", "source": "SpaceNews", "time": "8 hours ago", "url": "https://www.google.com/search?q=SpaceX+Successfully+Launches+Starship+V3"},
            {"title": "Fed Signals Potential Rate Cut Next Quarter", "source": "Bloomberg", "time": "10 hours ago", "url": "https://www.google.com/search?q=Fed+Signals+Potential+Rate+Cut"},
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
