import { Injectable } from '@nestjs/common';
import { FileManagerService } from '../file-manager/file-manager.service';
import { CodeGeneratorService } from '../code-generator/code-generator.service';

@Injectable()
export class LangChainAgentService {
  constructor(
    private readonly fileManagerService: FileManagerService,
    private readonly codeGeneratorService: CodeGeneratorService,
  ) {}

  async handleInput(input: string): Promise<void> {
    if (input.startsWith('Generate a React component in this folder')) {
      const folderPath = this.parseFolderPath(input);
      console.log(`Parsed folder path: ${folderPath}`);
      await this.generateReactComponent(folderPath);
    } else {
      throw new Error('Unsupported input');
    }
  }

  private parseFolderPath(input: string): string {
    return input.split('Generate a React component in this folder: ')[1].trim();
  }

  private async generateReactComponent(folderPath: string): Promise<void> {
    const componentName = 'MyComponent'; // Placeholder
    const props: string[] = []; // Placeholder for props

    console.log(`Generating React component: ${componentName} in folder: ${folderPath}`);

    if (!await this.fileManagerService.fileExists(folderPath)) {
      console.log(`Folder does not exist. Creating folder: ${folderPath}`);
      await this.fileManagerService.createDirectory(folderPath);
    }

    const componentCode = await this.codeGeneratorService.generateReactComponent(componentName, props, folderPath);
    console.log(`Generated component code: \n${componentCode}`);
    await this.fileManagerService.writeFile(`${folderPath}/${componentName}.tsx`, componentCode);
    console.log(`React component ${componentName} saved to ${folderPath}/${componentName}.tsx`);
  }
}
