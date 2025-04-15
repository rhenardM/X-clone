import type { HttpContext } from '@adonisjs/core/http'
// import type { NextFn } from '@adonisjs/core/types/http'
export default class GlobalViewData {
  public async handle({ auth, view }: HttpContext, next: () => Promise<void>) {
    const authUser = auth && auth.user ? auth.user : null
    view.share({
      authUser: authUser, // Use the declared variable instead of auth.user
    })
    await next()
  }
}