import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StudentValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    first_name: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(50),
    ]),

    last_name: schema.string({}, [
      rules.minLength(1),
      rules.maxLength(50),
    ]),

    gender: schema.enum(['Male', 'Female', 'Other'] as const),

    phone: schema.string({}, [
      rules.mobile(),
    ]),

    dob: schema.date(),

    city: schema.string({}, [
      rules.minLength(2),
      rules.maxLength(50),
    ]),

    depart_id: schema.number([
      rules.exists({
        table: 'departments',
        column: 'department_id',
      }),
    ]),
  })

  public messages: CustomMessages = {
    'first_name.required': 'First name is required',
    'first_name.minLength': 'First name must be at least 3 characters',

    'last_name.required': 'Last name is required',

    'gender.required': 'Gender is required',

    'phone.required': 'Phone number is required',
    'phone.mobile': 'Enter a valid mobile number',

    'dob.required': 'Date of birth is required',

    'city.required': 'City is required',

    'depart_id.required': 'Department is required',
    'depart_id.exists': 'Department does not exist',
  }
  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  //public schema = schema.create({})

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
}