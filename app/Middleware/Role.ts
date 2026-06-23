import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Role {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void> , roles: string[]) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    // const user = (request as any).user

    // if (!user) {
    //   return response.unauthorized({
    //     message: 'User not authenticated'
    //   })
    // }

    // // Check if user's role is allowed
    // if (!roles.includes(user.role)) {
    //   return response.forbidden({
    //     message: 'Access denied for this USERS'
    //   })
    // }
    // await next()

    const user = (request as any).user

    if (!user) {
      return response.unauthorized({
        message: 'User not authenticated',
      })
    }

    if (!roles.includes(user.role)) {
      return response.forbidden({
        message: 'Access denied (ROLES)'
      })
    }

    await next()
  }
}
