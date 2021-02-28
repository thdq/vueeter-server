import { HttpResponse, HttpRequest } from '../protocols/http'
import { badRequest } from '../helpers/http'
import { MissingParamsError } from '../errors/missing-params-error'
import { Controller } from '../protocols/controller'

export class SignUpController implements Controller {

    handle (httpRequest: HttpRequest): HttpResponse {

        const requiredFields = ['name', 'email', 'password', 'passwordConfirm', 'birth_date', 'username']

        for (const field of requiredFields) {

            if (!httpRequest.body[field]) return badRequest(new MissingParamsError(field))

        }

    }

}
