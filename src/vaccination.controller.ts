import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VaccinationService } from './vaccination.service';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { Vaccination } from './vaccination.entity';

@Controller('vaccinations')
@UsePipes(new ValidationPipe({ transform: true }))
export class VaccinationController {
  constructor(private readonly vaccinationService: VaccinationService) {}

  @Post()
  async create(@Body() createVaccinationDto: CreateVaccinationDto): Promise<Vaccination> {
    return this.vaccinationService.create(createVaccinationDto);
  }

  @Get()
  async findAll(): Promise<Vaccination[]> {
    return this.vaccinationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Vaccination> {
    return this.vaccinationService.findOne(id);
  }

  @Get('pet/:petId')
  async findByPetId(@Param('petId', ParseIntPipe) petId: number): Promise<Vaccination[]> {
    return this.vaccinationService.findByPetId(petId);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVaccinationDto: UpdateVaccinationDto,
  ): Promise<Vaccination> {
    return this.vaccinationService.update(id, updateVaccinationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.vaccinationService.remove(id);
  }
} 