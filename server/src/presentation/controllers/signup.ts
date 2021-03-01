import { HttpResponse, HttpRequest, Controller } from '../protocols'
import { badRequest, serverError } from '../helpers/http'
import { MissingParamsError, InvalidParamsError } from '../errors'
import { EmailValidator } from '../protocols/validator'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator

    constructor (emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    handle (httpRequest: HttpRequest): HttpResponse {

        try {

            const requiredFields = ['name', 'email', 'password', 'passwordConfirm', 'birth_date', 'username']

            for (const field of requiredFields) {

                if (!httpRequest.body[field]) return badRequest(new MissingParamsError(field))

            }

            const isValid = this.emailValidator.isValid(httpRequest.body.email)

            if (!isValid) return badRequest(new InvalidParamsError('email'))

        } catch (error) {

            return serverError()

        }

    }

}
