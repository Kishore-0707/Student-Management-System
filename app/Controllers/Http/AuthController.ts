import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import UserValidator from 'App/Validators/UserValidator'
import LoginValidator from 'App/Validators/LoginValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class AuthController {
    // Register a new user
    public async register({ request, response }: HttpContextContract) {

        const data = await request.validate(UserValidator)

        data.password = await Hash.make(data.password)

        const user = await User.create(data)

        return response.created({
            message: 'User registered successfully',
            user
        })
    }

    // Login
    public async login({ request, response }: HttpContextContract) {

        const { email, password } = await request.validate(LoginValidator)

        const user = await User.findBy('email', email)

        if (!user) {
            return response.unauthorized({
                message: 'Invalid Email'
            })
        }

        const verified = await Hash.verify(user.password, password)

        if (!verified) {
            return response.unauthorized({
                message: 'Invalid Password'
            })
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            Env.get('APP_KEY'),
            {
                expiresIn: '1h',
            }
        )

        return {
            message: 'Login Successful',
            token,
        }

    }

    public async index({ response }: HttpContextContract) {

        const users = await User.all()
        return response.ok(users)
    }

    public async show({ request, response }: HttpContextContract) {

        const payload = request.qs()

        const users = await User.query()
            .where('id', payload.id)
            .first()


        if (!users) {
            return response.notFound({
                message: 'User not found'
            })
        }

        return (users)
    }

    public async update({ request, response }: HttpContextContract) {

        const payload = request.qs()

        const user = await User.findOrFail(payload.id)
        const result = await request.validate(UpdateUserValidator)

        if (result.password) {
            result.password = await Hash.make(result.password)
        }

        user.merge(result)

        await user.save()

        return response.ok({
            message: 'User updated successfully',
            data: user
        })

    }

    public async destroy({ request, params, response }: HttpContextContract) {

        const payload = request.qs()
        const user = await User.findOrFail(payload.id)

        if (!user.id) {
            return response.notFound({
                message: 'User not found'
            })
        }

        await user.delete()

        return response.ok({
            message: 'User deleted successfully'
        })
    }

}
