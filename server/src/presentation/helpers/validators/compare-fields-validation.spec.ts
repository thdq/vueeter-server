import { InvalidParamsError } from "../../errors"
import { CompareFieldValidation } from "./"

const makeSut = (): CompareFieldValidation => {
    return new CompareFieldValidation('field', 'fieldToCompare')
}

describe('CompareFields Validation', () => {
    
    test('Should return a InvalidParamsError if validation fails', () => {
        
        const sut = makeSut()
        
        const error = sut.validate({
            field: '_any_value',
            fieldToCompare: '_invalid_value'
        })
        
        expect(error).toEqual(new InvalidParamsError('field'))
        
    })
    
})
