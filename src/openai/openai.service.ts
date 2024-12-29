// relative path: src/openai/openai.service.ts

import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';  // Ensure that this import is correct for your OpenAI SDK version

@Injectable()
export class OpenAiService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,  // Use your OpenAI API key here
    });
  }

  // Generate text based on a given prompt
  async generateText(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o-2024-11-20',  // You can adjust the model version as per your requirement
      });

      return response.choices[0]?.message?.content?.trim() || '';
    } catch (error) {
      throw new Error(`Failed to generate text: ${error.message}`);
    }
  }
}
