import { DateTime } from 'luxon'

 
export default class AgeService {
  public static calculateAge(dob: DateTime): number {
    const today = DateTime.now()

    let age = today.year - dob.year

    if (
      today.month < dob.month ||
      (today.month === dob.month && today.day < dob.day)
    ) {
      age--
    }
    //console.log(dob.year)

    return age
  }
}