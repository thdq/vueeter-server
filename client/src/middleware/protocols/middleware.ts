import { Context } from '@nuxt/types'

export interface MiddlewareProtocol {
    handle(context: Context): boolean
}
