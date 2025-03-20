/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ProfilesController = () => import('#controllers/profils_controller')

router.on('/').render('pages/home')
router.get('/profil', [ProfilesController, 'show']).as('profil')
