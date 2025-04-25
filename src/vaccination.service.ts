import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vaccination } from './vaccination.entity';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';

@Injectable()
export class VaccinationService {
  constructor(
    @InjectRepository(Vaccination)
    private vaccinationRepository: Repository<Vaccination>,
  ) {}

  async create(createVaccinationDto: CreateVaccinationDto): Promise<Vaccination> {
    const { dateAdministered, nextDueDate } = createVaccinationDto;

    // Validate dates
    if (nextDueDate < dateAdministered) {
      throw new BadRequestException('Next due date must be after date administered');
    }

    const vaccination = this.vaccinationRepository.create(createVaccinationDto);
    return this.vaccinationRepository.save(vaccination);
  }

  async findAll(): Promise<Vaccination[]> {
    return this.vaccinationRepository.find({
      relations: ['pet', 'vet'],
    });
  }

  async findOne(id: number): Promise<Vaccination> {
    const vaccination = await this.vaccinationRepository.findOne({
      where: { id },
      relations: ['pet', 'vet'],
    });

    if (!vaccination) {
      throw new NotFoundException(`Vaccination with ID ${id} not found`);
    }

    return vaccination;
  }

  async findByPetId(petId: number): Promise<Vaccination[]> {
    return this.vaccinationRepository.find({
      where: { petId },
      relations: ['vet'],
      order: {
        dateAdministered: 'DESC',
      },
    });
  }

  async update(id: number, updateVaccinationDto: UpdateVaccinationDto): Promise<Vaccination> {
    const vaccination = await this.findOne(id);

    // Validate dates if both are provided
    if (updateVaccinationDto.dateAdministered && updateVaccinationDto.nextDueDate) {
      if (updateVaccinationDto.nextDueDate < updateVaccinationDto.dateAdministered) {
        throw new BadRequestException('Next due date must be after date administered');
      }
    }

    Object.assign(vaccination, updateVaccinationDto);
    return this.vaccinationRepository.save(vaccination);
  }

  async remove(id: number): Promise<void> {
    const result = await this.vaccinationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Vaccination with ID ${id} not found`);
    }
  }
} 