//src\modules\code-generator\code-generator.service.ts

import { Injectable } from '@nestjs/common';
import { FileManagerService } from '../file-manager/file-manager.service';
import { OpenAiService } from '../../openai/openai.service';

@Injectable()
export class CodeGeneratorService {
  constructor(
    private readonly fileManagerService: FileManagerService,
    private readonly openAiService: OpenAiService,
  ) {}

  // Method to generate a React component based on the name and props
  async generateReactComponent(name: string, props: string[], filePath: string): Promise<string> {
    const prompt = `
      Generate a React functional component named ${name} in JSX format with the following props: ${props.join(', ')}.
      The component should include:
      - The prop values being displayed in JSX.
      - No TypeScript types, only JSX code.
      - Include basic React imports (if necessary).
      - Do not include any enclosing markdown blocks like \`\`\`jsx or \`\`\`.
    `;

    try {
      // Use OpenAiService to generate the code based on the prompt
      const generatedCode = await this.openAiService.generateText(prompt);

      // Save the generated code to a specified file
      await this.fileManagerService.writeFile(filePath, generatedCode);

      return `React component ${name} generated and saved to ${filePath}.`;
    } catch (error) {
      throw new Error(`Failed to generate React component: ${error.message}`);
    }
  }

  // Method to modify existing code in a file based on user instructions
  async modifyCodeInFile(filePath: string, userInstructions: string): Promise<string> {
    try {
      // Fetch the existing code from the file
      const existingCode = await this.fileManagerService.readFile(filePath);

      // Create a prompt to modify the code based on user instructions
      const prompt = `
        Here is the code: ${existingCode}
        Modify the code based on the following instructions: ${userInstructions}.
        Ensure that the changes are valid and the code remains functional.
        Do not include any enclosing markdown blocks like \`\`\`.
      `;

      // Use OpenAiService to generate the modified code
      const modifiedCode = await this.openAiService.generateText(prompt);

      // Save the modified code back to the file
      await this.fileManagerService.writeFile(filePath, modifiedCode);

      return `Code modified and saved to ${filePath}.`;
    } catch (error) {
      throw new Error(`Failed to modify code in file: ${error.message}`);
    }
  }
}
