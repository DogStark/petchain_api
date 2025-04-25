import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Owner } from './owner.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet) private readonly petRepository: Repository<Pet>,
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const owner = await this.ownerRepository.findOne({
      where: { id: createPetDto.ownerId },
    });
    if (!owner) {
      throw new BadRequestException('Owner not found');
    }
    const pet = this.petRepository.create({ ...createPetDto, owner });
    return this.petRepository.save(pet);
  }

  findAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  async findOne(id: number): Promise<Pet> {
    const pet = await this.petRepository.findOne({ where: { id } });
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return pet;
  }

  async update(id: number, updatePetDto: UpdatePetDto): Promise<Pet> {
    const pet = await this.findOne(id);
    if (updatePetDto.ownerId) {
      const owner = await this.ownerRepository.findOne({
        where: { id: updatePetDto.ownerId },
      });
      if (!owner) {
        throw new BadRequestException('Owner not found');
      }
      Object.assign(pet, updatePetDto, { owner });
    } else {
      Object.assign(pet, updatePetDto);
    }
    return this.petRepository.save(pet);
  }

  async remove(id: number): Promise<void> {
    const pet = await this.findOne(id);
    await this.petRepository.remove(pet);
  }

  async findByIdWithRelations(id: number) {
    return this.petRepository.findOne({
      where: { id },
      relations: ['owner', 'vaccines', 'treatments'],
    });
  }
  
}
