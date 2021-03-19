import { LoginController } from './login'
import { badRequest, unauthorized } from '../../helpers/http'
import { MissingParamsError } from '../../../presentation/errors'
import { Authentication } from '../../../domain/usecases/authentication'

interface SutTypes {
    sut: LoginController
    authenticationStub: Authentication
}
const makeAuthentication = (): Authentication => {
    
    class AuthenticationStub implements Authentication {
        
        async auth (email: string, password: string): Promise<string> {
            return new Promise(resolve => resolve('_any_token'))
        }
        
    }
    
    return new AuthenticationStub()
    
}

const makeSut = (): SutTypes => {
    
    const authenticationStub = makeAuthentication()
    const sut = new LoginController(authenticationStub)
    
    return {
        sut,
        authenticationStub
    }
    
}

describe('Login Controller', () => {
    
    test('Should return 400 if no username is provided', async () => {
        
        const { sut } = makeSut()
        
        const httpRequest = {
            body: {
                password: '_any_password'
            }
        }
        
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamsError('username')))
        
    })
    
    test('Should return 400 if no password is provided', async () => {
        
        const { sut } = makeSut()
        
        const httpRequest = {
            body: {
                username: '_any_username'
            }
        }
        
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamsError('password')))
        
    })
    
    test('Should call Authentication with correct values', async () => {
        
        const { sut, authenticationStub } = makeSut()
        const authSpy = jest.spyOn(authenticationStub, 'auth')
        
        const httpRequest = {
            body: {
                username: '_any_username',
                password: '_any_password'
            }
        }
        
        await sut.handle(httpRequest)
        expect(authSpy).toHaveBeenCalledWith('_any_username', '_any_password')
        
    })
    
    test('Should return 401 if invalid credentials are provided', async () => {
        
        const { sut, authenticationStub } = makeSut()
        
        jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        
        const httpRequest = {
            body: {
                username: '_invalid_username',
                password: '_invalid_password'
            }
        }
        
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(unauthorized())
        
    })
    
})
