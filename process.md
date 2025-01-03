# Manual Testing Process

## Testing CLI Functionality

### Prerequisites
- Ensure you have Node.js and npm installed.
- Navigate to the project directory.

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build the Project**
   ```bash
   npm run build
   ```

3. **Run the CLI Commands**

   - **Generate a React Component**
     ```bash
     node dist/main.js generate:react ./src/components
     ```
     Example output:
     ```
     React component generated successfully in ./src/components/MyComponent.tsx
     ```

   - **Edit a File**
     ```bash
     node dist/main.js edit:file ./src/components/MyComponent.tsx "Add a new prop 'title'"
     ```
     Example output:
     ```
     File ./src/components/MyComponent.tsx modified successfully.
     ```

     ```bash
     node dist/main.js edit:file ./src/components/MyComponent.tsx "use the prop 'title'"
     ```
     Example output:
     ```
     File ./src/components/MyComponent.tsx modified successfully.
     ```

   - **Run Setup Commands**
     ```bash
     node dist/main.js run:setup ~/Desktop nest-project
     ```
     > **Note:** Replace `~/Desktop` with your desired directory and `nest-project` with your desired project name.
     Example output:
     ```
     Running setup commands in directory: ~/Desktop for project: nest-project...
     Creating NestJS project: nest-project...
     NestJS project creation output:
     ...
     Executing npm install...
     npm install output:
     ...
     Executing npm run build...
     npm run build output:
     ...
     Setup completed successfully.
     ```

   - **List Directory Contents**
     ```bash
     node dist/main.js list:directory ./src/components
     ```
     Example output:
     ```
     Contents of ./src/components:
     MyComponent.tsx
     AnotherComponent.tsx
     ```

4. **Verify the Results**
   - For the `generate:react` command, check the specified folder for the generated React component file.
   - For the `edit:file` command, open the specified file and verify that the modification has been applied.
   - For the `run:setup` command, ensure that the setup commands have been executed successfully.
   - For the `list:directory` command, verify that the listed contents match the actual contents of the specified directory.

### Notes
- Ensure that the `.env` file is properly configured with necessary environment variables.
- Use `console.log` statements in the service methods to debug and verify the flow of execution.
