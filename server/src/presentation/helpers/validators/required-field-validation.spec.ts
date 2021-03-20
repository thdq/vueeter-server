import { MissingParamsError } from "../../../presentation/errors"
import { RequiredFieldValidation } from "./required-field-validation"

describe('RequiredField Validation', () => {
    
    test('Should return a MissingParamsError if validation fails', () => {
        
        const sut = new RequiredFieldValidation('field')
        
        const error = sut.validate({ name: '_any_name' })
        
        expect(error).toEqual(new MissingParamsError('field'))
        
    })
    
})
