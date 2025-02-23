import re
import wikipediaapi
from googlesearch import search

from transformers import pipeline

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
            return "Google 검색에서도 결과를 찾지 못했습니다."
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
    search_match = re.search(r'(.+?)\s*(?:검색(?:해줘)?|조사(?:해줘)?|알려줘)', user_input)
    
    if search_match:
        search_query = search_match.group(1).strip()  # 검색어 추출
        if search_query:  
            wiki_result = search_wikipedia(search_query)
            if wiki_result:
                summarized = summarize_content(wiki_result)
                formatted = format_bullet_points(summarized)
                return f"주요 내용은 다음과 같아.\n{formatted}"
            else:
                google_result = search_google(search_query)
                summarized = summarize_content(google_result)
                formatted = format_bullet_points(summarized)
                return f"해당 주제에 대해 검색된 링크를 제공해줄게.\n{formatted}"
        
        else:
            return "검색할 내용을 말해줘!"
    
    return "잘 이해하지 못했어. 다른 질문을 해줘!"
    
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