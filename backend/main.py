from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

from .services.brain import Brain
from .services.briefing import BriefingService

load_dotenv()

app = FastAPI(title="Amadeus API", description="Backend for Amadeus AI Assistant")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Services
brain = Brain()
briefing_service = BriefingService()

# Data Models
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

class BriefingResponse(BaseModel):
    news: List[dict]
    weather: dict
    market_data: dict
    status: str

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        response_text = brain.generate_response(request.message)
        return ChatResponse(response=response_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/briefing", response_model=BriefingResponse)
async def get_briefing():
    try:
        news = briefing_service.get_news()
        weather = briefing_service.get_weather()
        market_data = briefing_service.get_market_data()
        return BriefingResponse(
            news=news,
            weather=weather,
            market_data=market_data,
            status="All systems operational."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
