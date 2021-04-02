import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
    
    async sign (): Promise<string> {
        return new Promise(resolve => resolve('_valid_token'))
    },
    
    async verify (): Promise<string> {
        return new Promise(resolve => resolve('_valid_token'))
    }    
    
}))

interface SutTypes {
    sut: JwtAdapter
}

const makeSut = (): SutTypes => {
    
    const SECRET = 'secret'
    
    const sut = new JwtAdapter(SECRET)
    
    return {
        sut
    }
    
}

describe('Jwt Adapter', () => {
    
    test('Should call sign with corrects values', async () => {
        
        const { sut } = makeSut()
        
        const signSpy = jest.spyOn(jwt, 'sign')
        
        await sut.encrypt('_any_id')
        
        expect(signSpy).toHaveBeenCalledWith({ id: '_any_id' }, 'secret')
        
    })
    
    test('Should return a token on sign success', async () => {
        
        const { sut } = makeSut()
        
        const accessToken = await sut.encrypt('_any_id')
        
        expect(accessToken).toBe('_valid_token')
        
    })
    
    test('Should throw if sign throws', async () => {
        
        const { sut } = makeSut()
        
        jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
        
        const promise = sut.encrypt('_any_id')
        
        await expect(promise).rejects.toThrow()
        
    })       
    
    test('Should call verify with correct values', async () => {
        
        const { sut } = makeSut()
        
        const verifySpy = jest.spyOn(jwt, 'verify')
        
        await sut.decrypt('_hashed_token')
        
        expect(verifySpy).toHaveBeenCalledWith('_hashed_token', 'secret')
        
    })
    
    test('Should return a decrypted value on verify success', async () => {
        
        const { sut } = makeSut()
        
        const value = await sut.decrypt('_hashed_token')
        
        expect(value).toBe('_valid_token')
        
    })    
    
})
