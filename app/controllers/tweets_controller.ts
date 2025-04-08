import type { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'
import Media from '#models/media'
// import Like from '#models/like'
import app from '@adonisjs/core/services/app'


export default class TweetsController {

    /**
     * Show tweets on the homepage
     */
    public async index({ view, auth }: HttpContext) {
        try {
            const user = auth.user!
            const tweets = await Tweet.query()
            .preload('user')
            .preload('medias')
            .preload('likes', (likesQuery) => {
                likesQuery.where('user_id', auth.user!.id)
            })
            .preload('comments', (query) => query.preload('user')) // Preload the user for each comment
            .preload('allLikes') // <- the relation to get all likes
            .orderBy('createdAt', 'desc')
            
            user.username = `@${user.username}` // Add @ to the username
            
        const formattedTweets = tweets.map(tweet => ({
            ...tweet.toJSON(),
            isLikedByUser: tweet.likes.length > 0,
            likeCount: tweet.allLikes.length, // <- count all likes
            commentCount: tweet.comments?.length ?? 0,
            createdAt: tweet.createdAt 
            ? tweet.createdAt.toFormat('dd LLL yyyy HH : mm ') 
            : 'Date inconnue',
            // user: { ...user, username: `@${user.username}` } // Add @ to the username
        }))
        
            return view.render('pages/home', { tweets: formattedTweets, user: user })
        
        } catch (error) {
            console.error('Error fetching tweets:', error)
            return view.render('pages/home', { tweets: [] })
        }
    }

    /**
     * Creation of the tweet
     */
    public async CreateTweet ({ request, auth, response }: HttpContext) {
        
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
                userId: user.id, // Associate the tweet with the logged in user
            })

            console.log('Tweet created:', tweet)

            // Backing up media files
            const mediaFiles = request.files('media');

            console.log('Fichiers médias reçus:', mediaFiles)

            if (mediaFiles) {
                for (const mediaFile of mediaFiles) {
                if (!mediaFile.isValid) {
                    console.error('Fichier invalide:', mediaFile.errors)
                    continue
                }

                // Définission du chemin d'upload
                const fileName = `${new Date().getTime()}-${mediaFile.clientName}`
                
                const uploadDir =  app.publicPath('uploads') // Path to the public/uploads folder

                await mediaFile.move(uploadDir, {
                    name: fileName,
                    overwrite: true,
                })

                //Associate the media with the tweet
                await Media.create({
                    tweetId: tweet.id,
                    url: `/uploads/${fileName}`, // URL publique du média
                    type: mediaFile.type, // Type type (image, video, etc.)
                })
                console.log('Type du fichier média:', mediaFile.type)
                console.log('Fichier média enregistré:', fileName)
            }
        }

            return response.redirect().toRoute('home')
            
        } catch (error) {
            console.error('Error creating tweet:', error)
            return response.status(500).json({ error: 'Internal Server Error' })
        }

    }

}