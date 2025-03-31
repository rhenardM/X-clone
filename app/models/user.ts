import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import Tweet from '#models/tweet'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare email: string

  @column()
  declare username: string

  @column()
  declare password: string

  @column()
  declare bio: string | null

  @column()
  declare location: string | null

  @column()
  declare profile_picture: string | null

  @column()
  declare roleId: number 
  // This is the foreign key for the relation to the Role model
  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role> // Relation to Role model

  @column()
  declare tweetId: number
  // This is the foreign key for the relation to the Tweet model
  @hasMany(() => Tweet)
  declare tweet: HasMany<typeof Tweet> // Relation to Tweet model

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  
}