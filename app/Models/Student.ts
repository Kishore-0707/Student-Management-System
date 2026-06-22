import { DateTime } from 'luxon'
import {
  BaseModel, column, belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import Department from './Department'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public student_id!: number

  @column()
  public first_name!: string

  @column()
  public last_name!: string

  @column()
  public gender!: string

  @column()
  public phone!: bigint

  @column()
  public dob!: Date

  @column()
  public city!: string

  @column({
    columnName: 'depart_id'
  })
  public departmentId!: number

  @belongsTo(() => Department, {
    foreignKey: 'departmentId',
    localKey: 'departmentId',
  })
  public department!: BelongsTo<typeof Department>

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime
}
