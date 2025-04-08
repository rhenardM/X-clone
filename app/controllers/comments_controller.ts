import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Comment from '#models/comment'
export default class CommentsController {

    public async createComments({ request, response, auth, params }: HttpContext) {
        const user = auth.user
        if (!user) {
            return response.unauthorized({messages: 'Unauthorized'})
        }
        
        const tweetId = params.id
        const content = request.input('content')
    
        
        if (!content || content.trim() === '') {
            return response.badRequest({ message: 'Le contenu du commentaire est requis.' })
        }

        console.log('Content:', content)

        const comment = await Comment.create({
            userId: user.id,
            tweetId,
            content,
        })

        const commentCount = await db
        .from('comments')
        .where('tweet_id', tweetId)
        .count('* as total')
        console.log('Comment count:', commentCount[0].total)

        return response.json({
            message: 'Commentaire créé avec succès',
            commentCount: commentCount[0].total,
            comment,
        })
    }

    public async getComments({ params }: HttpContext) {
        const tweetId = params.id

            const comments = await Comment
            .query()
            .where('tweet_id', tweetId)
            .preload('user')
            .orderBy('created_at', 'asc')
        
        return comments
    }


}