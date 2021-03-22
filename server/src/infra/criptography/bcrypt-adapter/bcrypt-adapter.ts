import bcrypt from 'bcrypt'
import { Hasher } from '@/data/protocols/cripotagraphy/hasher'
import { HashCompare } from '@/data/protocols/cripotagraphy/hash-compare'

export class BcryptAdapter implements Hasher, HashCompare {
    private readonly salt: number
    
    constructor (salt: number) {
        this.salt = salt
    }
    
    async hash (value: string): Promise<string> {
        
        const hash = await bcrypt.hash(value, this.salt)
        
        return hash
    }
    
    async compare (value: string, valueToCompare: string): Promise<boolean> {
        
        const isValid = await bcrypt.compare(value, valueToCompare)
        
        return isValid
        
    }
}
