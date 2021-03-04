import { HttpResponse, HttpRequest, Controller } from '../protocols'
import { badRequest, serverError } from '../helpers/http'
import { MissingParamsError, InvalidParamsError } from '../errors'
import { EmailValidator } from '../protocols/validator'
import { AddUser } from '@/domain/usecases/add-user'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addUser: AddUser

    constructor (emailValidator: EmailValidator, addUser: AddUser) {
        this.emailValidator = emailValidator
        this.addUser = addUser
    }

    handle (httpRequest: HttpRequest): HttpResponse {

        try {

            const { email, password, passwordConfirm, birth_date, name, username } = httpRequest.body

            const requiredFields = ['name', 'email', 'password', 'passwordConfirm', 'birth_date', 'username']

            for (const field of requiredFields) {

                if (!httpRequest.body[field]) return badRequest(new MissingParamsError(field))

            }

            if (password !== passwordConfirm) return badRequest(new InvalidParamsError("passwordConfirm"))

            const isValid = this.emailValidator.isValid(email)

            if (!isValid) return badRequest(new InvalidParamsError('email'))

            this.addUser.add({
                username,
                birth_date,
                email,
                name,
                password
            })

        } catch (error) {

            return serverError()

        }

    }

}
