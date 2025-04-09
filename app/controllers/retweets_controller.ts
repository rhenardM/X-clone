import type { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'
export default class RetweetsController {
        public async retweetCreate({ request, auth, response }: HttpContext) {
            try {
                const user = auth.user!
                const originalTweetId = request.input('tweetId')
        
                const originalTweet = await Tweet.findOrFail(originalTweetId)
            
                // Check if the user has already retweeted this tweet
                const existingRetweet = await Tweet
                    .query()
                    .where('user_id', user.id)
                    .andWhere('retweet_from_id', originalTweet.id)
                    .first()
                if (existingRetweet) {
                    return response.badRequest('Déjà retweeté')
                }

                const retweet = await Tweet.create({
                    userId: user.id,
                    retweetFromId: originalTweet.id,
                    content: originalTweet.content, 
                })

                // Count total retweets
                const retweetCount = await Tweet.query().where('retweet_from_id', originalTweet.id).count('* as total')
                

                return response.json({
                    retweetCount: retweetCount[0].$extras.total,
                    retweet,
                })
                
            }
            catch (error) {
                console.error(error)
                return response.internalServerError()
            }
        }
}