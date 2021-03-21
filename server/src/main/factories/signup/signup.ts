import { DbAddUser } from '../../../data/usecases/add-user/db-add-user'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
import { UserPostgreSQLRepository } from '../../../infra/database/postgresql/user-repository/user'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): SignUpController => {
    
    const SALT = 12
    
    const encrypter = new BcryptAdapter(SALT)
    const userRepo = new UserPostgreSQLRepository()
    
    const addUser = new DbAddUser(encrypter, userRepo)
    const signUpValidation = makeSignUpValidation()
    
    const signUpController = new SignUpController(addUser, signUpValidation)
    
    return signUpController
}
