import jwt from 'jsonwebtoken'
import { Encrypter } from "../../../data/protocols/cripotagraphy/encrypter"
import { Decrypter } from '../../../data/protocols/cripotagraphy/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
    private readonly secret: string
    
    constructor (secret: string) {
        this.secret = secret
    }
    
    async encrypt (value: string): Promise<string> {
        
        const token = await jwt.sign({ id: value }, this.secret)
        
        return token
        
    }
    
    async decrypt (token: string): Promise<string> {
        
        const value: any = await jwt.verify(token, this.secret)
        
        return value
    }
}
