import { SignUpController } from './signup'
import { MissingParamsError, ServerError } from '../../errors'
import { UserModel, AddUser, AddUserModel, Validation, Authentication, AuthenticationModel } from './signup.protocols'
import { badRequest } from '../../../presentation/helpers/http'

interface SutTypes {
    sut: SignUpController
    authenticationStub: Authentication
    addUserStub: AddUser
    validationStub: Validation
}

const makeAddUser = (): AddUser => {

    class AddUserStub implements AddUser {

        async add (user: AddUserModel): Promise<UserModel> {

            const fakeUser = {
                id: '_valid_id',
                username: '_any_username',
                birth_date: new Date('2021-02-28'),
                email: '_any@email',
                name: '_any_name',
                password: '_valid_password'

            }

            return new Promise(resolve => resolve(fakeUser))
        }
    }
    return new AddUserStub()
}

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate (input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

const makeAuthentication = (): Authentication => {
    
    class AuthenticationStub implements Authentication {
        
        async auth (authentication: AuthenticationModel): Promise<string> {
            return new Promise(resolve => resolve('_any_token'))
        }
        
    }
    
    return new AuthenticationStub()
    
}

const makeSut = (): SutTypes => {

    const addUserStub = makeAddUser()
    const validationStub = makeValidation()
    const authenticationStub = makeAuthentication()

    const sut = new SignUpController(addUserStub, validationStub, authenticationStub)

    return {
        sut,
        authenticationStub,
        addUserStub,
        validationStub
    }
}

describe('SignUp Controller', () => {  

    test('Should return 500 if addUser throws', async () => {

        const { sut, addUserStub } = makeSut()

        jest.spyOn(addUserStub, 'add').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })

        const httpRequest = {
            body: {
                username: '_any_username',
                birth_date: '2021-02-28',
                email: '_any@email',
                name: '_any_name',
                password: '_any_password',
                passwordConfirm: '_any_password'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })

    test('Should call addUser with correct values', async () => {

        const { sut, addUserStub } = makeSut()

        const addSpy = jest.spyOn(addUserStub, 'add')

        const httpRequest = {
            body: {
                username: '_any_username',
                birth_date: new Date('2021-02-28'),
                email: '_any@email',
                name: '_any_name',
                password: '_any_password',
                passwordConfirm: '_any_password'
            }
        }

        await sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledWith({
            username: '_any_username',
            birth_date: new Date('2021-02-28'),
            email: '_any@email',
            name: '_any_name',
            password: '_any_password'
        })
    })

    test('Should return 200 if valid data is provided', async () => {

        const { sut } = makeSut()

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
        expect(httpResponse.statusCode).toBe(200)
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

    test('Should call Authentication wit correct values', async () => {
        
        const { sut, authenticationStub } = makeSut()
        
        const authSpy = jest.spyOn(authenticationStub, 'auth')
        
        const httpRequest = {
            body: {
                username: 'any_username',
                password: 'any_password'                
            }
            
        }
        
        await sut.handle(httpRequest)
        
        expect(authSpy).toHaveBeenCalledWith({
            username: 'any_username',
            password: 'any_password'   
        })
        
    })
    
})
