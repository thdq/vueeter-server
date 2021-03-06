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

})
