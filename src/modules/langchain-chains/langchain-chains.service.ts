import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { FileManagerService } from '../file-manager/file-manager.service';
import { OpenAiService } from '../../openai/openai.service';
import { FileReaderTool, FileWriterTool } from '../file-manager/file-manager.service';

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

      // Step 2: Use FileReaderTool to read the file content dynamically
      const fileReaderTool = new FileReaderTool();
      const fileContent = await fileReaderTool._call(filePath);

      // Step 3: Generate code using OpenAI based on the file content
      const prompt = `
        Based on the following content, generate a functional React component. 
        The component should be fully functional, include necessary imports (e.g., React), 
        and should not  be wrapped in a 'javascript' code block.
        Only provide the code, no explanations or extra text:
        ${fileContent}
      `;
      const generatedCode = await this.openAiService.generateText(prompt);

      // Step 4: Ensure the output file has a `.jsx` extension
      const outputFileWithExtension = outputFile.endsWith('.jsx') ? outputFile : `${outputFile}.jsx`;

      // Step 5: Use FileWriterTool to save the generated code in the correct output file
      const fileWriterTool = new FileWriterTool();
      const outputPath = path.join(resolvedDirectoryPath, outputFileWithExtension);
      await fileWriterTool._call({ filePath: outputPath, content: generatedCode });

      return `Chain executed successfully. Generated file saved at: ${outputPath}`;
    } catch (error) {
      throw new Error(`Failed to execute chain: ${error.message}`);
    }
  }
}
