import { AddUser } from '../../../../domain/usecases'
import { DbAddUser } from '../../../../data/usecases/add-user/db-add-user'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { UserPostgreSQLRepository } from '../../../../infra/database/postgresql/user-repository/user'

export const makeDbAddUser = (): AddUser => {
    
    const SALT = 12
    
    const bcryptAdapter = new BcryptAdapter(SALT)
    const userRepo = new UserPostgreSQLRepository()
    
    return new DbAddUser(bcryptAdapter, userRepo, userRepo)

}
