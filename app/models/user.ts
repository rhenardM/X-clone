import { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import Tweet from '#models/tweet'
import Comment from '#models/comment'
import Follow from '#models/follow'
import Retweet from '#models/retweet'
import Notification from '#models/notification'
import Like from '#models/like'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose (BaseModel, AuthFinder) {
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
  declare banner: string | null

  @column()
  declare roleId: number 

  //
  @column()
  declare isFollowedByAuthUser: boolean

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
  
  // This is the foreign key for the relation to the Like model
  @hasMany(() => Follow, {
    foreignKey: 'followingId', // Clé étrangère pour les followers (dans la table follows, c'est "following_id")
    localKey: 'id', // Correspond à "id" dans la table users
  })
  declare followers: HasMany<typeof Follow>
  

  @hasMany(() => Follow, {
    foreignKey: 'followerId', // Clé étrangère pour les following (dans la table follows, c'est "follower_id")
    localKey: 'id', // Correspond à "id" dans la table users
  })
  declare following: HasMany<typeof Follow>

  // This is the foreign key for the relation to the retweet model
  @hasMany(() => Retweet)
  declare retweets: HasMany<typeof Retweet> // Relation to Retweet model

  //
  @hasMany(() => Like)
  declare likes: HasMany<typeof Like>
  
  // 
  @hasMany(() => Notification)
  declare notifications: HasMany<typeof Notification>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  
}