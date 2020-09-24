import { startOfHour } from 'date-fns'

import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

type Request = Pick<Appointment, 'provider' | 'date'>

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date)

    const foundAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    )

    if (foundAppointmentInSameDate) {
      throw new Error('This appointment is already booked')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
