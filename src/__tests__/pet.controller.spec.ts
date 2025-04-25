import { Test, TestingModule } from '@nestjs/testing';
import { PetController } from '../pet.controller';
import { PetService } from '../pet.service';
import { CreatePetDto } from '../dto/create-pet.dto';
import { UpdatePetDto } from '../dto/update-pet.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

const mockPetService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('PetController', () => {
  let controller: PetController;
  let service: typeof mockPetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetController],
      providers: [{ provide: PetService, useValue: mockPetService }],
    }).compile();

    controller = module.get<PetController>(PetController);
    service = module.get(PetService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a pet', async () => {
    const dto: CreatePetDto = {
      name: 'Fido',
      species: 'Dog',
      breed: 'Labrador',
      gender: 'Male',
      age: 2,
      microchipId: '123',
      ownerId: 1,
    };
    const pet = { ...dto, id: 1 };
    service.create.mockResolvedValue(pet);
    await expect(controller.create(dto)).resolves.toEqual(pet);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all pets', async () => {
    const pets = [{ id: 1 }, { id: 2 }];
    service.findAll.mockResolvedValue(pets);
    await expect(controller.findAll()).resolves.toEqual(pets);
  });

  it('should return a pet by id', async () => {
    const pet = { id: 1 };
    service.findOne.mockResolvedValue(pet);
    await expect(controller.findOne(1)).resolves.toEqual(pet);
  });

  it('should throw NotFoundException if pet not found', async () => {
    service.findOne.mockRejectedValue(new NotFoundException());
    await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a pet', async () => {
    const dto: UpdatePetDto = { name: 'Max' };
    const pet = { id: 1, name: 'Max' };
    service.update.mockResolvedValue(pet);
    await expect(controller.update(1, dto)).resolves.toEqual(pet);
  });

  it('should delete a pet', async () => {
    service.remove.mockResolvedValue(undefined);
    await expect(controller.remove(1)).resolves.toBeUndefined();
  });
});
