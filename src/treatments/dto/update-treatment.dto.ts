// src/treatments/dto/update-treatment.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateTreatmentDto } from './create-treatment.dto';

export class UpdateTreatmentDto extends PartialType(CreateTreatmentDto) {}
