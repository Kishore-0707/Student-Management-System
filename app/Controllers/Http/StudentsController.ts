import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import StudentValidator from 'App/Validators/StudentValidator'
import AgeService from 'App/Services/AgeService'


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

            //console.log(student.dob)
            const age = await AgeService.calculateAge(student.dob)

            return {student  , age}
        } catch (error) {
            console.log(error)   
            return response.status(500).json(error)
        }
    }

    // 3. INSERT a new record using Model method
    public async store({ request, response }: HttpContextContract) {

        const payload = await request.validate(StudentValidator)

        const student = await Student.create(payload)

        return response.created(student)

    }

    public async update({ params, request, response }: HttpContextContract) {
        const student = await Student.findOrFail(params.student_id)

        //const data = request.only(['first_name', 'last_name', 'phone', 'city', 'depart_id'])
        const payload = await request.validate(StudentValidator)

        student.merge(payload)

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