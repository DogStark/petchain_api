import { Test, TestingModule } from '@nestjs/testing';
import { PetService } from '../pet.service';
import { Repository } from 'typeorm';
import { Pet } from '../pet.entity';
import { Owner } from '../owner.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePetDto } from '../dto/create-pet.dto';
import { UpdatePetDto } from '../dto/update-pet.dto';

describe('PetService', () => {
  let service: PetService;
  let petRepo: jest.Mocked<Repository<Pet>>;
  let ownerRepo: jest.Mocked<Repository<Owner>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetService,
        {
          provide: getRepositoryToken(Pet),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Owner),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PetService>(PetService);
    petRepo = module.get(getRepositoryToken(Pet));
    ownerRepo = module.get(getRepositoryToken(Owner));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a pet with valid owner', async () => {
    const dto: CreatePetDto = {
      name: 'Fido',
      species: 'Dog',
      breed: 'Labrador',
      gender: 'Male',
      age: 2,
      microchipId: '123',
      ownerId: 1,
    };
    ownerRepo.findOne.mockResolvedValue({ id: 1 } as Owner);
    petRepo.create.mockReturnValue({ ...dto } as Pet);
    petRepo.save.mockResolvedValue({ ...dto, id: 1 } as Pet);
    const result = await service.create(dto);
    expect(result).toEqual({ ...dto, id: 1 });
  });

  it('should throw BadRequestException if owner not found', async () => {
    ownerRepo.findOne.mockResolvedValue(null);
    await expect(
      service.create({
        name: 'Fido',
        species: 'Dog',
        breed: 'Labrador',
        gender: 'Male',
        age: 2,
        microchipId: '123',
        ownerId: 2,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should find all pets', async () => {
    petRepo.find.mockResolvedValue([{ id: 1 } as Pet]);
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1 }]);
  });

  it('should find one pet', async () => {
    petRepo.findOne.mockResolvedValue({ id: 1 } as Pet);
    const result = await service.findOne(1);
    expect(result).toEqual({ id: 1 });
  });

  it('should throw NotFoundException if pet not found', async () => {
    petRepo.findOne.mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a pet with new owner', async () => {
    const pet = { id: 1, ownerId: 1 } as Pet;
    petRepo.findOne.mockResolvedValue(pet);
    ownerRepo.findOne.mockResolvedValue({ id: 2 } as Owner);
    petRepo.save.mockResolvedValue({ ...pet, ownerId: 2 } as Pet);
    const result = await service.update(1, { ownerId: 2 });
    expect(result).toEqual({ id: 1, ownerId: 2 });
  });

  it('should remove a pet', async () => {
    const pet = { id: 1 } as Pet;
    petRepo.findOne.mockResolvedValue(pet);
    petRepo.remove.mockResolvedValue(pet);
    await expect(service.remove(1)).resolves.toBeUndefined();
  });
});
