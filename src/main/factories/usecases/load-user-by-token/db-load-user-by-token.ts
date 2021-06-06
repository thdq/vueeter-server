import { UserPostgreSQLRepository } from '../../../../infra/database/postgresql/user-repository/user'
import { loadUserByToken } from '@/domain/usecases/load-user-by-token'
import { DbLoadUserByToken } from '../../../../data/usecases/load-user-by-token/db-load-user-by-token'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import env from '../../../config/env'

export const makeDbLoadUserByToken = (): loadUserByToken => {
    
    const userRepo = new UserPostgreSQLRepository()
    
    const jwtAdapter = new JwtAdapter(env.JWTSECRET)
    
    return new DbLoadUserByToken(jwtAdapter, userRepo)

}
