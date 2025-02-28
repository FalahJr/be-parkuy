import { Test, TestingModule } from '@nestjs/testing';
import { PengendaraController } from './pengendara.controller';

describe('PengendaraController', () => {
  let controller: PengendaraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PengendaraController],
    }).compile();

    controller = module.get<PengendaraController>(PengendaraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
