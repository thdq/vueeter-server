import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

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
    
})
