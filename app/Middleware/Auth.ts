/*import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt  from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class Auth {
  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const header = request.header('Authorization')
    const token = header?.replace("Bearer ", "")

    if (!token) {
      return response.unauthorized({ error: 'Token missing' })
    }

    try {
      const payload = jwt.verify(token, Env.get('APP_KEY'))
      console.log(payload)
    } catch (error) {
      return response.unauthorized({ error: 'Invalid token' })
    }

    console.log('middleware Excuted')
    await next()
    
  }
}*/
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class Auth {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const header = request.header('Authorization')
    const token = header?.replace('Bearer ', '')

    if (!token) {
      return response.unauthorized({
        error: 'Token missing',
      })
    }

    try {
      const payload = jwt.verify(token, Env.get('APP_KEY'))

      // Store payload for next middleware/controller
      ;(request as any).user = payload

      console.log(payload)
    } catch (error) {
      return response.unauthorized({
        error: 'Invalid token',
      })
    }

    console.log('Auth middleware executed')

    await next()
  }
}
