import { Test, TestingModule } from '@nestjs/testing';
import { ProgramsController } from '../src/programs/programs.controller';
import { ProgramsService } from '../src/programs/programs.service';

describe('ProgramsController', () => {
  let controller: ProgramsController;
  const mockService = {
    create: jest.fn(dto => ({ _id: '1', ...dto })),
    findAll: jest.fn(() => ({ items: [], total: 0 })),
    findOne: jest.fn(id => ({ _id: id, name: 'P' })),
    update: jest.fn((id, dto) => ({ _id: id, ...dto })),
    remove: jest.fn(id => ({ _id: id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramsController],
      providers: [{ provide: ProgramsService, useValue: mockService }],
    }).compile();

    controller = module.get<ProgramsController>(ProgramsController);
  });

  it('should create program', async () => {
    const dto = { name: 'Test' };
    const res = await controller.create(dto as any);
    expect(mockService.create).toHaveBeenCalledWith(dto);
    expect(res._id).toBeDefined();
  });

  it('should get one program', async () => {
    const res = await controller.findOne('1');
    expect(mockService.findOne).toHaveBeenCalledWith('1');
    expect(res._id).toBe('1');
  });

  it('should update program', async () => {
    const res = await controller.update('1', { name: 'X' } as any);
    expect(mockService.update).toHaveBeenCalledWith('1', { name: 'X' });
    expect(res.name).toBe('X');
  });

  it('should remove program', async () => {
    const res = await controller.remove('1');
    expect(mockService.remove).toHaveBeenCalledWith('1');
    expect(res._id).toBe('1');
  });
});