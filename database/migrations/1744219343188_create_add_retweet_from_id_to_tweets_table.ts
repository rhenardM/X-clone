import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('tweets', (table) => {
      table
        .integer('retweet_from_id')
        .unsigned()
        .references('id')
        .inTable('tweets')
        .onDelete('CASCADE')
        .nullable()
    })
  }

  public async down() {
    this.schema.alterTable('tweets', (table) => {
      table.dropColumn('retweet_from_id')
    })
  }
}