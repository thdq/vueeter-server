import { loadUserByToken } from '../../domain/usecases/load-user-by-username'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden } from '../helpers/http'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
    private readonly loadUserByToken: loadUserByToken
    
    constructor (loadUserByToken: loadUserByToken) {
        this.loadUserByToken = loadUserByToken
    }
    
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        
        const accessToken = httpRequest.headers?.['x-access-token']
        
        if (accessToken) await this.loadUserByToken.load(accessToken)
        
        return forbidden(new AccessDeniedError())
    }
}
