import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { UserPostgreSQLRepository } from '../../../../infra/database/postgresql/user-repository/user'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import env from '../../../config/env'
import { Authentication } from '../../../../domain/usecases'

export const makeDbAuthentication = (): Authentication => {
    
    const SALT = 12
    const SECRET = env.JWTSECRET
    
    const userRepository = new UserPostgreSQLRepository()
    
    const bcryptAdapter = new BcryptAdapter(SALT)
    
    const jwtdapter = new JwtAdapter(SECRET)
    
    return new DbAuthentication(userRepository, bcryptAdapter, jwtdapter, userRepository)
    
}
