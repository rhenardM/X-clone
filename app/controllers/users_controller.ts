import type { HttpContext } from '@adonisjs/core/http'
import { RegisterUserValidator } from '#validators/register_user';
import User from '#models/user';

export default class UsersController {

    public async registerPage({ view }: HttpContext) {
        return view.render('pages/register')
    }
    
    public async register({ request, response, auth, session }: HttpContext) {
        try {
            console.log('Données reçues:', request.all())  // Displaying the received data
    
            const data = await request.validateUsing(RegisterUserValidator)
            console.log('✅ Données validées:', data)  // verification after validation
    
            const user = await User.create(data)
            await auth.use('web').login(user)
    
            console.log('✅ User registered successfully:', user)
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
    
}