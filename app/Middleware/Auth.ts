import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Auth {
  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const token = request.header('Role')

    if (token !== 'staff') {
      return response.unauthorized({
        message: 'Access denied'
      })
    }
    console.log('middleware Excuted')
    await next()
    
  }
}
