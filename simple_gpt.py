import torch
import torch.nn as nn
import torch.optim as optim
from transformers import GPT2Tokenizer

class TransformerBlock(nn.Module):
    def __init__(self, embed_dim, num_heads, ff_hidden_dim):
        super(TransformerBlock, self).__init__()
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

class SimpleGPT(nn.Module):
    def __init__(self, vocab_size, embed_dim, num_heads, ff_hidden_dim, num_layers):
        super(SimpleGPT, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.transformer_blocks = nn.Sequential(*[
            TransformerBlock(embed_dim, num_heads, ff_hidden_dim) for _ in range(num_layers)
        ])
        self.fc = nn.Linear(embed_dim, vocab_size)

    def forward(self, x):
        x = self.embedding(x)
        x = self.transformer_blocks(x)
        x = self.fc(x)
        return x


tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
vocab_size = tokenizer.vocab_size

text = """Hello, how are you today? I am a chatbot designed to assist you.
You can ask me about machine learning, artificial intelligence, and programming.
Let's explore AI together and learn more about NLP models!
User: What is deep learning?
Chatbot: Deep learning is a subset of machine learning that uses neural networks with multiple layers.
User: Tell me about reinforcement learning.
Chatbot: Reinforcement learning is an AI training method where an agent learns by interacting with an environment and receiving rewards.
"""

tokens = tokenizer.encode(text, return_tensors="pt")
model = SimpleGPT(vocab_size=vocab_size, embed_dim=128, num_heads=4, ff_hidden_dim=512, num_layers=2)
optimizer = optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

print("Training model ...")

for epoch in range(100):
    optimizer.zero_grad()
    output = model(tokens)
    loss = criterion(output.view(-1, vocab_size), tokens.view(-1))
    loss.backward()
    optimizer.step()
    print(f"Epoch {epoch+1}, Loss: {loss.item()}")

print("Training complete.")

def generate_text(model, prompt, max_length=20):
    tokens = tokenizer.encode(prompt, return_tensors="pt")
    with torch.no_grad():
        for _ in range(max_length):
            output = model(tokens)
            next_token = torch.argmax(output[:, -1, :], dim=-1)
            next_token = next_token.unsqueeze(0)
            tokens = torch.cat([tokens, next_token], dim = 1)

    return tokenizer.decode(tokens[0], skip_special_tokens=True)

print("Testing model ...")
print(generate_text(model, "Hello,"))