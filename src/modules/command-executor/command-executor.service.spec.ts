import { Test, TestingModule } from '@nestjs/testing';
import { CommandExecutorService } from './command-executor.service';
import { writeFile, readFile, readdir } from 'fs/promises';
import { exec } from 'child_process';

jest.mock('fs/promises');
jest.mock('child_process', () => ({
  exec: jest.fn(),
}));

const mockExec = exec as unknown as jest.Mock;

describe('CommandExecutorService', () => {
  let service: CommandExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandExecutorService],
    }).compile();

    service = module.get<CommandExecutorService>(CommandExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listFiles', () => {
    it('should list files in a directory', async () => {
      const mockFiles = ['file1.txt', 'file2.txt'];
      (readdir as jest.Mock).mockResolvedValue(mockFiles);

      const files = await service.listFiles('/path/to/directory');
      expect(files).toEqual(mockFiles);
      expect(readdir).toHaveBeenCalledWith('/path/to/directory');
    });

    it('should throw an error if listing fails', async () => {
      (readdir as jest.Mock).mockRejectedValue(new Error('Failed to list directory'));

      await expect(service.listFiles('/path/to/directory')).rejects.toThrow('Failed to list directory');
    });
  });

  describe('readFile', () => {
    it('should read a file', async () => {
      const mockContent = 'File content';
      (readFile as jest.Mock).mockResolvedValue(mockContent);

      const content = await service.readFile('/path/to/directory', 'file.txt');
      expect(content).toBe(mockContent);
      expect(readFile).toHaveBeenCalledWith('/path/to/directory/file.txt', 'utf-8');
    });

    it('should throw an error if reading fails', async () => {
      (readFile as jest.Mock).mockRejectedValue(new Error('Failed to read file'));

      await expect(service.readFile('/path/to/directory', 'file.txt')).rejects.toThrow('Failed to read file');
    });
  });

  describe('writeFile', () => {
    it('should write content to a file', async () => {
      (writeFile as jest.Mock).mockResolvedValue(undefined);

      await expect(
        service.writeFile('/path/to/directory', 'file.txt', 'Hello, World!'),
      ).resolves.not.toThrow();
      expect(writeFile).toHaveBeenCalledWith('/path/to/directory/file.txt', 'Hello, World!', 'utf-8');
    });

    it('should throw an error if writing fails', async () => {
      (writeFile as jest.Mock).mockRejectedValue(new Error('Failed to write to file'));

      await expect(
        service.writeFile('/path/to/directory', 'file.txt', 'Hello, World!'),
      ).rejects.toThrow('Failed to write to file');
    });
  });

  describe('runCommand', () => {
    it('should execute an allowed command', async () => {
      const mockOutput = { stdout: 'Command output', stderr: '' };

      // Mock exec to simulate successful execution
      mockExec.mockImplementation((_cmd, _options, callback) => {
        callback(null, mockOutput.stdout, mockOutput.stderr);
      });

      const output = await service.runCommand('ls', '/path/to/directory');
      expect(output).toBe('Command output'); // Validate the mocked stdout value
      expect(mockExec).toHaveBeenCalledWith(
        'ls',
        { cwd: '/path/to/directory' },
        expect.any(Function),
      );
    });

    it('should throw an error if the command is not allowed', async () => {
      await expect(service.runCommand('rm -rf /', '/path/to/directory')).rejects.toThrow('Command not allowed');
    });

    it('should throw an error if the command execution fails', async () => {
      // Mock exec to simulate a failure
      mockExec.mockImplementation((_cmd, _options, callback) => {
        callback(new Error('Execution error'), '', '');
      });

      await expect(service.runCommand('ls', '/path/to/directory')).rejects.toThrow(
        'Command execution failed: Execution error',
      );
    });
  });
});
