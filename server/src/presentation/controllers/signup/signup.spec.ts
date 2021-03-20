import { SignUpController } from './signup'
import { MissingParamsError, ServerError, InvalidParamsError } from '../../errors'
import { EmailValidator, UserModel, AddUser, AddUserModel, Validation } from './signup.protocols'

interface SutTypes {
    sut: SignUpController
    emailValidatorStub: EmailValidator
    addUserStub: AddUser
    validationStub: Validation
}

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }

    return new EmailValidatorStub()

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

const makeSut = (): SutTypes => {

    const emailValidatorStub = makeEmailValidator()
    const addUserStub = makeAddUser()
    const validationStub = makeValidation()

    const sut = new SignUpController(emailValidatorStub, addUserStub, validationStub)

    return {
        sut,
        emailValidatorStub,
        addUserStub,
        validationStub
    }
}

describe('SignUp Controller', () => {

    test('Should return 400 if no username is provided', async () => {

        const { sut } = makeSut()

        const httpRequest = {
            body: {
                email: '_any@email',
                birth_date: '2021-02-28',
                name: '_any_name',
                password: '_any_password',
                passwordConfirm: '_any_passwordConfirm'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsError('username'))

    })
    
    test('Should return 400 if username length limit exceeds 50 characters', async () => {

        const { sut } = makeSut()

        const httpRequest = {
            body: {
                email: '_any@email',
                birth_date: '2021-02-28',
                username: '_any_username_exceeds_50_characters_any_username_exceeds_50_characters',
                name: '_any_name',
                password: '_any_password',
                passwordConfirm: '_any_passwordConfirm'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamsError('username'))

    })    

    test('Should return 400 if no email is provided', async () => {

        const { sut } = makeSut()

        const httpRequest = {
            body: {
                username: '_any_username',
                birth_date: '2021-02-28',
                name: '_any_name',
                password: '_any_password',
                passwordConfirm: '_any_passwordConfirm'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsError('email'))

    })

    test('Should return 400 if no birth date is provided', async () => {

        const { sut } = makeSut()

        const httpRequest = {
            body: {
                username: '_any_username',
                email: '_any@email',
                name: '_any_name',
                password: '_any_password',
                passwordConfirm: '_any_passwordConfirm'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsError('birth_date'))

    })

    test('Should return 400 if no password is provided', async () => {

        const { sut } = makeSut()

        const httpRequest = {
            body: {
                username: '_any_username',
                birth_date: '2021-02-28',
                email: '_any@email',
                name: '_any_name',
                passwordConfirm: '_any_passwordConfirm'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsError('password'))

    })

    test('Should return 400 if no password confirmation is provided', async () => {

        const { sut } = makeSut()

        const httpRequest = {
            body: {
                username: '_any_username',
                birth_date: '2021-02-28',
                email: '_any@email',
                name: '_any_name',
                password: '_any_password'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsError('passwordConfirm'))

    })

    test('Should return 400 if no confirmation fails', async () => {

        const { sut } = makeSut()

        const httpRequest = {
            body: {
                username: '_any_username',
                birth_date: '2021-02-28',
                email: '_any@email',
                name: '_any_name',
                password: '_any_password',
                passwordConfirm: '_invalid_password'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamsError('passwordConfirm'))

    })

    test('Should return 400 if an invalid email is provided', async () => {

        const { sut, emailValidatorStub } = makeSut()

        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

        const httpRequest = {
            body: {
                username: '_any_username',
                birth_date: '2021-02-28',
                email: '_any_invalid@email',
                name: '_any_name',
                password: '_any_password',
                passwordConfirm: '_any_password'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamsError('email'))
    })

    test('Should return 500 if email validator throws', async () => {

        const { sut, emailValidatorStub } = makeSut()

        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw new Error() })

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

})
