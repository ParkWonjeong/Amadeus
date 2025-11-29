import google.generativeai as genai
import os

class Brain:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            print("Warning: GEMINI_API_KEY not found in environment variables.")
            self.model = None
        else:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-flash-latest')
            self.chat = self.model.start_chat(history=[])

    def generate_response(self, prompt: str) -> str:
        if not self.model:
            return "I'm sorry, my brain is not connected (API Key missing)."
        
        try:
            response = self.chat.send_message(prompt)
            return response.text
        except Exception as e:
            return f"Error processing your request: {e}"

    def summarize_text(self, text: str) -> str:
        if not self.model:
             return "I'm sorry, my brain is not connected (API Key missing)."
        
        try:
            prompt = f"Summarize the following text:\n{text}"
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
             return f"Error summarizing text: {e}"
