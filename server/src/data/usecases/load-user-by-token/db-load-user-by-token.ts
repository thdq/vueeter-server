import { Decrypter } from "../../../data/protocols/cripotagraphy/decrypter"
import { UserModel } from "../../../domain/models/user"

export class DbLoadUserByToken {
    private readonly decrypter: Decrypter
    
    constructor (decrypter: Decrypter) {
        
        this.decrypter = decrypter
        
    }
    
    async load (value: string): Promise<UserModel> {
        
        await this.decrypter.decrypt(value)
        
        return new Promise(resolve => resolve(null))
    }
    
}
