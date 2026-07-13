import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Department from "App/Models/Department";
import DepartmentInsertValidator from "App/Validators/DepartmentInsertValidator";
import DepartmentIdValidator from "App/Validators/DepartmentIdValidator";
import DepartmentValidatorValidator from "App/Validators/DepartmentValidatorValidator";

export default class DepartmentsController {
  public async index() {
    try {
      return Department.all();
    } catch (error) {
      return error;
    }
  }

  public async show({ request, response }: HttpContextContract) {
    // const department   = await Department.query()
    //                 .where('departmentId', params.student_id)
    //                 .preload('students')
    //                 .firstOrFail()
    try {
      const payload = await request.validate(DepartmentIdValidator);

      const result = await Department.query()
        .where("department_id", payload.department_id)
        .first();
      if (!result) {
        return response.notFound({
          message: "department not found",
        });
      }

      return result;
    } catch (error) {
      return error;
    }
  }

  public async store({ request }: HttpContextContract) {
    // Student.create() automatically handles inserting and returning the object
    try {
      const payload = await request.validate(DepartmentInsertValidator);

      return await Department.create(payload);
    } catch (error) {
      return error;
    }
  }

  public async update({ request, response }: HttpContextContract) {
    // try {

    //     const payload = await request.validate({
    //         schema: new DepartmentValidatorValidator({} as any).schema,
    //         data: request.qs(),
    //     })
    //     const department = await Department.findOrFail(payload.departmentId)

    //     department.merge(department)

    //     await department.save()

    //     return response.ok({ message: 'Department table updated successfully', data: department })

    // }
    // catch (error) {
    //     console.log(error)
    // }
    try {
      const payload = await request.validate(DepartmentValidatorValidator);
      const department = await Department.findOrFail(payload.departmentId);

      department.merge(payload);

      await department.save();
      return response.ok({
        message: "Department updated successfully",
        data: department,
      });
    } catch (error) {
      return error;
    }
  }

  public async destroy({ request }: HttpContextContract) {
    try {
      const payload = await request.validate(DepartmentIdValidator);

      const department = await Department.findOrFail(payload.department_id);

      return department.delete();
    } catch (error) {
      return error;
    }
  }
}
