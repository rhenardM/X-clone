import type { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'
import User from '#models/user'

export default class HomePagesController {
    public async index({ view }: HttpContext) {
        return view.render('pages/home')
    }

        public async vues({ view, auth }: HttpContext) {
            try {
                const user = auth.user!
    
                const tweets = await Tweet.query()
                .where('user_id', user.id)
                .preload('user', (userQuery) => {
                    userQuery.select(['id', 'firstname', 'lastname', 'username', 'profile_picture'])
                })
                    .preload('retweetFrom', (retweetQuery) => {
                        retweetQuery
                        .preload('user', (userQuery) => {
                        userQuery.select(['id', 'firstname', 'lastname', 'username', 'profile_picture'])
                    })
                    .preload('medias')
                })
    
                .withCount('retweets') // <== important
    
                .preload('medias')
    
                .preload('likes', (likesQuery) => {
                    likesQuery.where('user_id', auth.user!.id)
                })
                .preload('comments', (query) => query.preload('user')) // Preload the user for each comment
                .preload('allLikes') // <- the relation to get all likes
                .orderBy('createdAt', 'desc')

                console.log(tweets.map(tweet => ({
                    user: tweet.user?.profile_picture, 
                    retweetFromUser: tweet.retweetFrom?.user?.profile_picture,
                })))
                
                console.log(tweets.map(tweet => ({
                    user: tweet.user,
                    retweetFromUser: tweet.retweetFrom?.user,
                    medias: tweet.medias,
                })));
    
                user.username = `@${user.username}` // Add @ to the username
                
                const formattedTweets = tweets.map(tweet => ({
                    ...tweet.toJSON(),
                    isLikedByUser: tweet.likes.length > 0,
                    likeCount: tweet.allLikes.length, // <- count all likes
                    commentCount: tweet.comments?.length ?? 0,
                    retweetCount: tweet.$extras.retweets_count, // <- use the count from the query
                    createdAt: tweet.createdAt 
                    ? tweet.createdAt.toFormat('dd LLL yyyy HH : mm ') 
                    : 'Date inconnue',
                    profilePicture: tweet.user?.profile_picture || '/resources/img/me.jpeg', // Définit une image par défaut
                    retweetProfilePicture: tweet.retweetFrom?.user?.profile_picture || '/resources/img/me.jpeg',
                }))
    
                // Get suggestions for users to follow
                const suggestions = await User.query()
                .whereNot('id', auth.user!.id)
                .limit(3)
            
                return view.render('pages/home', { tweets: formattedTweets, user: user, suggestions })
            
            } catch (error) {
                console.error('Error fetching tweets:', error)
            }
    }
}

