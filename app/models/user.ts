import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import Tweet from '#models/tweet'
import Comment from '#models/comment'
import Follow from '#models/follow'
import Retweet from '#models/retweet'

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

  // This is the foreign key for the relation to the Comment model 
  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>// Relation to Comment model

  // This is the foreign key for the relation to the follow model
  @hasMany(() => Follow)
  declare followers: HasMany<typeof Follow> // Relation to Follow model

  // This is the foreign key for the relation to the follow model
  @hasMany(() => Follow)
  declare following: HasMany<typeof Follow> // Relation to Follow model

  // This is the foreign key for the relation to the retweet model
  @hasMany(() => Retweet)
  declare retweets: HasMany<typeof Retweet> // Relation to Retweet model

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  
}