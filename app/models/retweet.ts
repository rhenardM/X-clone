import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Tweet from '#models/tweet'

export default class Retweet extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare tweetId: number

  // This is the foreign key for the relation to the User model
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User> // Relation to User model

  // This is the foreign key for the relation to the Tweet model
  @belongsTo(() => Tweet)
  declare tweet: BelongsTo<typeof Tweet> // Relation to Tweet model

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}