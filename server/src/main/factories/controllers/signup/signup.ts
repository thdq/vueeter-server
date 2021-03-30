
import { SignUpController } from '../../../../presentation/controllers/signup/signup'
import { makeDbAddUser } from '../../usecases/add-user/db-add-user'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): SignUpController => {
    
    const signUpValidation = makeSignUpValidation()
    
    const signUpController = new SignUpController(makeDbAddUser(), signUpValidation, makeDbAuthentication())
    
    return signUpController
}
