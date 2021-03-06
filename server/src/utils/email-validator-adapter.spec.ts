import { EmailValidatorAdapter } from "./email-validator-adapter"
import validator from 'validator'

jest.mock('validator', () => ({
    isEmail (): boolean {
        return true
    }
}))

describe('EmailValidator Adapter', () => {

    test('Should return false if validator return false', () => {
        const sut = new EmailValidatorAdapter()

        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

        const isValid = sut.isValid('_invalid_mail@mail.com')

        expect(isValid).toBe(false)
    })

    test('Should return true if validator return true', () => {
        const sut = new EmailValidatorAdapter()

        const isValid = sut.isValid('_any_mail@mail.com')

        expect(isValid).toBe(true)
    })

})
