import { makeSignUpValidation } from './signup-validation'
import { ValidationComposite, RequiredFieldValidation, Validation, CompareFieldValidation, MaxLengthFieldValidation } from '../../../../presentation/protocols/validation/validators'
import { EmailValidation } from '../../../../presentation/protocols/validation/validators/email-validation'
import { EmailValidator } from '../../../../presentation/protocols/validation/protocols'

jest.mock('../../../../presentation/protocols/validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
    
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }

    return new EmailValidatorStub()

}

describe('SignUpValidation Factory', () => {
    
    test('Should call ValidationComposite with all validatations', () => {
        
        makeSignUpValidation()
        
        const validations: Validation[] = []
        
        for (const field of ['name', 'email', 'password', 'passwordConfirm', 'birth_date', 'username']) {
            
            validations.push(new RequiredFieldValidation(field))
            
        }
        
        validations.push(new CompareFieldValidation('password', 'passwordConfirm'))
        
        validations.push(new EmailValidation('email', makeEmailValidator()))
        
        validations.push(new MaxLengthFieldValidation('username'))
        
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})
