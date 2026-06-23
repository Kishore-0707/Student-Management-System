import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import StudentFactory from 'Database/factories/StudentFactory'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await StudentFactory.createMany(10);
  }
}
