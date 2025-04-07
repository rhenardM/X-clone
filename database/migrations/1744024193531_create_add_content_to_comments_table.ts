import { BaseSchema } from '@adonisjs/lucid/schema'


export default class AddContentToComments extends BaseSchema {
  public async up () {
    this.schema.alterTable('comments', (table) => {
      table.string('content') // Add the content column to the comment table
    })
  }

  public async down () {
    this.schema.alterTable('comments', (table) => {
      table.dropColumn('content') // Remove the content column from the comment table
    })
  }
}