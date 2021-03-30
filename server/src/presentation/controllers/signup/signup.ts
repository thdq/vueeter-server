import { HttpResponse, HttpRequest, Controller, AddUser, Authentication } from './signup.protocols'
import { badRequest, serverError, serverSuccess, forbidden } from '../../helpers/http'
import { Validation } from '../../protocols/validation'
import { DatabaseErrorCode } from '../../../presentation/helpers/database/error-enum'
import { InUseParamsError } from '../../../presentation/errors'

export class SignUpController implements Controller {
    private readonly addUser: AddUser
    private readonly validation: Validation
    private readonly authentication: Authentication

    constructor (addUser: AddUser, validation: Validation, authentication: Authentication) {
        this.addUser = addUser
        this.validation = validation
        this.authentication = authentication
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {

        try {
            
            const error = this.validation.validate(httpRequest.body)
            
            if (error) return badRequest(error)

            const { email, password, birth_date, name, username } = httpRequest.body

            await this.addUser.add({
                username,
                birth_date,
                email,
                name,
                password
            })
            
            const accessToken = await this.authentication.auth({
                username,
                password
            })

            return serverSuccess({ accessToken })

        } catch (error) {
            
            console.error(error)
            
            if (error.code === DatabaseErrorCode.UniqueConstraintFailed) return forbidden(new InUseParamsError(error))

            return serverError()

        }

    }

}
