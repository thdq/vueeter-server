import { MissingParamsError } from '../../../presentation/errors'
import { badRequest } from '../../../presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {

        const requiredFields = ['username', 'password']

        for (const field of requiredFields) {

            if (!httpRequest.body[field]) return badRequest(new MissingParamsError(field))

        }
        
        return new Promise(resolve => resolve(null))
        
    }
}
