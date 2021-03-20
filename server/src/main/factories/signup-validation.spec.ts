import { makeSignUpValidation } from './signup-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { CompareFieldValidation } from '../../presentation/helpers/validators/compare-fields-validation'
import { MaxLengthFieldValidation } from '../../presentation/helpers/validators/max-length-fields-validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

describe('SignUpValidation Factory', () => {
    
    test('Should call ValidationComposite with all validatations', () => {
        
        makeSignUpValidation()
        
        const validations: Validation[] = []
        
        for (const field of ['name', 'email', 'password', 'passwordConfirm', 'birth_date', 'username']) {
            
            validations.push(new RequiredFieldValidation(field))
            
        }
        
        validations.push(new CompareFieldValidation('password', 'passwordConfirm'))
        
        const MAXLENGTH = 50
        
        validations.push(new MaxLengthFieldValidation('username', MAXLENGTH))
        
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})
