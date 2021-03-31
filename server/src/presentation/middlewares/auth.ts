import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden } from '../helpers/http'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        
        const error = forbidden(new AccessDeniedError())
        
        return new Promise(resolve => resolve(error))
    }
}
