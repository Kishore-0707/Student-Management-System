import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";
import jwt from "jsonwebtoken";
import Env from "@ioc:Adonis/Core/Env";
import UserValidator from "App/Validators/UserValidator";
import LoginValidator from "App/Validators/LoginValidator";
import UpdateUserValidator from "App/Validators/UpdateUserValidator";
import UserNotFoundException from "App/Exceptions/UserNotFoundException";

export default class AuthController {
  // Register a new user
  public async register({ request }: HttpContextContract) {
    try {
      const payload = await request.validate(UserValidator);

      payload.password = await Hash.make(payload.password);

      return await User.create(payload);
    } catch (error) {
      return error;
    }
  }

  // Login
  public async login({ request, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator);

    const user = await User.findBy("email", email);

    if (!user) {
      return response.unauthorized({
        message: "Invalid Email",
      });
    }

    const verified = await Hash.verify(user.password, password);

    if (!verified) {
      return response.unauthorized({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      Env.get("APP_KEY"),
      {
        expiresIn: "1h",
      },
    );

    return {
      message: "Login Successful",
      token,
    };
  }

  public async index() {
    try {
      return await User.all();
    } catch (error) {
      return error;
    }
  }

  public async show({ request }: HttpContextContract) {
    try {
      const payload = request.qs();

      const users = await User.query().where("id", payload.id).first();

      if (!users) {
        throw new UserNotFoundException();
      }

      return users;
    } catch (error) {
      return error;
    }
  }

  public async update({ request }: HttpContextContract) {

    try{
      const payload = await request.validate(UpdateUserValidator);
      const user = await User.findOrFail(payload.id);

      if (payload.password) {
        payload.password = await Hash.make(payload.password);
      }

      user.merge(payload);

    await user.save();
    return user;


    }catch(error){
      return error;
    }
  }

  public async destroy({ request }: HttpContextContract) {

    try{
      const payload = await request.validate(UpdateUserValidator);

      const user = await User.findOrFail(payload.id);
      if (!user.id) {
      throw new UserNotFoundException();
    }
    return user.delete(); 
    }
    catch(error){
      return error;
    }
    
  }
}
