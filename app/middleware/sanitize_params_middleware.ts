import type { HttpContext } from '@adonisjs/core/http'
// import type { NextFn } from '@adonisjs/core/types/http'
export default class SanitizeParamsMiddleware {
  public async handle({ params }: HttpContext, next: () => Promise<void>) {
    // Nettoyage spécifique pour les usernames
    if (params.username) {
      params.username = params.username
        .toString()
        .replace(/^@/, '') // Supprime le @ initial
        .replace(/[^\w\-'.]/g, '') // Garde lettres, chiffres, -, ', .
        .trim()
    }

    await next()
  }
}