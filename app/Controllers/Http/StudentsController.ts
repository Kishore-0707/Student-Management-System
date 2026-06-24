import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import StudentValidator from 'App/Validators/StudentValidator'
import AgeService from 'App/Services/AgeService'
import StudentIdValidator from 'App/Validators/StudentIdValidator'
import StudentInsertValidator from 'App/Validators/StudentInsertValidator'

export default class StudentsControllerss {

    public async index({ response }: HttpContextContract) {

        const students = Student.all()
        return response.ok(students)
    }

    public async show({ request, response }: HttpContextContract) {

        const payload = await request.validate({
            schema: new StudentIdValidator({} as any).schema,
            data: request.qs(),
        })

        const student = await Student.query()
            .where('student_id', payload.student_id)
            .preload('department')
            .first()

        if (!student) {
            return response.notFound({
                message: 'Student not found'
            })
        }
        //console.log(student.dob)
        const age = AgeService.calculateAge(student.dob)

        return { student, age }
        
    }

    // 3. INSERT a new record using Model method
    public async store({ request, response }: HttpContextContract) {

        const payload = await request.validate(StudentInsertValidator)

        const student = await Student.create(payload)

        return response.created(student)

    }

    public async update({ request, response }: HttpContextContract) {

        const payload = request.qs()

        const student = await Student.findOrFail(payload.student_id)

        const result = await request.validate(StudentValidator)

        student.merge(result)

        await student.save()
        return response.ok({ message: 'Student updated successfully', data: student })
    }

    public async destroy({ request, response }: HttpContextContract) {

        const payload = await request.validate({
            schema: new StudentIdValidator({} as any).schema,
            data: request.qs(),
        })

        const student = await Student.findOrFail(payload.student_id)

        student.delete()

        await student.save()
        return response.ok({ message: 'Student Deleted successfully', data: student })
    }
}