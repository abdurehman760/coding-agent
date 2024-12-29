import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { Tool } from 'langchain/tools';

// Promisify fs functions for async usage
const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);

@Injectable()
export class FileManagerService {
  // Read file from the filesystem
  async readFile(filePath: string): Promise<string> {
    try {
      const content = await fsReadFile(filePath, 'utf-8');
      return content;
    } catch (error) {
      throw new Error(`Failed to read file at ${filePath}: ${error.message}`);
    }
  }

  // Write content to a file
  async writeFile(filePath: string, content: string): Promise<void> {
    try {
      // Ensure the directory exists before writing
      const directoryPath = path.dirname(filePath);
      await this.createDirectory(directoryPath);

      // Write the file
      await fsWriteFile(filePath, content, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to write to file at ${filePath}: ${error.message}`);
    }
  }

  // Create a directory if it doesn't exist
  async createDirectory(directoryPath: string): Promise<void> {
    const dirExists = fs.existsSync(directoryPath);
    if (!dirExists) {
      try {
        fs.mkdirSync(directoryPath, { recursive: true });
      } catch (error) {
        throw new Error(`Failed to create directory at ${directoryPath}: ${error.message}`);
      }
    }
  }

  // Delete a file or directory
  async deleteFileOrDirectory(filePath: string): Promise<void> {
    try {
      if (fs.existsSync(filePath)) {
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        throw new Error(`File or directory at ${filePath} does not exist.`);
      }
    } catch (error) {
      throw new Error(`Failed to delete file or directory at ${filePath}: ${error.message}`);
    }
  }

  // Check if file exists
  async fileExists(filePath: string): Promise<boolean> {
    return fs.existsSync(filePath);
  }

  // Get the absolute path of a file or directory
  getAbsolutePath(filePath: string): string {
    return path.resolve(filePath);
  }

  // List files in a directory
  async readDirectory(directoryPath: string): Promise<string[]> {
    try {
      return await fs.promises.readdir(directoryPath);
    } catch (error) {
      throw new Error(`Failed to list directory at ${directoryPath}: ${error.message}`);
    }
  }

  // Get a LangChain-compatible tool for file operations
  getFileTool(): Tool {
    return new (class extends Tool {
      name = 'FileManagerTool';
      description = 'Performs file and directory operations on the filesystem';

      async _call(input: { action: string; args: any }): Promise<any> {
        const { action, args } = input;

        switch (action) {
          case 'readFile':
            return await FileManagerService.prototype.readFile.call(this, args.filePath);
          case 'writeFile':
            await FileManagerService.prototype.writeFile.call(this, args.filePath, args.content);
            return `File written successfully to ${args.filePath}`;
          case 'createDirectory':
            await FileManagerService.prototype.createDirectory.call(this, args.directoryPath);
            return `Directory created successfully at ${args.directoryPath}`;
          case 'readDirectory':
            return await FileManagerService.prototype.readDirectory.call(this, args.directoryPath);
          default:
            throw new Error(`Unsupported action: ${action}`);
        }
      }
    })();
  }
}

// FileReader Tool (LangChain)
@Injectable()
export class FileReaderTool extends Tool {
  name = 'FileReader';
  description = 'Reads the content of a file from the filesystem';

  // Method to read file content
  async _call(filePath: string): Promise<string> {
    try {
      return await fs.promises.readFile(filePath, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to read file at ${filePath}: ${error.message}`);
    }
  }
}

// FileWriter Tool (LangChain)
@Injectable()
export class FileWriterTool extends Tool {
  name = 'FileWriter';
  description = 'Writes content to a specified file on the filesystem';

  // Method to write content to file
  async _call(input: { filePath: string; content: string }): Promise<string> {
    try {
      await fs.promises.writeFile(input.filePath, input.content, 'utf-8');
      return `File successfully written to ${input.filePath}`;
    } catch (error) {
      throw new Error(`Failed to write to file at ${input.filePath}: ${error.message}`);
    }
  }
}
