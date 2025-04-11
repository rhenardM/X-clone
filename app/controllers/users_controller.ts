import type { HttpContext } from '@adonisjs/core/http'
import { RegisterUserValidator } from '#validators/register_user';
import User from '#models/user';
import Follow from '#models/follow';

export default class UsersController {

    public async loginPage({ view }: HttpContext) {
        return view.render('pages/login')
    }

    public async login({ request, response, auth, session }: HttpContext) {
        try {
            console.log('Donnees receved to form', request.all()) // Displaying the received data
    
            const { email, password } = request.only(['email', 'password'])  // Extracting email and password fields
    
            const user = await User.verifyCredentials(email, password)  // verification credentials
            console.log('user found :', user)
    
            // Login usser 
            await auth.use('web').login(user)

            //success message
            session.flash('success', 'Login successful')
            console.log('Login successful')
    
            return response.redirect().toRoute('home')
        } catch (error) {
            console.error('An error occurred while connecting :', error)

            // error handling
            if (error.messages) {
                session.flash('errors', error.messages)
            } else {
                console.log('Unexpected error')
                session.flash('errors', { general: 'An unexpected error has occurred.' })
            }
    
            return response.redirect('back')
        }
    }

    
    // Register page
    public async registerPage({ view }: HttpContext) {
        return view.render('pages/register')
    }
    
    public async register({ request, response, auth, session }: HttpContext) {
        try {
            console.log('Données reçues:', request.all())  // Displaying the received data
    
            const data = await request.validateUsing(RegisterUserValidator)
            console.log('Données validées:', data)  // verification after validation
    
            const user = await User.create(data)
            await auth.use('web').login(user)
    
            console.log('User registered successfully:', user)
            session.flash('success', 'User registered successfully')
    
            return response.redirect().toRoute('home')
        } catch (error) {
            console.error('Une erreur s\'est produite:', error)
    
            if (error.messages) {
                session.flash('errors', error.messages)
            } else {
                session.flash('errors', { general: 'Une erreur inattendue s\'est produite.' })
            }
    
            return response.redirect('back')
        }
    }

    public async logout({ auth, response, session }: HttpContext) {
        await auth.use('web').logout()
        session.flash('success', 'Logout successful')
        return response.redirect().toRoute('login.page')
    }

    // Suggestion: You can create a method to handle the flash messages in a more generic way

    public async suggestions({ auth }: HttpContext) {
        const currentUser = auth.user!
        
        const followingIds = await currentUser
        .related('following')
        .query()
        .select('following_id')
        
        const followingIdList = followingIds.map(f => f.followingId)
        
        const suggestions = await User.query()
        .whereNotIn('id', [currentUser.id, ...followingIdList])
        .limit(3) // Limit the number of suggestions to 3

        for (const user of suggestions) {
            const follow = await Follow.query()
              .where('followerId', auth.user!.id)
              .andWhere('followingId', user.id)
              .first()
              
            user.isFollowedByAuthUser = !!follow
          }
        
        return suggestions
    }
    
}