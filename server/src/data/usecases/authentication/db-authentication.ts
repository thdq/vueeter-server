import { AuthenticationModel } from "../../../domain/usecases"
import { LoadUserByUsernameRepository } from "../../../data/protocols/repository/load-user-by-username"
import { HashCompare } from "../../../data/protocols/cripotagraphy/hash-compare"
import { TokenGenerator } from "../../../data/protocols/cripotagraphy/token-generator"

export class DbAuthentication {
    private readonly loadUserByUsernameRepository: LoadUserByUsernameRepository
    private readonly hashCompare: HashCompare
    private readonly tokenGenerator: TokenGenerator
    
    constructor (loadUserByUsernameRepository: LoadUserByUsernameRepository, hashCompare: HashCompare, tokenGenerator: TokenGenerator) {
        this.loadUserByUsernameRepository = loadUserByUsernameRepository
        this.hashCompare = hashCompare
        this.tokenGenerator = tokenGenerator
    }
    
    async auth (authentication: AuthenticationModel): Promise<string> {
        
        let accessToken = null
        
        const user = await this.loadUserByUsernameRepository.load(authentication.username)
        
        if (user) {
            const isValid = await this.hashCompare.compare(authentication.password, user.password)
            
            if (isValid) {
                accessToken = await this.tokenGenerator.generate(user.id)
                return accessToken
            }
        }
        
        return accessToken
    }
    
}
