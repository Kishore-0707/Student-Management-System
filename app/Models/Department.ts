import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'


export default class Department extends BaseModel {
  @column({ isPrimary: true,
            columnName: 'department_id'

   })
  public departmentId!: number

  @column()
  public hodName! : String

  @column()
  public departmentName! : String

  @column.dateTime({ autoCreate: true })
  public createdAt! : DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt! : DateTime

 @belongsTo(() => Department, {
  foreignKey: 'departmentId',
  localKey: 'departmentId'
})
public department!: BelongsTo<typeof Department>

}

