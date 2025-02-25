import re
import wikipediaapi
from googlesearch import search
from langdetect import detect
from transformers import pipeline

def generate_gpt_response(prompt):
    """ Meta Llama 2 모델 사용 """
    generator = pipeline("text-generation", model = "meta-llama/Llama-2-7b-chat-hf")
    response = generator(prompt, max_length=200, do_sample=True)
    return response[0]["generated_text"].strip()

def detect_language(text):
    return detect(text)

def classify_question(question: str):
    # 비교 질문 패턴
    comparison_patterns = [
        r"(.+)와 (.+)의 차이",
        r"(.+) vs (.+)",
        r"(.+)랑 (.+) 뭐가 달라"
    ]

    # 개념 질문 패턴
    concept_patterns = [
        r"(.+)이[란] 무엇",
        r"(.+)이 뭐야",
        r"(.+)을 설명"
    ]

    # 비교 질문 감지
    for pattern in comparison_patterns:
        match = re.search(pattern, question)
        if match:
            return "comparison", match.groups()
        
    for pattern in concept_patterns:
        match = re.search(pattern, question)
        if match:
            return "concept", match.groups()
    
    return "general_search", None

def search_wikipedia(query, lang="en"):
    user_agent = "AmadeusChatbot/1.0 (josephwjp8@gmail.com)"
    wiki = wikipediaapi.Wikipedia(language = lang, user_agent= user_agent)
    page = wiki.page(query)

    if page.exists():
        return page.summary[:500]
    else:
        return None
    
def search_google(query):
    try:
        search_results = list(search(query, lang="en"))
        if search_results:
            return f"Google 검색 결과:\n" + "\n".join(search_results)
        else:
            return "Google 검색에서도 결과를 찾지 못했어."
    except Exception as e:
        return f"Google 검색 중 오류 발생: {e}"
    
def summarize_content(content):
    summarizer = pipeline("summarization", model="t5-small")
    summary = summarizer(content, max_length = 500, min_length = 100, do_sample = False)
    return summary[0]['summary_text']

def format_bullet_points(content):
    lines = content.split(". ")
    bullet_points = "\n".join([f"- {line.strip()}" for line in lines])
    return bullet_points
    
def chatbot_response(user_input):
    lang = detect_language(user_input)
    question_type, details = classify_question(user_input)
    if question_type == "comparison":
        item1, item2 = details
        wiki_result1 = search_wikipedia(item1, lang=lang)
        wiki_result2 = search_wikipedia(item2, lang=lang)
        if wiki_result1 and wiki_result2:
            return f"{item1}과 {item2}의 차이:\n- {wiki_result1[:300]}\n- {wiki_result2[:300]}"
        return "비교할 내용을 찾을 수 없어.."
    elif question_type == "concept":
        concept = details[0]
        wiki_result = search_wikipedia(concept, lang=lang)
        if wiki_result:
            return wiki_result
        google_result = search_google(concept)
        return google_result if google_result else "검색 결과가 없어.."
    else:
        return generate_gpt_response(user_input)
    
print("아마데우스와 대화를 시작하세요! (종료하려면 '종료' 입력)")

while True:
    user_input = input("유저: ")
    if user_input.lower() == "종료":
        print("아마데우스: 이제 대화를 마칠게.")
        break
    elif user_input.lower() == "고마워":
        print("아마데우스: 천만에! 언제든지 또 물어봐!")
        break
    response = chatbot_response(user_input)
    print("아마데우스: ", response)