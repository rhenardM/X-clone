import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Comment from '#models/comment'
import Retweet from '#models/retweet'
import Media from '#models/media'

export default class Tweet extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User> // Relation to User model

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment> // Relation to Comment model

  // This is the foreign key for the relation to the retweet model
  @hasMany(() => Retweet)
  declare retweets: HasMany<typeof Retweet> // Relation to Retweet model

  // This is the foreign key for the relation to the Media model
  @hasMany(() => Media)
  declare medias: HasMany<typeof Media>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}