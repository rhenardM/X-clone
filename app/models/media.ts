import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Tweet from '#models/tweet'

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tweetId: number

  @column()
  declare url: string

  @column()
  declare type: string

  @belongsTo(() => Tweet)
  declare tweets: BelongsTo<typeof Tweet>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}