import { LoadUserByTokenRepository } from "../../../data/protocols/repository/user/load-user-by-token-repository"
import { Decrypter } from "../../../data/protocols/cripotagraphy/decrypter"
import { UserModel } from "../../../domain/models/user"

export class DbLoadUserByToken {
    private readonly decrypter: Decrypter
    private readonly loadUserByTokenRepository: LoadUserByTokenRepository
    
    constructor (decrypter: Decrypter, loadUserByTokenRepository: LoadUserByTokenRepository) {
        
        this.decrypter = decrypter
        this.loadUserByTokenRepository = loadUserByTokenRepository
        
    }
    
    async load (value: string): Promise<UserModel> {
        
        const token = await this.decrypter.decrypt(value)
        
        if (!token) return null
        
        const user = await this.loadUserByTokenRepository.loadByToken(token)
        
        return user
        
    }
    
}
