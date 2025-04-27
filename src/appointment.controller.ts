import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(@Body() appointmentData: Partial<Appointment>): Promise<Appointment> {
    return this.appointmentService.create(appointmentData);
  }

  @Get()
  async findAll(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Put(':id')
  async reschedule(
    @Param('id') id: number,
    @Body() { date, time }: { date: string; time: string },
  ): Promise<Appointment> {
    return this.appointmentService.reschedule(id, date, time);
  }

  @Delete(':id')
  async cancel(@Param('id') id: number): Promise<void> {
    return this.appointmentService.cancel(id);
  }
}