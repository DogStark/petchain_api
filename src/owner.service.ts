import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './owner.entity';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,

    private readonly petService: PetService,
  ) {}

  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const { petIds, ...ownerData } = createOwnerDto;

    const Owner = await this.ownerRepository.findOne({
      where: { fullName: ownerData.fullName },
    });
    // Check if owner already exists

    if (Owner) {
      throw new BadRequestException('Owner already exists');
    }

    // Create new owner
    const owner = this.ownerRepository.create(ownerData);

    // Link pets if provided
    if (petIds && petIds.length > 0) {
      const pets = await this.petRepository.find({
        where: { id: In(petIds) },
      });
      owner.pets = pets;
    } else {
      owner.pets = [];
    }

    return await this.ownerRepository.save(owner);
  }

  async findAll(): Promise<Owner[]> {
    return this.ownerRepository.find();
  }

  async findOne(id: number): Promise<Owner> {
    const owner = await this.ownerRepository.findOne({
      where: { id },
      relations: ['pets'],
    });

    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }

    return owner;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto): Promise<Owner> {
    const { petIds, ...ownerData } = updateOwnerDto;

    // Find owner
    const owner = await this.findOne(id);

    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }

    // Update owner data
    Object.assign(owner, ownerData);

    // Update pet relationships if provided
    if (petIds) {
      const pets = await this.petRepository.find({
        where: { id: In(petIds) },
      });
      owner.pets = pets;
    }

    return this.ownerRepository.save(owner);
  }

  async remove(id: number): Promise<void> {
    const owner = await this.findOne(id);

    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }
    await this.ownerRepository.softDelete(owner);
  }

  async addPetToOwner(ownerId: number, petId: number): Promise<Owner> {
    const owner = await this.findOne(ownerId);
    const pet = await this.petRepository.findOne({ where: { id: petId } });

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${petId} not found`);
    }

    pet.owner = owner;
    await this.petRepository.save(pet);

    return this.findOne(ownerId);
  }
}
