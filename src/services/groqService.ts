
interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

class GroqService {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.groq.com/openai/v1/chat/completions';

  constructor() {
    this.apiKey = localStorage.getItem('groq_api_key');
  }

  private getApiKey(): string {
    const key = localStorage.getItem('groq_api_key');
    if (!key) {
      throw new Error('Groq API key not found. Please set it in Settings.');
    }
    return key;
  }

  async generateResponse(prompt: string, model: string = 'llama-3.1-70b-versatile'): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getApiKey()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2048,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.statusText}`);
      }

      const data: GroqResponse = await response.json();
      return data.choices[0]?.message?.content || 'No response generated';
    } catch (error) {
      console.error('Groq API error:', error);
      throw error;
    }
  }

  async analyzeData(data: string): Promise<string> {
    return this.generateResponse(`Analyze this data and provide insights: ${data}`);
  }

  async generateHypothesis(topic: string): Promise<string> {
    return this.generateResponse(`Generate research hypotheses for: ${topic}`);
  }

  async summarizeNews(articles: string): Promise<string> {
    return this.generateResponse(`Summarize these news articles: ${articles}`);
  }

  isConfigured(): boolean {
    return !!localStorage.getItem('groq_api_key');
  }
}

export const groqService = new GroqService();
