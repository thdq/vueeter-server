import { HttpResponse, HttpRequest, Controller, AddUser, EmailValidator } from './signup.protocols'
import { badRequest, serverError, serverSuccess } from '../../helpers/http'
import { MissingParamsError, InvalidParamsError } from '../../errors'
import { Validation } from '../../helpers/validators/validation'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addUser: AddUser
    private readonly validation: Validation

    constructor (emailValidator: EmailValidator, addUser: AddUser, validation: Validation) {
        this.emailValidator = emailValidator
        this.addUser = addUser
        this.validation = validation
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {

        try {
            
            this.validation.validate(httpRequest.body)

            const { email, password, passwordConfirm, birth_date, name, username } = httpRequest.body

            const requiredFields = ['name', 'email', 'password', 'passwordConfirm', 'birth_date', 'username']

            for (const field of requiredFields) {

                if (!httpRequest.body[field]) return badRequest(new MissingParamsError(field))

            }
            
            if (username.length > 50) return badRequest(new InvalidParamsError("username"))

            if (password !== passwordConfirm) return badRequest(new InvalidParamsError("passwordConfirm"))

            const isValid = this.emailValidator.isValid(email)

            if (!isValid) return badRequest(new InvalidParamsError('email'))

            const user = await this.addUser.add({
                username,
                birth_date,
                email,
                name,
                password
            })

            return serverSuccess(user)

        } catch (error) {

            return serverError()

        }

    }

}
