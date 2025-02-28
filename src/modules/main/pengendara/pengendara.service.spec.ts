import { Test, TestingModule } from '@nestjs/testing';
import { PengendaraService } from './pengendara.service';

describe('PengendaraService', () => {
  let service: PengendaraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PengendaraService],
    }).compile();

    service = module.get<PengendaraService>(PengendaraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
