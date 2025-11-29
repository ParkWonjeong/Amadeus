# Amadeus

Amadeus는 사용자의 일상을 돕는 개인 AI 비서 프로젝트입니다. 대화형 인터페이스를 통해 질문에 답변하고, 뉴스 및 날씨 브리핑 기능을 제공합니다.

## 주요 기능

- **AI 채팅**: Google Gemini 기반의 지능형 대화 기능
- **데일리 브리핑**: 최신 뉴스와 날씨 정보를 요약하여 제공

## 기술 스택

### Backend
- **Framework**: FastAPI
- **Language**: Python
- **AI Model**: Google Generative AI (Gemini)
- **Utilities**: BeautifulSoup4 (크롤링), python-dotenv (환경 변수 관리)

### Frontend
- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 시작 가이드

프로젝트를 로컬 환경에서 실행하는 방법입니다.

### 사전 요구 사항
- Python 3.8 이상
- Node.js 18 이상
- Google Gemini API Key

### 1. Backend 설정 및 실행

```bash
cd backend

# 가상환경 생성 (선택 사항)
python -m venv venv
source venv/bin/activate  # Mac/Linux
# .\venv\Scripts\activate  # Windows

# 의존성 설치
pip install -r requirements.txt

# 환경 변수 설정
# .env.example 파일을 .env로 복사하고 API 키를 입력하세요.
cp .env.example .env

# 서버 실행
python -m backend.main
# 또는
uvicorn backend.main:app --reload
```

백엔드 서버는 `http://localhost:8000`에서 실행됩니다.

### 2. Frontend 설정 및 실행

```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

프론트엔드 개발 서버는 `http://localhost:5173` (기본값)에서 실행됩니다.

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.