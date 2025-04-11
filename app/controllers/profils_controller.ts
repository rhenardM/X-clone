import type { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'
import app from '@adonisjs/core/services/app'



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

    public async updateProfile({ request, auth, response, session }: HttpContext) {
        const user = auth.user!
    
        const firstname = request.input('firstname')
        const bio = request.input('bio')
        const location = request.input('location')
        const username = request.input('username')

        console.log('Bio :', bio)
        console.log('Firstname :', firstname)
    
        const profile_picture = request.file('profile_picture')
        const banner = request.file('banner')
        console.log('Username :', username)
        console.log('Location :', location)
        console.log('Profile picture :', profile_picture)
        console.log('Banner :', banner)
    
        user.firstname = firstname
        user.bio = bio
        user.location = location
        user.username = username
    
        if (profile_picture) {
            const avatarName = `${new Date().getTime()}-${profile_picture.clientName}`
            await profile_picture.move(app.publicPath('uploads'), { name: avatarName })
            user.profile_picture = `/uploads/${avatarName}`, 
            
            console.log('Profile picture moved to:', user.profile_picture)
        }

        if (banner) {
            const bannerName = `${new Date().getTime()}-${banner.clientName}`
            await banner.move(app.publicPath('uploads'), { name: bannerName })
            user.banner = `/uploads/${bannerName}`
            console.log('Banner moved to:', user.banner)
        }

    
        await user.save()
        console.log('User updated:', user)
        // Redirect to the profile page with a success message
        session.put('success', 'Profile updated successfully')
        return response.redirect().back()
    }
}