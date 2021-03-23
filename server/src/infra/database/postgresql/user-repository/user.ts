import { AddUserRepository } from '@/data/protocols/repository/user/add-user-repository'
import { LoadUserByUsernameRepository } from '@/data/protocols/repository/user/load-user-by-username'
import { UpdateAccessTokenRepository } from '@/data/protocols/repository/user/update-access-token'
import { UserModel } from '@/domain/models/user'
import { AddUserModel } from '@/domain/usecases/add-user'
import { prisma, id } from '../helpers'

export class UserPostgreSQLRepository implements AddUserRepository, LoadUserByUsernameRepository, UpdateAccessTokenRepository {
    
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
    
    async updateAccessToken (id: string, token: string): Promise<void> {
        
        await prisma.user.update({
            data: {
                accessToken: token
            },
            where: {
                id: id
            }
        })
        
    }
    
}
