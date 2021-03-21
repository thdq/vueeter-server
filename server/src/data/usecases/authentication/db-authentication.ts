import { AuthenticationModel } from "../../../domain/usecases"
import { LoadUserByUsernameRepository } from "../../../data/protocols/repository/load-user-by-username"
import { HashCompare } from "../../../data/protocols/cripotagraphy/hash-compare"

export class DbAuthentication {
    private readonly loadUserByUsernameRepository: LoadUserByUsernameRepository
    private readonly hashCompare: HashCompare
    
    constructor (loadUserByUsernameRepository: LoadUserByUsernameRepository, hashCompare: HashCompare) {
        this.loadUserByUsernameRepository = loadUserByUsernameRepository
        this.hashCompare = hashCompare
    }
    
    async auth (authentication: AuthenticationModel): Promise<string> {
        
        const user = await this.loadUserByUsernameRepository.load(authentication.username)
        
        if (user) await this.hashCompare.compare(authentication.password, user.password)
        
        return null
    }
    
}
