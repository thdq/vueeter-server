import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

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
    
})
