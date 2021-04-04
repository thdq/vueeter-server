import { Context } from '@nuxt/types'
import { MiddlewareProtocol } from './protocols/middleware'

class AuthMiddleware implements MiddlewareProtocol {
    private readonly context: Context

    constructor (context: Context) {
        this.context = context
    }

    handle (): boolean {

        const authenticated = this.isAuthenticated()

        const currentRoute = this.getCurrentRoute()

        const routesAllowed = this.getAnonymousRoutesAllowed()

        if (!authenticated && !routesAllowed.includes(currentRoute)) {
            this.redirectTo('/login')
            return false
        }

        return true

    }

    isAuthenticated (): boolean {

        const { store } = this.context

        return store?.getters?.isAuthenticated || false
    }

    getCurrentRoute (): string {

        const { app } = this.context

        return app?.router?.currentRoute.path || '/'
    }

    getAnonymousRoutesAllowed (): string[] {
        return ['/login', '/', '/signup']
    }

    redirectTo (path: string): string {

        const { redirect } = this.context

        redirect(path)

        return path
    }

}

export default (context: Context) => new AuthMiddleware(context).handle()
export { AuthMiddleware }
