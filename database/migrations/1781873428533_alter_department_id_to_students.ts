import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('depart_id')
        .unsigned()
        .references('department_id')
        .inTable('departments')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('depart_id')
    })
  }
}
