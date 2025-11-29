# Amadeus: Tactical OS

**Amadeus**는 사용자의 인지 능력을 확장하고 실행력을 극대화하기 위해 설계된 학습 및 작업 도움 서비스입니다.

마블 캐릭터 **아마데우스 조(Amadeus Cho)**의 천재적인 연산 능력과 효율성에서 영감을 받아, 복잡한 정보를 직관적으로 시각화하고 사용자의 학습과 작업에 도움을 줄 수 있도록 기획되었습니다.

## 핵심 기능 (Core Features)

1.  **Intelligence (정보)**: 실시간 시장 데이터(BTC, SPY)와 뉴스를 시각화하여 핵심 정보를 제공합니다.
2.  **Discipline (집중)**: 'Focus Mode'를 통해 뽀모도로 타이머 기반의 몰입 환경을 제공합니다.
3.  **Strategy (전략)**: 'Mission Log'를 통해 목표를 세부 실행 계획으로 구체화합니다.
4.  **Memory (기억)**: 'Knowledge Base'를 통해 아이디어와 지식을 체계적으로 저장합니다.

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