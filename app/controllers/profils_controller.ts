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

        const followersCount = await user.related('followers').query().count('* as count');
        const followingCount = await user.related('following').query().count('* as count');
        
        // Fournir une valeur par défaut si le tableau est vide
        const followersCountValue = followersCount[0]?.$extras?.count || 0;
        const followingCountValue = followingCount[0]?.$extras?.count || 0;

        return view.render('pages/profil', { 
            user, 
            tweets, 
            tweetCount, 
            followersCount: followersCountValue,
            followingCount: followingCountValue,
        })
    }

    public async updateProfile({ request, auth, response, session }: HttpContext) {
        try {
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
        
            // Validate the files profile_picture
            if (profile_picture) {
                const avatarName = `${new Date().getTime()}-${profile_picture.clientName}`
                await profile_picture.move(app.publicPath('uploads'), { name: avatarName })
                user.profile_picture = `/uploads/${avatarName}`, 
                
                console.log('Profile picture moved to:', user.profile_picture)
            }
    
            // Validate the files banner
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
            setTimeout(() => {
            session.forget('success')
            }, 2000)
    
            return response.redirect().back()
        } catch (error) {
            console.error('Error updating profile:', error)
    
            session.put('error', 'Error updating profile')
            setTimeout(() => {
                session.forget('error')
            }, 2000)
    
            return response.redirect().back()
        }
    }
}