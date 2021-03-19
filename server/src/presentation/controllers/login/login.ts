import { Authentication } from '../../../domain/usecases/authentication'
import { MissingParamsError } from '../../../presentation/errors'
import { badRequest, serverError } from '../../../presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
    private readonly authentication: Authentication
    
    constructor (authentication: Authentication) {
        this.authentication = authentication
    }
    
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        
        try {
            
            const { username, password } = httpRequest.body
            
            const requiredFields = ['username', 'password']

            for (const field of requiredFields) {
    
                if (!httpRequest.body[field]) return badRequest(new MissingParamsError(field))
    
            }
            
            await this.authentication.auth(username, password)
            
            return new Promise(resolve => resolve(null))            
            
        } catch (error) {
            return serverError()
        }

    }
}
