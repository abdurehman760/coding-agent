// relative path: src/modules/command-executor/command-executor.service.ts

import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { readFile, writeFile, readdir } from 'fs/promises';

const execPromise = promisify(exec);

@Injectable()
export class CommandExecutorService {
  // Allowed commands for execution
  private allowedCommands = [
    'ls',
    'cat',
    'echo',
    'touch',
  ];

  // Execute a shell command and return the output
  async runCommand(command: string, directory: string): Promise<string> {
    if (!this.isAllowedCommand(command)) {
      throw new Error('Command not allowed');
    }

    try {
      const { stdout, stderr } = await execPromise(command, { cwd: directory });
      if (stderr) {
        throw new Error(`Error executing command: ${stderr}`);
      }
      return stdout;
    } catch (error) {
      throw new Error(`Command execution failed: ${error.message}`);
    }
  }

  // Check if the command is allowed
  private isAllowedCommand(command: string): boolean {
    return this.allowedCommands.some(allowedCommand => command.startsWith(allowedCommand));
  }

  // List files in a directory
  async listFiles(directory: string): Promise<string[]> {
    try {
      return await readdir(directory);
    } catch (error) {
      throw new Error(`Failed to list directory: ${error.message}`);
    }
  }

  // Read a file's contents
  async readFile(directory: string, filePath: string): Promise<string> {
    try {
      return await readFile(`${directory}/${filePath}`, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }

  // Write content to a file
  async writeFile(directory: string, filePath: string, content: string): Promise<void> {
    try {
      await writeFile(`${directory}/${filePath}`, content, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to write to file: ${error.message}`);
    }
  }

  // Generate code (create a file with generated content)
  async generateCode(directory: string, filePath: string, content: string): Promise<void> {
    await this.writeFile(directory, filePath, content);
  }

  // Create an empty file
  async createFile(directory: string, filePath: string): Promise<void> {
    await this.writeFile(directory, filePath, '');
  }
}
