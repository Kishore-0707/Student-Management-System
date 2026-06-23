import { DateTime } from 'luxon'
import StudentFactory from 'App/Models/Student'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(StudentFactory, ({ faker }) => {
  
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    city: faker.location.city(),
    gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
    phone: faker.string.numeric(10),
    dob: DateTime.fromJSDate(
      faker.date.birthdate({
        min: 18,
        max: 22,
        mode: 'age',
      }),
    ),
    departmentId: faker.helpers.arrayElement([1,2,3]),
  }


}).build()
