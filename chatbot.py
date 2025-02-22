import re

def chatbot_response(user_input):
    user_input = user_input.lower()

    if re.search(r'\b(안녕|안녕하세요|하이)\b', user_input):
        return "안녕하세요! 무엇을 도와드릴까요?"
    
    elif re.search(r'\b(날씨|날씨 어때)\b', user_input):
        return "오늘 날씨는 맑고 기온은 20도입니다."
    
    elif re.search(r'\b(이름|누구)\b', user_input):
        return "제 이름은 아마데우스입니다. 당신은요?"
    
    else:
        return "잘 이해하지 못했어요. 다른 질문을 해주세요!"
    
print("아마데우스와 대화를 시작하세요! (종료하려면 '종료' 입력)")

while True:
    user_input = input("유저: ")
    if user_input.lower() == "종료":
        print("아마데우스: 대화를 종료합니다.")
        break
    response = chatbot_response(user_input)
    print("아마데우스: ", response)