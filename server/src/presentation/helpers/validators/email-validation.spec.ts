import { EmailValidation } from './email-validation'
import { EmailValidator } from '../../protocols/validator'

interface SutTypes {
    sut: EmailValidation
    emailValidatorStub: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
    
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }

    return new EmailValidatorStub()

}

const makeSut = (): SutTypes => {

    const emailValidatorStub = makeEmailValidator()

    const sut = new EmailValidation('email', emailValidatorStub)

    return {
        sut,
        emailValidatorStub
    }
}

describe('Email validation', () => {  

    test('Should call EmailValidator with correct email', () => {

        const { sut, emailValidatorStub } = makeSut()

        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

        sut.validate({
            email: '_any@email'
        })
        
        expect(isValidSpy).toHaveBeenLastCalledWith('_any@email')
    })    
    
    test('Should throw if EmailValidator throws', () => {

        const { sut, emailValidatorStub } = makeSut()

        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error()
        })

        expect(sut.validate).toThrow()
    })      
    
})
