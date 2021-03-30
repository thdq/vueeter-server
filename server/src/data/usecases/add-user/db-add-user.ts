import { Hasher, UserModel, AddUserModel, AddUser, AddUserRepository, LoadUserByUsernameRepository } from "./db-add-user.protocol"

export class DbAddUser implements AddUser {
    private readonly hasher: Hasher
    private readonly addUserRepository: AddUserRepository
    private readonly loadUserByUsernameRepository: LoadUserByUsernameRepository

    constructor (hasher: Hasher, addUserRepository: AddUserRepository, loadUserByUsernameRepository: LoadUserByUsernameRepository) {
        this.hasher = hasher
        this.addUserRepository = addUserRepository
        this.loadUserByUsernameRepository = loadUserByUsernameRepository
    }
    
    async add (user: AddUserModel): Promise<UserModel> {
        
        await this.loadUserByUsernameRepository.loadByUsername(user.username)
        
        const hashedPass = await this.hasher.hash(user.password)
        
        const userAdded = await this.addUserRepository.add(Object.assign({}, user, { password: hashedPass }))
        
        return new Promise(resolve => resolve(userAdded))
    }
}
