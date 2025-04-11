import { BaseSchema } from '@adonisjs/lucid/schema'


export default class AddIsFollowedByAuthUserToUsers extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.boolean('is_followed_by_auth_user').defaultTo(false)
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('is_followed_by_auth_user')
    })
  }
}
