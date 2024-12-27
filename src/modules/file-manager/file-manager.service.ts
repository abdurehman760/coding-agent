import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileManagerService {
  // Parse a directory and return a list of files and subdirectories
  async parseDirectory(directoryPath: string): Promise<string[]> {
    try {
      const files = await fs.promises.readdir(directoryPath);
      return files;
    } catch (error) {
      throw new Error(`Unable to read directory: ${error.message}`);
    }
  }

  // Read the content of a file
  async readFile(filePath: string, encoding: BufferEncoding = 'utf-8'): Promise<string> {
    try {
      const fileContent = await fs.promises.readFile(filePath, encoding);
      return fileContent;
    } catch (error) {
      throw new Error(`Unable to read file: ${error.message}`);
    }
  }

  // Write content to a file
  async writeFile(filePath: string, content: string): Promise<void> {
    try {
      await fs.promises.writeFile(filePath, content);
    } catch (error) {
      throw new Error(`Unable to write file: ${error.message}`);
    }
  }
}
