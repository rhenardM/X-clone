import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('firstname', 50).notNullable()
      table.string('lastname', 50).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('username', 50).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('profile_picture', 255).nullable()
      table.string('bio', 160).nullable()
      table.string('location', 100).nullable()
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}