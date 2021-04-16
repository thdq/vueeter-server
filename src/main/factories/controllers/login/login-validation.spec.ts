import { makeLoginValidation } from './login-validation'
import { ValidationComposite, RequiredFieldValidation, Validation } from '../../../../presentation/protocols/validation/validators'

jest.mock('../../../../presentation/protocols/validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
    
    test('Should call ValidationComposite with all validatations', () => {
        
        makeLoginValidation()
        
        const validations: Validation[] = []
        
        for (const field of ['username', 'password']) {
            
            validations.push(new RequiredFieldValidation(field))
            
        }
        
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})
