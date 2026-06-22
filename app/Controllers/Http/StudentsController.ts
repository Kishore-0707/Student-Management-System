import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'


export default class StudentsControllerss {

    public async index({ response }: HttpContextContract) {

        const students = await Student.all()
        return response.ok(students)
    }

    public async show({ params, response }: HttpContextContract) {

        console.log(params)
        try {

            const student = await Student.query()
                .where('student_id', params.student_id)
                .preload('department')
                .firstOrFail()

            return student
        } catch (error) {
            console.log(error)   // <-- Print the real error
            return response.status(500).json(error)
        }
    }

    // 3. INSERT a new record using Model method
    public async store({ request, response }: HttpContextContract) {
        const data = request.only([
            'first_name',
            'last_name',
            'gender',
            'phone',
            'dob',
            'city',
            'depart_id'
        ])

        // Student.create() automatically handles inserting and returning the object
        const newStudent = await Student.create(data)

        return response.created(newStudent)
    }

    public async update({ params, request, response }: HttpContextContract) {
        const student = await Student.findOrFail(params.student_id)

        const data = request.only(['first_name', 'last_name', 'phone', 'city', 'depart_id'])

        student.merge(data)

        await student.save()
        return response.ok({ message: 'Student updated successfully', data: student })
    }

    public async destroy({ params, response }: HttpContextContract) {
        const student = await Student.findOrFail(params.student_id)

        student.delete()

        await student.save()
        return response.ok({ message: 'Student Deleted successfully', data: student })
    }
}