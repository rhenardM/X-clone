import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'


export default class LikesController {
    public async like({ auth, params, response }: HttpContext) {
      const user = auth.user
      const tweetId = params.id
    
      if (!user) {
        return response.unauthorized('Unauthorized')
      }
    
      const existingLike = await user
        .related('likes')
        .query()
        .where('tweet_id', tweetId)
        .first()
    
      let isLiked = false
    
      if (existingLike) {
        await existingLike.delete()
      } else {
        await user.related('likes').create({ tweetId })
        isLiked = true
      }
    
      const likeCount = await db
        .from('likes')
        .where('tweet_id', tweetId)
        .count('* as total')
    
      const totalLikes = likeCount[0].total
    
      return response.json({
        likeCount: totalLikes,
        isLiked,
      })
    }
}