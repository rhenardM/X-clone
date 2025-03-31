import router from '@adonisjs/core/services/router';
const HomeController = () => import('#controllers/home_controller');
const ProfilesController = () => import('#controllers/profils_controller');
router.get('/', [HomeController, 'index']).as('home');
router.get('/profil', [ProfilesController, 'show']).as('profil');
//# sourceMappingURL=routes.js.map