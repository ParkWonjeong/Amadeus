import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
from transformers import GPT2Tokenizer

# Transformer 블록 정의
class simpleTransformerBlock(nn.Module):
    def __init__(self, embed_dim, num_heads, ff_hidden_dim):
        super(simpleTransformerBlock, self).__init__()
        # Attention과 Feed Forward 구현 ( 더 찾아보기!! )
        self.attention = nn.MultiheadAttention(embed_dim, num_heads)
        self.feed_forward = nn.Sequential(
            nn.Linear(embed_dim, ff_hidden_dim),
            nn.ReLU(),
            nn.Linear(ff_hidden_dim, embed_dim)
        )
        self.norm1 = nn.LayerNorm(embed_dim)
        self.norm2 = nn.LayerNorm(embed_dim)

    def forward(self, x):
        attn_output, _ = self.attention(x, x, x)
        x = self.norm1(x + attn_output)
        ff_output = self.feed_forward(x)
        x = self.norm2(x + ff_output)

        return x
    
# GPT 모델 정의
class SimpleGPT(nn.Module):
    def __init__(self, vocab_size, embed_dim, num_heads, ff_hidden_dim, num_layers):
        super(SimpleGPT, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.transformer_blocks = nn.Sequential(*[
            simpleTransformerBlock(embed_dim, num_heads, ff_hidden_dim) for _ in range(num_layers)
        ])
        self.fc = nn.Linear(embed_dim, vocab_size)

    def forward(self, x):
        x = self.embedding(x)
        x = self.transformer_blocks(x)
        x = self.fc(x)

        return x
    
# 토크나이저 및 데이터 설정
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
vocab_size = tokenizer.vocab_size

# 모델 생성
model = SimpleGPT(vocab_size=vocab_size, embed_dim=128, num_heads=4, ff_hidden_dim=256, num_layers=2)

# 옵티마이저 및 손실 함수 설정
optimizer = optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

# 학습 데이터 (예제)
text = "Hello, how are you today? I am a chatbot that can generate text based on your input. My goal is to help you understand GPT models and how they work."
tokens = tokenizer.encode(text, return_tensors="pt")

# 학습 루프
print("🔄 Training model...")
for epoch in range(100):
    optimizer.zero_grad()
    output = model(tokens)
    loss = criterion(output.view(-1, vocab_size), tokens.view(-1))
    loss.backward()
    optimizer.step()
    print(f"Epoch {epoch+1}, Loss: {loss.item()}")
    print(f"Training data shape: {tokens.shape}")

print("✅ Training complete!")

# 텍스트 생성 함수
def generate_text(model, prompt, max_length=20):
    tokens = tokenizer.encode(prompt, return_tensors="pt")
    with torch.no_grad():
        for _ in range(max_length):
            output = model(tokens)
            next_token = torch.argmax(output[:, -1, :], dim=-1)
            tokens = torch.cat([tokens, next_token.unsqueeze(0)], dim=-1)
    return tokenizer.decode(tokens[0], skip_special_tokens=True)

# 모델 테스트
print("📝 Testing model...")
print(generate_text(model, "Hello,"))