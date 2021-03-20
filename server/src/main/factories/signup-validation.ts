import { ValidationComposite, RequiredFieldValidation, Validation, CompareFieldValidation, MaxLengthFieldValidation } from '../../presentation/helpers/validators'

export const makeSignUpValidation = (): ValidationComposite => {
    
    const validations: Validation[] = []
    
    for (const field of ['name', 'email', 'password', 'passwordConfirm', 'birth_date', 'username']) {
        
        validations.push(new RequiredFieldValidation(field))
        
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirm'))
        
    validations.push(new MaxLengthFieldValidation('username'))    
    
    return new ValidationComposite(validations)
}
