import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department'
import DepartmentInsertValidator from 'App/Validators/DepartmentInsertValidator'
import DepartmentIdValidator from 'App/Validators/DepartmentIdValidator'
import DepartmentValidatorValidator from 'App/Validators/DepartmentValidatorValidator'

export default class DepartmentsController {

    public async index({ response }: HttpContextContract) {

        const departments = await Department.all()
        return response.ok(departments)
    }

    public async show({ request, response }: HttpContextContract) {
        // const department   = await Department.query()
        //                 .where('departmentId', params.student_id)
        //                 .preload('students')
        //                 .firstOrFail()

        const payload = await request.validate({
            schema: new DepartmentIdValidator({} as any).schema,
            data: request.qs(),
        })

        const department = await Department.query()
            .where('department_id', payload.department_id)
            .first()


        if (!department) {
            return response.notFound({
                message: 'department not found'
            })
        }

        return response.ok(department)
    }


    public async store({ request, response }: HttpContextContract) {

        // Student.create() automatically handles inserting and returning the object

        const payload = await request.validate(DepartmentInsertValidator)
        const department = await Department.create(payload)

        return response.created(department)
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
        const payload = request.qs()
        const result = await request.validate(DepartmentValidatorValidator)
        const student = await Department.findOrFail(payload.departmentId)

        student.merge(result)

        await student.save()
        return response.ok({ message: 'Department updated successfully', data: student })
    }

}
