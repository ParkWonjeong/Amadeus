import re
import wikipediaapi

from transformers import pipeline

def search_wikipedia(query, lang="en"):
    user_agent = "AmadeusChatbot/1.0 (josephwjp8@gmail.com)"
    wiki = wikipediaapi.Wikipedia(language = lang, user_agent= user_agent)
    page = wiki.page(query)

    if page.exists():
        return page.summary[:500]
    else:
        return "검색 결과가 없습니다."
    
def chatbot_response(user_input):
    search_match = re.search(r'(.+?)\s*(?:검색(?:해줘)?|조사(?:해줘)?|알려줘)', user_input)
    
    if search_match:
        search_query = search_match.group(1).strip()  # 검색어 추출
        if search_query:  
            return search_wikipedia(search_query)
        else:
            return "검색할 내용을 입력해주세요!"
    
    return "잘 이해하지 못했어요. 다른 질문을 해주세요!"
    
print("아마데우스와 대화를 시작하세요! (종료하려면 '종료' 입력)")

while True:
    user_input = input("유저: ")
    if user_input.lower() == "종료":
        print("아마데우스: 대화를 종료합니다.")
        break
    response = chatbot_response(user_input)
    print("아마데우스: ", response)