import type { HttpContext } from '@adonisjs/core/http'
import Follow from '#models/follow'
import User from '#models/user'

export default class FollowsController {
    public async toggle({ auth, request }: HttpContext) {
        try {   
            const targetUserId = request.input('user_id')
            const user = auth.user!
        
            const existingFollow = await Follow.query()
                .where('follower_id', user.id)
                .andWhere('following_id', targetUserId)
                .first()
        
            if (existingFollow) {
                await existingFollow.delete()
                const targetUser = await User.findOrFail(targetUserId)
                targetUser.isFollowedByAuthUser = false
                await targetUser.save()
                return { followed: false }
            } else {
                await Follow.create({ followerId: user.id, followingId: targetUserId })
                const targetUser = await User.findOrFail(targetUserId)
                targetUser.isFollowedByAuthUser = true
                await targetUser.save()
                return { followed: true }
            }
        } catch (error) {
            console.error('Error toggling follow:', error)
            return { error: 'An error occurred while toggling follow.' }
            
        }
    }
}