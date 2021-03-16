import { DbAddUser } from '@/data/usecases/add-user/db-add-user'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { UserPostgreSQLRepository } from '@/infra/database/postgresql/user-repository/user'
import { SignUpController } from '@/presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'

export const makeSignUpController = (): SignUpController => {
    
    const SALT = 12
    
    const emailValidator = new EmailValidatorAdapter()
    const encrypter = new BcryptAdapter(SALT)
    const userRepo = new UserPostgreSQLRepository()
    
    const addUser = new DbAddUser(encrypter, userRepo)
    
    const signUpController = new SignUpController(emailValidator, addUser)
    
    return signUpController
}
