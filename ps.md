# Project Structure

## coding-agent/

### src/
- **modules/**
    - **langchain-chains/**
        - `langchain-chains.module.ts` - Module definition for Langchain Chains.
        - `langchain-chains.service.ts` - Service logic for Langchain Chains.
        - `langchain-chains.service.spec.ts` - Tests for Langchain Chains service.
        - `langchain-agent.service.ts` - Service logic for handling input and generating React components.
        - **Details**: This module handles the creation and management of chains in the Langchain framework. It includes the core logic for defining and executing chains, as well as unit tests to ensure functionality. The service file contains methods for creating, updating, and deleting chains, while the module file sets up the necessary providers and imports. The `langchain-chains.service.ts` file includes methods like `executeChain` for executing a chain of operations, which involves reading file content, generating code using OpenAI, and saving the generated code to a specified file. The `langchain-chains.module.ts` file imports the `FileManagerModule` and `OpenAiModule` to leverage their functionalities, and provides the `LangChainChainsService` to other modules. The `langchain-agent.service.ts` file includes methods like `handleInput` for processing input commands and `generateReactComponent` for creating React components based on the input.
    - **file-manager/**
        - `file-manager.module.ts` - Module definition for File Manager.
        - `file-manager.service.ts` - Service logic for File Manager.
        - `file-manager.service.spec.ts` - Tests for File Manager service.
        - **Details**: This module provides functionalities for managing files within the application. It includes services for reading, writing, and organizing files, along with tests to verify the file operations. The service file includes methods for file manipulation such as readFile, writeFile, and deleteFile, while the module file configures the service and any dependencies. The `file-manager.service.ts` file includes methods like `readFile` for reading file contents, `writeFile` for writing content to a file, `createDirectory` for creating directories, `deleteFileOrDirectory` for deleting files or directories, `fileExists` for checking if a file exists, `getAbsolutePath` for getting the absolute path of a file or directory, `readDirectory` for listing files in a directory, and `listDirectoryContents` for listing files and directories in a specified directory. The `file-manager.service.ts` file also includes error handling for scenarios like missing files or permission issues. The `file-manager.module.ts` file provides the `FileManagerService` to other modules.
    - **command-executor/**
        - `command-executor.module.ts` - Module definition for Command Executor.
        - `command-executor.service.ts` - Service logic for Command Executor.
        - `command-executor.service.spec.ts` - Tests for Command Executor service.
        - **Details**: This module is responsible for executing commands within the application. It includes the logic for parsing and running commands, as well as tests to ensure commands are executed correctly. The service file contains methods for executing shell commands and handling their output, while the module file sets up the necessary providers and configurations. The `command-executor.service.ts` file includes methods like `runCommand` for executing shell commands, `listFiles` for listing files in a directory, `readFile` for reading file contents, `writeFile` for writing content to a file, `generateCode` for creating a file with generated content, and `createFile` for creating an empty file. The `command-executor.module.ts` file provides the `CommandExecutorService` to other modules.
    - **code-generator/**
        - `code-generator.module.ts` - Module definition for Code Generator.
        - `code-generator.service.ts` - Service logic for Code Generator.
        - `code-generator.service.spec.ts` - Tests for Code Generator service.
        - **Details**: This module handles the generation of code based on templates and user inputs. It includes services for creating code snippets and full files, with tests to validate the generated code. The service file includes methods for generating code from templates and user inputs, while the module file configures the service and any dependencies. The `code-generator.module.ts` file imports the `FileManagerModule` and `OpenAiModule` to leverage their functionalities, and provides the `CodeGeneratorService` to other modules. The `code-generator.service.ts` file includes methods like `generateReactComponent` for creating React components and `modifyCodeInFile` for modifying existing code based on user instructions.
    - **cli**
        - `cli.module.ts` - Module definition for CLI.
        - `cli.service.ts` - Service logic for CLI.
        - `cli.service.spec.ts` - Tests for CLI service.
        - **Details**: This module provides a command-line interface for interacting with the application. It includes the logic for parsing CLI commands and executing corresponding actions, along with tests to ensure the CLI operates as expected. The service file contains methods for handling CLI commands and their arguments, while the module file sets up the necessary providers and configurations. The CLI module imports other modules such as Code Generator, Command Executor, and LangChain Chains to leverage their functionalities. The `cli.service.ts` file includes methods like `generate:react` for generating a React component, `edit:file` for modifying a specific file, `run:setup` for executing project setup commands, and `list:directory` for listing the contents of a directory. The CLI service also includes logging to provide detailed information about the execution of commands. The `applyModification` method in the `cli.service.ts` file has been updated to handle different types of modifications dynamically, such as adding new props and using props in the component. The `run:setup` command has been updated to accept the project name from the user and execute project setup commands using the `CommandExecutorService`.
    - **test/**
        - `test.module.ts` - Module definition for tests.
        - `test.controller.ts` - Controller for test routes.
        - **Details**: This module includes the setup for running tests within the application. It defines the test environment and includes a controller for handling test routes. The controller file contains routes for triggering tests and viewing test results, while the module file configures the testing environment and dependencies.
    - **openai/**
        - `openai.service.ts` - Service logic for OpenAI integration.
        - **Details**: This module integrates OpenAI's API into the application. It includes services for sending requests to OpenAI and processing the responses, enabling the application to leverage OpenAI's capabilities. The service file contains methods for interacting with OpenAI's API, such as sending prompts and handling responses, while the module file sets up the necessary providers and configurations. The `openai.service.ts` file includes methods like `generateText` for generating text based on a given prompt using OpenAI's API. The `openai.module.ts` file provides the `OpenAiService` to other modules.
- **app.module.ts** - Main application module.
    - **Details**: This is the root module of the application. It imports all other modules and sets up the overall application structure. The `app.module.ts` file typically includes imports for core modules like `LangChainChainsModule`, `FileManagerModule`, `CommandExecutorModule`, `CodeGeneratorModule`, `CliModule`, and `OpenAiModule`. It also provides global services and configurations needed for the application to run. This file is essential for bootstrapping the application and ensuring all modules are properly integrated.
