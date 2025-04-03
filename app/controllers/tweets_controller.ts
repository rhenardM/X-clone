import type { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'
// import User from '#models/user'

export default class TweetsController {

    /**
     * Show tweets on the homepage
     */
    public async index({ view }: HttpContext) {
    try {
        const tweets = await Tweet.query()
        .preload('user')
        .preload('medias')
        .orderBy('createdAt', 'desc')
        
        console.log('Tweet recuperer',tweets)

        const formattedTweets = tweets.map(tweet => ({
            ...tweet.toJSON(),
            createdAt: tweet.createdAt ? tweet.createdAt.toFormat('dd LLL yyyy HH : mm ') : 'Date inconnue'
        }))

        // return view.render('home', { tweets })
        return view.render('pages/home', { tweets : formattedTweets })

    } catch (error) {
        console.error('Error fetching tweets:', error)
        return view.render('page/home', { tweets: [] })
    }
    }

    /**
     * Creation of the tweet
     */
    public async store ({ request, auth, response }: HttpContext) {
        
        try {

            console.log('Données reçues :', request.all())

            const { content } = request.only(['content'])
            
            console.log('Received tweet content:', content)

            const user = auth.user

            if (!user) {
                return response.status(401).send({ error: 'Unauthorized' })
            }

            console.log('Utilisateur authentifié:', auth.user)

            const tweet = await Tweet.create({
                content: content,
                userId: user.id, // Associez le tweet à l'utilisateur connecté
            })

            console.log('Tweet created:', tweet)

            return response.redirect().toRoute('home')
            
        } catch (error) {
            console.error('Error creating tweet:', error)
            return response.status(500).json({ error: 'Internal Server Error' })
        }

    }

}