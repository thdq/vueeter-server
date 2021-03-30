import { Controller } from '../../../../presentation/protocols'
import { LoginController } from '../../../../presentation/controllers/login/login'
import { makeLoginValidation } from './login-validation'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication'

export const makeLoginController = (): Controller => {
    
    const loginController = new LoginController(makeDbAuthentication(), makeLoginValidation())
    
    return loginController
}
