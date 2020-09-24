import { isEqual } from 'date-fns'

import Appointment from '../models/Appointment'

type CreateAppointmentDTO = Omit<Appointment, 'id'>

class AppointmentsRepository {
  private appointments: Appointment[]

  constructor() {
    this.appointments = []
  }

  public all(): Appointment[] {
    return this.appointments
  }

  public findByDate(date: Date): Appointment | null {
    const foundAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    )

    return foundAppointment || null
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date })

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentsRepository
