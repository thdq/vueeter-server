import { LoginController } from './login'
import { badRequest, serverError, serverSuccess, unauthorized } from '../../helpers/http'
import { MissingParamsError } from '../../../presentation/errors'
import { Authentication, Validation } from './login.protocols'

interface SutTypes {
    sut: LoginController
    authenticationStub: Authentication
    validationStub: Validation
}

const makeAuthentication = (): Authentication => {
    
    class AuthenticationStub implements Authentication {
        
        async auth (email: string, password: string): Promise<string> {
            return new Promise(resolve => resolve('_any_token'))
        }
        
    }
    
    return new AuthenticationStub()
    
}

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate (input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

const makeSut = (): SutTypes => {
    
    const authenticationStub = makeAuthentication()
    
    const validationStub = makeValidation()
    
    const sut = new LoginController(authenticationStub, validationStub)
    
    return {
        sut,
        authenticationStub,
        validationStub
    }
    
}

describe('Login Controller', () => {
        
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
    
    test('Should return 500 if Authentication throws', async () => {
        
        const { sut, authenticationStub } = makeSut()
        
        jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        
        const httpRequest = {
            body: {
                username: '_any_username',
                password: '_any_password'
            }
        }
        
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(serverError())
        
    })    
    
    test('Should return 200 if valid credentials are provided', async () => {
        
        const { sut } = makeSut()
        
        const httpRequest = {
            body: {
                username: '_any_username',
                password: '_any_password'
            }
        }        
        
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(serverSuccess({ accessToken: '_any_token' }))
        
    })
    
    test('Should call Validation with correct value', async () => {
        
        const { sut, validationStub } = makeSut()
        
        const validateSpy = jest.spyOn(validationStub, 'validate')
        
        const httpRequest = {
            body: {
                username: '_any_username',
                birth_date: '2021-02-28',
                email: '_any_mail@email',
                name: '_any_name',
                password: '_any_password',
                passwordConfirm: '_any_password'
            }
        }
        
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
        
    })    
    
    test('Should return 400 if Validation returns an error', async () => {
        
        const { sut, validationStub } = makeSut()
        
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamsError('_any_field'))
        
        const httpRequest = {
            body: {
                username: '_any_username',
                birth_date: '2021-02-28',
                email: '_any_mail@email',
                name: '_any_name',
                password: '_any_password',
                passwordConfirm: '_any_password'
            }
        }        
        
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamsError('_any_field')))
    })        
    
})
