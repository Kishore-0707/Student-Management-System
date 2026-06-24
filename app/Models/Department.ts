import { DateTime } from 'luxon'
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
// import Student from './Student'

export default class Department extends BaseModel {
  @column({ isPrimary: true,
            columnName: 'department_id'

   })
  public departmentId!: number

  @column()
  public hodName! : String

  @column()
  public departmentName! : String

//   @column()
//   public 
  
//  @hasMany(() => Student, {
//     foreignKey: 'departmentId',
//   })
//   public students: HasMany<typeof Student>

  @column.dateTime({ autoCreate: true })
  public createdAt! : DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt! : DateTime


}

