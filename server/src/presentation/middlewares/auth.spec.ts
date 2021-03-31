import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden } from '../helpers/http'
import { HttpRequest } from '../protocols'
import { AuthMiddleware } from './auth'

interface SutTypes {
    sut: AuthMiddleware
}

const makeSut = (): SutTypes => {
    
    const sut = new AuthMiddleware()
    
    return {
        sut
    }
    
}

describe('Auth middleware', () => {
    test('Should return 403 if no x-access-token is provided in header', async () => {
        
        const { sut } = makeSut()
        
        const httpRequest: HttpRequest = {
            headers: {}
        }
        
        const httpResponse = await sut.handle(httpRequest)
        
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })
})
