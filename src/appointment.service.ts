import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async create(appointmentData: Partial<Appointment>): Promise<Appointment> {
    const { vetId, date, time } = appointmentData;

    // Check for double booking
    const existingAppointment = await this.appointmentRepository.findOne({
      where: { vetId, date, time },
    });

    if (existingAppointment) {
      throw new BadRequestException('Vet is already booked for this time slot.');
    }

    const appointment = this.appointmentRepository.create(appointmentData);
    return this.appointmentRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async cancel(id: number): Promise<void> {
    await this.appointmentRepository.delete(id);
  }

  async reschedule(id: number, newDate: string, newTime: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });

    if (!appointment) {
      throw new BadRequestException('Appointment not found.');
    }

    // Update the appointment
    appointment.date = newDate;
    appointment.time = newTime;

    return this.appointmentRepository.save(appointment);
  }
}