import { Encrypter, UserModel, AddUserModel, AddUser } from "./db-add-user.protocol"

export class DbAddUser implements AddUser {
    private readonly encrypter: Encrypter

    constructor (encrypter: Encrypter) {
        this.encrypter = encrypter
    }
    
    async add (user: AddUserModel): Promise<UserModel> {
        
        await this.encrypter.encrypt(user.password)
        
        return new Promise(resolve => resolve(null))
    }
}
