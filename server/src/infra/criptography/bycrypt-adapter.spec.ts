import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
    async hash (): Promise<string> {
        return new Promise(resolve => resolve('hashed_value'))
    }
}))

interface SutTypes {
    sut: BcryptAdapter
    SALT: number
}

const makeSut = (): SutTypes => {
    
    const SALT = 12
    
    const sut = new BcryptAdapter(SALT)
    
    return {
        sut,
        SALT
    }
    
}

describe('Bcrypt Adapter', () => {
    
    test('Should call bcrypt with corret value', async () => {
        
        const { sut, SALT } = makeSut()
        
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        
        await sut.encrypt('_any_value')
        
        expect(hashSpy).toHaveBeenCalledWith('_any_value', SALT)
        
    })
    
    test('Should return a hash on success', async () => {
        
        const { sut } = makeSut()
        
        const hash = await sut.encrypt('_any_value')
        
        expect(hash).toBe('hashed_value')
        
    })
    
})
