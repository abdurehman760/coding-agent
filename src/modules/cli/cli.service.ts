import { Injectable } from '@nestjs/common';
import { Command } from 'commander';
import { LangChainAgentService } from '../langchain-chains/langchain-agent.service';
import { FileManagerService } from '../file-manager/file-manager.service';
import { CommandExecutorService } from '../command-executor/command-executor.service';

@Injectable()
export class CliService {
  private program: Command;

  constructor(
    private readonly langChainAgentService: LangChainAgentService,
    private readonly fileManagerService: FileManagerService,
    private readonly commandExecutorService: CommandExecutorService,
  ) {
    this.program = new Command();
    this.initializeCommands();
  }

  private initializeCommands() {
    this.program
      .command('generate:react <folderPath>')
      .description('Generate a React component')
      .action(async (folderPath: string) => {
        await this.langChainAgentService.handleInput(`Generate a React component in this folder: ${folderPath}`);
      });

    this.program
      .command('edit:file <filePath> <modification>')
      .description('Modify a specific file')
      .action(async (filePath: string, modification: string) => {
        console.log(`Editing file: ${filePath} with modification: ${modification}`);
        const fileContent = await this.fileManagerService.readFile(filePath);
        console.log(`Original file content: \n${fileContent}`);
        const modifiedContent = this.applyModification(fileContent, modification);
        console.log(`Modified file content: \n${modifiedContent}`);
        await this.fileManagerService.writeFile(filePath, modifiedContent);
        console.log(`File ${filePath} modified successfully.`);
      });

    this.program
      .command('run:setup')
      .description('Execute project setup commands')
      .action(async () => {
        console.log('Running setup commands...');
        await this.runSetupCommands();
        console.log('Setup completed successfully.');
      });
  }

  private async runSetupCommands() {
    // Example setup commands
    await this.commandExecutorService.runCommand('npm install', process.cwd());
    await this.commandExecutorService.runCommand('npm run build', process.cwd());
    // Add more setup commands as needed
  }

  private applyModification(content: string, modification: string): string {
    const lines = content.split('\n');
    let modifiedLines = [...lines];

    if (modification.startsWith("Add a new prop '")) {
      const propName = modification.match(/Add a new prop '(\w+)'/)[1];
      modifiedLines = lines.map(line => {
        if (line.includes('const MyComponent = ({')) {
          return line.replace('({', `({ ${propName},`);
        }
        return line;
      });
    } else if (modification.startsWith("use the prop '")) {
      const propName = modification.match(/use the prop '(\w+)'/)[1];
      modifiedLines = lines.map(line => {
        if (line.includes('<div>')) {
          return `${line}\n      <p>{${propName}}</p>`;
        }
        return line;
      });
    }

    return modifiedLines.join('\n');
  }

  public async run(argv: string[]) {
    await this.program.parseAsync(argv);
  }
}
