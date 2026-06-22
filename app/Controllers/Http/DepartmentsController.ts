import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department'

const departmentFields = ['hodName', 'departmentName', 'departmentId']

export default class DepartmentsController {

    public async index({ response }: HttpContextContract) {

        const departments = await Department.all()
        return response.ok(departments)
    }

    public async show({ params, response }: HttpContextContract) {
        try {

            const department = await Department.findOrFail(params.departmentId)
            return response.ok(department)
        } catch (error) {
            return response.notFound({ message: 'Department not found' })
        }
    }


    public async store({ request, response }: HttpContextContract) {

        // Student.create() automatically handles inserting and returning the object
        const newDepartment = await Department.create(request.only(departmentFields))

        return response.created(newDepartment)
    }

}
