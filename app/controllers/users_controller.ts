import type { HttpContext } from '@adonisjs/core/http'
import { RegisterUserValidator } from '#validators/register_user';
import User from '#models/user';

export default class UsersController {

    // public async loginPage({ view }: HttpContext) {
    //     return view.render('pages/login')
    // }
    // public async login({ request, response, auth, session }: HttpContext) {
    //     try {
    //         const { email, password } = request.only(['email', 'password'])
    //         const user = await User.verifyCredentials(email, password)
    //         await auth.use('web').login(user)
    //         session.flash('success', 'Login successful')
    //         return response.redirect().toRoute('home')
    //     } catch (error) {
    //         session.flash('errors', error.messages)
    //         return response.redirect('back')
    //     }
    // }
    public async registerPage({ view }: HttpContext) {
        return view.render('pages/register')
    }
    
    public async register({ request, response, auth, session }: HttpContext) {
        try {
            const data = await request.validateUsing(RegisterUserValidator)
            const user = await User.create(data)
            await auth.use('web').login(user)
            session.flash('success', 'User registered successfully')
            return response.redirect().toRoute('home')
        } catch (error) {
            session.flash('errors', error.messages)
            return response.redirect('back')
        }
    }
}