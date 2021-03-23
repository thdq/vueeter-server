import { Controller } from '../../../presentation/protocols'
import { LoginController } from '../../../presentation/controllers/login/login'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { makeLoginValidation } from './login-validation'
import { UserPostgreSQLRepository } from '../../../infra/database/postgresql/user-repository/user'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import env from '../../../main/config/env'

export const makeLoginController = (): Controller => {
    
    const SALT = 12
    const SECRET = env.JWTSECRET
    
    const userRepository = new UserPostgreSQLRepository()
    
    const bcryptAdapter = new BcryptAdapter(SALT)
    
    const jwtdapter = new JwtAdapter(SECRET)
    
    const dbAuth = new DbAuthentication(userRepository, bcryptAdapter, jwtdapter, userRepository)
    
    const loginController = new LoginController(dbAuth, makeLoginValidation())
    
    return loginController
}
