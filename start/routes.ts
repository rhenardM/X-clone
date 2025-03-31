/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const HomeController = () => import('#controllers/home_controller')
const ProfilesController = () => import('#controllers/profils_controller')
const UsersController = () => import('#controllers/users_controller')

router.get('/', [HomeController, 'index']).as('home')
router.get('/profil', [ProfilesController, 'show']).as('profil')

// register route
router.get('/register', [UsersController, 'registerPage']).as('register.page')
router.post('/register', [UsersController, 'register']).as('register.submit')