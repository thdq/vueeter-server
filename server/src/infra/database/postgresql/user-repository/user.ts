import { AddUserRepository } from '@/data/protocols/add-user-repository'
import { UserModel } from '@/domain/models/user'
import { AddUserModel } from '@/domain/usecases/add-user'
import { prisma, id } from '../helpers'

export class UserPostgreSQLRepository implements AddUserRepository {
    
    async add (user: AddUserModel): Promise<UserModel> {
        
        const userResponse = await prisma.user.create({
            data: Object.assign({}, user, { id: id })
        })
        
        return new Promise(resolve => resolve(userResponse))
    }
    
}
