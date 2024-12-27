import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

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
}
