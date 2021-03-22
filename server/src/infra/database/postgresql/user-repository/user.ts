import { AddUserRepository } from '@/data/protocols/repository/add-user-repository'
import { LoadUserByUsernameRepository } from '@/data/protocols/repository/load-user-by-username'
import { UserModel } from '@/domain/models/user'
import { AddUserModel } from '@/domain/usecases/add-user'
import { prisma, id } from '../helpers'

export class UserPostgreSQLRepository implements AddUserRepository, LoadUserByUsernameRepository {
    
    async add (user: AddUserModel): Promise<UserModel> {
        
        const userResponse = await prisma.user.create({
            data: Object.assign({}, user, { id: id })
        })
        
        return new Promise(resolve => resolve(userResponse))
    }
    
    async loadByUsername (username: string): Promise<UserModel> {
        
        const userResponse = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        
        return userResponse
        
    }
    
}
