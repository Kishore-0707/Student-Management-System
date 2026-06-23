import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Auth {
  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const token = request.header('Authorization') /*?.replace("Bearer ","")*/

    if (token !== `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJraXNob3JlQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MjE5NjQ5MSwiZXhwIjoxNzgyMjAwMDkxfQ.IWpRQZjjlqhDU2eBtAOFOs2mS880YHARACW7ktORsuc`) {
      return response.unauthorized({
        message: 'Access denied'
      })
    }
    console.log('middleware Excuted')
    await next()
    
  }
}
