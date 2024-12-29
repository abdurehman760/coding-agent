import { Injectable } from '@nestjs/common';
import { SequentialChain } from 'langchain/chains';
import * as path from 'path';
import { FileManagerService } from '../file-manager/file-manager.service';
import { OpenAiService } from '../../openai/openai.service';

@Injectable()
export class LangChainChainsService {
  constructor(
    private readonly fileManagerService: FileManagerService,
    private readonly openAiService: OpenAiService,
  ) {}

  async executeChain(directoryPath: string, fileName: string, outputFile: string): Promise<string> {
    try {
      // Ensure the directory exists before proceeding
      const resolvedDirectoryPath = path.resolve(directoryPath);

      // Check if directory exists, and create it if it does not
      const directoryExists = await this.fileManagerService.fileExists(resolvedDirectoryPath);
      if (!directoryExists) {
        await this.fileManagerService.createDirectory(resolvedDirectoryPath); // Create the directory
      }

      // Ensure the file exists, and create it with basic content if it doesn't
      const filePath = path.join(resolvedDirectoryPath, fileName);
      const fileExists = await this.fileManagerService.fileExists(filePath);
      if (!fileExists) {
        const defaultContent = '// Example JS content\nconsole.log("Hello, world!");'; // Example content
        await this.fileManagerService.writeFile(filePath, defaultContent); // Create the file with default content
      }

      // Step 2: Read file
      const fileContent = await this.fileManagerService.readFile(filePath);

      // Step 3: Generate code using OpenAI
      const prompt = `
        Based on the following content:
        ${fileContent}
        Generate a new React functional component with improvements.
      `;
      const generatedCode = await this.openAiService.generateText(prompt);

      // Step 4: Save file
      const outputPath = path.join(resolvedDirectoryPath, outputFile);
      await this.fileManagerService.writeFile(outputPath, generatedCode);

      return `Chain executed successfully. Generated file saved at: ${outputPath}`;
    } catch (error) {
      throw new Error(`Failed to execute chain: ${error.message}`);
    }
  }
}
