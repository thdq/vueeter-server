import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
    
    async sign (): Promise<string> {
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
    
})
