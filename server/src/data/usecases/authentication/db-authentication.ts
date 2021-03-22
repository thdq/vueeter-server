import { AuthenticationModel } from "../../../domain/usecases"
import { LoadUserByUsernameRepository } from "../../../data/protocols/repository/load-user-by-username"
import { HashCompare } from "../../../data/protocols/cripotagraphy/hash-compare"
import { Encrypter } from "../../protocols/cripotagraphy/encrypter"
import { UpdateAccessTokenRepository } from "../../../data/protocols/repository/update-access-token"

export class DbAuthentication {
    private readonly loadUserByUsernameRepository: LoadUserByUsernameRepository
    private readonly hashCompare: HashCompare
    private readonly encrypter: Encrypter
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
    
    constructor (loadUserByUsernameRepository: LoadUserByUsernameRepository, hashCompare: HashCompare, encrypter: Encrypter, updateAccessTokenRepository: UpdateAccessTokenRepository) {
        this.loadUserByUsernameRepository = loadUserByUsernameRepository
        this.hashCompare = hashCompare
        this.encrypter = encrypter
        this.updateAccessTokenRepository = updateAccessTokenRepository
        
    }
    
    async auth (authentication: AuthenticationModel): Promise<string> {
        
        let accessToken = null
        
        const user = await this.loadUserByUsernameRepository.load(authentication.username)
        
        if (user) {
            const isValid = await this.hashCompare.compare(authentication.password, user.password)
            
            if (isValid) {
                accessToken = await this.encrypter.encrypt(user.id)
                
                await this.updateAccessTokenRepository.updateAcessToken(user.id, accessToken)
                
                return accessToken
            }
        }
        
        return accessToken
    }
    
}
