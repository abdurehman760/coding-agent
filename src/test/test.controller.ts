//src\test\test.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CodeGeneratorService } from '../modules/code-generator/code-generator.service';
import { LangChainChainsService } from '../modules/langchain-chains/langchain-chains.service';

@Controller('test')
export class TestController {
  constructor(
    private readonly codeGeneratorService: CodeGeneratorService,
    private readonly langChainChainsService: LangChainChainsService, // Inject LangChainChainsService
  ) {}

  @Post('generate-component')
  async generateComponent(
    @Body() body: { name: string; props: string[]; filePath: string },
  ) {
    const { name, props, filePath } = body;
    return await this.codeGeneratorService.generateReactComponent(name, props, filePath);
  }

  @Post('modify-file')
  async modifyFile(
    @Body() body: { filePath: string; instructions: string },
  ) {
    const { filePath, instructions } = body;
    return await this.codeGeneratorService.modifyCodeInFile(filePath, instructions);
  }

  @Post('execute-chain')
  async executeChain(
    @Body() body: { directoryPath: string; fileName: string; outputFile: string },
  ) {
    const { directoryPath, fileName, outputFile } = body;
    return await this.langChainChainsService.executeChain(directoryPath, fileName, outputFile);
  }
}
