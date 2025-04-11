import type { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'

export default class ProfilesController {
    public async show({ view, auth, response }: HttpContext) {
        const user = await auth.user
        console.log('Utilisateur :', user)

        if (!user) {
            return response.status(404).send('User not found')
        }

        const tweets = await Tweet.query()
        .where('user_id', user.id)
        .preload('user')
        .preload('retweetFrom', (query) => {
            query.preload('user').preload('medias')
        })
        .withCount('retweets')
        .preload('medias')
        .preload('likes', (likesQuery) => {
            likesQuery.where('user_id', auth.user!.id)
        })
        .preload('comments', (query) => query.preload('user'))
        .preload('allLikes')
        .orderBy('createdAt', 'desc')
        .then(tweets => tweets.map(tweet => ({
            ...tweet.toJSON(),
            isLikedByUser: tweet.likes.length > 0,
            likeCount: tweet.allLikes.length,
            commentCount: tweet.comments?.length ?? 0,
            retweetCount: tweet.$extras.retweets_count,
            createdAt : user.createdAt
                ? user.createdAt.toFormat('dd LLL yyyy')
                : 'Date inconnue',
        })))

        // count all tweets for the user
        const tweetCount = await Tweet.query()
        .where('user_id', user.id)
        .count('* as count')
        .then((result) => result[0].$extras.count)

        return view.render('pages/profil', { user, tweets, tweetCount })
    }
}