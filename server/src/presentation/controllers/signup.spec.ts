import { SignUpController } from './signup'
import { MissingParamsError } from '../errors/missing-params-error'
import { EmailValidator } from '../protocols/validator/email-validator'
import { InvalidParamsError } from '../errors/invalid-params-error'

interface SutTypes {
    sut: SignUpController
    emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {

    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }

    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SignUpController(emailValidatorStub)

    return {
        sut,
        emailValidatorStub
    }
}

describe('SignUp Controller', () => {

    test('Should return 400 if no username is provided', () => {

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

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsError('username'))

    })

    test('Should return 400 if no email is provided', () => {

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

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsError('email'))

    })

    test('Should return 400 if no birth date is provided', () => {

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

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsError('birth_date'))

    })

    test('Should return 400 if no password is provided', () => {

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

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsError('password'))

    })

    test('Should return 400 if no password confirmation is provided', () => {

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

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsError('passwordConfirm'))

    })

    test('Should return 400 if an invalid email is provided', () => {

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

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamsError('email'))
    })

})
