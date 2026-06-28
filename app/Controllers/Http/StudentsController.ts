import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Student from "App/Models/Student";
import StudentValidator from "App/Validators/StudentValidator";
import AgeService from "App/Services/AgeService";
import StudentIdValidator from "App/Validators/StudentIdValidator";
import StudentInsertValidator from "App/Validators/StudentInsertValidator";
import GetMethodValidator from "App/Validators/GetMethodValidator";

export default class StudentsControllerss {
  public async index({ request }: HttpContextContract) {
    try {
      const payload = await request.validate(GetMethodValidator);

      return Student.query()
        .orderBy("student_id", "asc")
        .paginate(payload.page, payload.limit);
    } catch (error) {
      return error;
    }
  }

  public async show({ request }: HttpContextContract) {
    try {
      const payload = await request.validate(StudentIdValidator);

      const student = await Student.query()
        .where("student_id", payload.student_id)
        .preload("department")
        .firstOrFail();

      //console.log(student.dob)
      const age = AgeService.calculateAge(student.dob);

      return { student, age };
    } catch (error) {
      return error;
    }
  }

  // 3. INSERT a new record using Model method
  public async store({ request }: HttpContextContract) {
    try {
      const payload = await request.validate(StudentInsertValidator);

      return await Student.create(payload);
    } catch (error) {
      return error;
    }
  }

  public async update({ request }: HttpContextContract) {
    try {
      const { student_id } = await request.validate(StudentIdValidator);

      const student = await Student.findOrFail(student_id);
      const result = await request.validate(StudentValidator);

      student.merge(result);

      await student.save();
      return student;
    } catch (error) {
      return error;
    }
  }

  public async destroy({ request }: HttpContextContract) {
    try {
      const payload = await request.validate(StudentIdValidator);

      const student = await Student.findOrFail(payload.student_id);

      return student.delete();
    } catch (error) {
      return error;
    }
  }
}
