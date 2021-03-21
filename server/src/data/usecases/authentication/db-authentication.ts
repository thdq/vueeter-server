import { AuthenticationModel } from "../../../domain/usecases"
import { LoadUserByUsernameRepository } from "../../../data/protocols/repository/load-user-by-username"

export class DbAuthentication {
    private readonly loadUserByUsernameRepository: LoadUserByUsernameRepository
    
    constructor (loadUserByUsernameRepository: LoadUserByUsernameRepository) {
        this.loadUserByUsernameRepository = loadUserByUsernameRepository
    }
    
    async auth (authentication: AuthenticationModel): Promise<string> {
        await this.loadUserByUsernameRepository.load(authentication.username)
        
        return null
    }
    
}
