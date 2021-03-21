import { makeLoginValidation } from './login-validation'
import { ValidationComposite, RequiredFieldValidation, Validation } from '../../../presentation/helpers/validators'

jest.mock('../../../presentation/helpers/validators/validation-composite')

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
