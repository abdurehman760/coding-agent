import { Test, TestingModule } from '@nestjs/testing';
import { LangchainAgentService } from './langchain-agent.service';

describe('LangchainAgentService', () => {
  let service: LangchainAgentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LangchainAgentService],
    }).compile();

    service = module.get<LangchainAgentService>(LangchainAgentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
