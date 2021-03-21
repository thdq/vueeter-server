import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { ValidationComposite, RequiredFieldValidation, Validation, CompareFieldValidation, MaxLengthFieldValidation } from '../../presentation/helpers/validators'
import { EmailValidation } from '../../presentation/helpers/validators/email-validation'

export const makeSignUpValidation = (): ValidationComposite => {
    
    const validations: Validation[] = []
    
    for (const field of ['name', 'email', 'password', 'passwordConfirm', 'birth_date', 'username']) {
        
        validations.push(new RequiredFieldValidation(field))
        
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirm'))
    
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))    
        
    validations.push(new MaxLengthFieldValidation('username'))    
    
    return new ValidationComposite(validations)
}
