import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai'; // Correct import for OpenAI SDK

@Injectable()
export class OpenAiService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,  // Your API key
    });
  }

  // Generate text based on a given prompt
  async generateText(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4o-mini-2024-07-18',  // Ensure you're using the correct GPT-4o mini model
    });

    return response.choices[0]?.message?.content?.trim() || '';
  }
}
