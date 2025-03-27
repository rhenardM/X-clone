import type { HttpContext } from '@adonisjs/core/http'
// Interface pour User
    interface User {
        name: string
        pseudo: string
        avatar?: string
        isVerified: boolean 
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
        media: ['https://www.wecasa.fr/mag/wp-content/uploads/2022/09/gideon-hezekiah-8YkE6veYNUw-unsplash-1-1024x683.jpg.webp'],
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
       // Changer ici pour un iframe  
        media: [  
            '<iframe width="560" height="315" src="https://www.youtube.com/embed/i51olb4HBgU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',  
    ],  
    },
    {
        id: 3,
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
        media: ['https://yop.l-frii.com/wp-content/uploads/2023/02/Beyonce.jpeg'],
    },
]

export default class HomePagesController {
    public async index({ view }: HttpContext) {
        return view.render('pages/home', { tweets })
    }
}

