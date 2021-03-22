import { Hasher, UserModel, AddUserModel, AddUser, AddUserRepository } from "./db-add-user.protocol"

export class DbAddUser implements AddUser {
    private readonly hasher: Hasher
    private readonly addUserRepository: AddUserRepository

    constructor (hasher: Hasher, addUserRepository: AddUserRepository) {
        this.hasher = hasher
        this.addUserRepository = addUserRepository
    }
    
    async add (user: AddUserModel): Promise<UserModel> {
        
        const hashedPass = await this.hasher.hash(user.password)
        
        const userAdded = await this.addUserRepository.add(Object.assign({}, user, { password: hashedPass }))
        
        return new Promise(resolve => resolve(userAdded))
    }
}
