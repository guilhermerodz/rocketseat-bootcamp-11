import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

type Request = Pick<Appointment, 'provider' | 'date'>

class CreateAppointmentService {
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const foundAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    )

    if (foundAppointmentInSameDate) {
      throw new Error('This appointment is already booked')
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
