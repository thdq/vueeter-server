import { Encrypter } from "@/data/protocols/encrypter"
import { UserModel } from "@/domain/models/user"
import { AddUserModel, AddUser } from "@/domain/usecases/add-user"

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
