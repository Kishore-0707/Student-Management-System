import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DepartmentValidatorValidator {
  constructor(protected ctx: HttpContextContract) {}

 
  public schema = schema.create({

    departmentId :schema.number(),

    hodName : schema.string.optional({},[
      rules.minLength(2),
      rules.maxLength(20),
    ]),

    departmentName : schema.string.optional({},[
      rules.minLength(2),
      rules.maxLength(20),
    ])
    
  })

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


  public messages: CustomMessages = {
    'departmentId': 'Department ID is Required',
    
    'hodName.string': 'HOD email must be a string',
    'hodName.minLength': 'Department name must be at least 2 characters',
    'hodName.maxLength': 'Department name must not exceed 20 characters',

    
    'departmentName.string': 'Department name must be a string',
    'departmentName.minLength': 'Department name must be at least 2 characters',
    'departmentName.maxLength': 'Department name must not exceed 20 characters',

  }
}
