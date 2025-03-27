import type { HttpContext } from '@adonisjs/core/http'
// Interface pour User
    interface User {
        name: string
        pseudo: string
        avatar?: string
        isVerified: boolean // ajout du paramètre isVerified
    }

// Interface pour Tweet
    interface Tweet {
        id: number
        user: User
        content: string
        likes: number
        comments: number
        retweets: number
        createdAt: string
        media?: string[]
    }
// sample of tweets data
    const tweets: Tweet[] = [
    {
        id: 1,
        user: {
        name: 'Rhenard Munongo',
        pseudo: '@Rhenard_Mun ',
        avatar: '/resources/img/user3.jpg',
        isVerified: true,
        },
        content: "Voici une belle photo que j'ai prise aujourd'hui ! #photography #nature",
        likes: 10,
        comments: 5,
        retweets: 2,
        createdAt: '2025-03-07T10:30:00Z',
        media: ['/resources/img/user1.jpg'],
    },
    {
        id: 2,
        user: {
        name: 'Ynaya Munongo',
        pseudo: '@naya_M ',
        avatar: '/resources/img/user3.jpg',
        isVerified: false,
        },
        content: 'Une vidéo incroyable à partager ! 🎥',
        likes: 20,
        comments: 8,
        retweets: 5,
        createdAt: '2h ago',
        media: [
        '/resources/videos/word.mp4',
        ],
    },
    {
        id: 3,
        user: {
        name: 'Twitter',
        pseudo: '@twitter',
        avatar: 'resources/img/user1.jpg',
        isVerified: true,
        },
        content: 'Une vidéo incroyable à partager ! 🎥',
        likes: 15,
        comments: 3,
        retweets: 1,
        createdAt: '2025-03-07T12:00:00Z',
        media: [
        '/resources/videos/Documenter son API PHP avec OpenAPI (Swagger).mp4',
        ],
    },
]

export default class HomePagesController {
    public async index({ view }: HttpContext) {
        return view.render('pages/home', { tweets })
    }
}

