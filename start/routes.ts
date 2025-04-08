/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Importing the controllers
// const HomeController = () => import('#controllers/home_controller')
const ProfilesController = () => import('#controllers/profils_controller')
const UsersController = () => import('#controllers/users_controller')
const TweetsController = () => import('#controllers/tweets_controller')
const LikesController = () => import('#controllers/likes_controller')
const CommentsController = () => import('#controllers/comments_controller')

router.get('/', [TweetsController, 'index']).as('home').use(middleware.auth())
router.get('/profil', [ProfilesController, 'show']).as('profil')

// register route
router.get('/register', [UsersController, 'registerPage']).as('register.page')
router.post('/register', [UsersController, 'register']).as('register.submit')

// login route 
router.get('/login', [UsersController, 'loginPage']).as('login.page')
router.post('/login', [UsersController, 'login']).as('login.submit')    

// logout route
router.get('/logout', [UsersController, 'logout']).as('logout')

// tweet route
router.post('/tweet', [TweetsController, 'CreateTweet']).as('tweet.submit').use(middleware.auth())

// like route
router.post('/tweets/:id/like', [LikesController, 'like']).as('like.index').use(middleware.auth()).as('tweets.like')

// comment route
//Route.post('/tweets/:id/comment', 'CommentsController.store').middleware('auth')
router.get('/comments/:id', [CommentsController, 'getComments']).as('comment.getComments').use(middleware.auth()).as('tweets.comments')
router.post('/tweets/:id/comment', [CommentsController, 'createComments']).as('comment.createComments').use(middleware.auth()).as('tweets.comment')