import { loadUserByToken, HttpRequest, forbidden, AccessDeniedError, UserModel } from './auth.protocol'
import { AuthMiddleware } from './auth'
import { serverError, serverSuccess } from '../helpers/http'

interface SutTypes {
    sut: AuthMiddleware
    loadUserByTokenStub: loadUserByToken
}

const makeLoadUserByToken = (): loadUserByToken => {

    class LoadUserByTokenStub implements loadUserByToken {
        async load (httpRequest: HttpRequest): Promise<UserModel> {
            return new Promise(resolve => resolve({
                id: '_any_id',
                birth_date: new Date('2021-03-30'),
                name: '_any_name',
                email: '_any@email.com',
                password: '_any_password',
                username: '_any_usernamme'
            }))
        }
    }
    
    return new LoadUserByTokenStub()
    
}

const makeSut = (): SutTypes => {
    
    const loadUserByTokenStub = makeLoadUserByToken()
    const sut = new AuthMiddleware(loadUserByTokenStub)
    
    return {
        sut,
        loadUserByTokenStub
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
    
    test('Should call LoadUserByToken with correct access token', async () => {
        
        const { sut, loadUserByTokenStub } = makeSut()
        
        const httpRequest: HttpRequest = {
            headers: {
                "x-access-token": "_valid_token"
            }
        }
        
        const loadSpy = jest.spyOn(loadUserByTokenStub, 'load')
        
        await sut.handle(httpRequest)
        
        expect(loadSpy).toHaveBeenCalledWith("_valid_token")
        
    })
    
    test('Should return 403 if LoadUserByToken returns null', async () => {
        
        const { sut, loadUserByTokenStub } = makeSut()
        
        const httpRequest: HttpRequest = {
            headers: {
                "x-access-token": "_invalid_token"                
            }
        }
        
        jest.spyOn(loadUserByTokenStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        
        const httpResponse = await sut.handle(httpRequest)
        
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })
    
    test('Should return 200 if LoadUserByToken return a user', async () => {
        
        const { sut } = makeSut()
        
        const httpRequest: HttpRequest = {
            headers: {
                "x-access-token": "_valid_token"
            }
        }
    
        const httpResponse = await sut.handle(httpRequest)
        
        expect(httpResponse).toEqual(serverSuccess({
            userId: '_any_id'
        }))       
        
    })
    
    test('Should return 500 if LoadUserByToken throws', async () => {
        
        const { sut, loadUserByTokenStub } = makeSut()
        
        const httpRequest: HttpRequest = {
            headers: {
                "x-access-token": "_incorrect_param_token"
            }
        }
        
        jest.spyOn(loadUserByTokenStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    
        const httpResponse = await sut.handle(httpRequest)
        
        expect(httpResponse).toEqual(serverError())
        
    })
        
})
