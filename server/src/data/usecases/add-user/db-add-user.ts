import { Encrypter, UserModel, AddUserModel, AddUser, AddUserRepository } from "./db-add-user.protocol"

export class DbAddUser implements AddUser {
    private readonly encrypter: Encrypter
    private readonly addUserRepository: AddUserRepository

    constructor (encrypter: Encrypter, addUserRepository: AddUserRepository) {
        this.encrypter = encrypter
        this.addUserRepository = addUserRepository
    }
    
    async add (user: AddUserModel): Promise<UserModel> {
        
        const hashedPass = await this.encrypter.encrypt(user.password)
        
        await this.addUserRepository.add(Object.assign(user, { password: hashedPass }))
        
        return new Promise(resolve => resolve(null))
    }
}
