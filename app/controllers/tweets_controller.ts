import type { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'

export default class TweetsController {

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