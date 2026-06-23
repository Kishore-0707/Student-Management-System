import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
    // Register a new user
    public async register({ request, response }: HttpContextContract) {

        const data = request.only([
            'email',
            'password',
            'role'
        ])

        // Check if email already exists
        const existingUser = await User.findBy('email', data.email)

        if (existingUser) {
            return response.badRequest({
                message: 'Email already exists'
            })
        }

        // Hash the password
        data.password = await Hash.make(data.password)

        // Save user
        const user = await User.create(data)

        return response.created({
            message: 'User registered successfully',
            user
        })
    }

    // Login
    public async login({ request, response }: HttpContextContract) {

        const { email, password } = request.only([
            'email',
            'password'
        ])

        // Find user
        const user = await User.findBy('email', email)

        if (!user) {
            return response.unauthorized({
                message: 'Invalid Email'
            })
        }

        // Verify password
        const verified = await Hash.verify(
            user.password,
            password
        )

        if (!verified) {
            return response.unauthorized({
                message: 'Invalid Password'
            })
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            Env.get('APP_KEY'),
            {
                expiresIn: '1h'
            }
        )

        return {
            message: 'Login Successful',
            token
        }
    }

}
