import { HttpResponse, HttpRequest, Controller, AddUser } from './signup.protocols'
import { badRequest, serverError, serverSuccess } from '../../helpers/http'
import { Validation } from '../../helpers/validators/validation'

export class SignUpController implements Controller {
    private readonly addUser: AddUser
    private readonly validation: Validation

    constructor (addUser: AddUser, validation: Validation) {
        this.addUser = addUser
        this.validation = validation
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {

        try {
            
            const error = this.validation.validate(httpRequest.body)
            
            if (error) return badRequest(error)

            const { email, password, birth_date, name, username } = httpRequest.body

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
