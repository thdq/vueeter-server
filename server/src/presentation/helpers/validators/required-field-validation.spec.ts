import { MissingParamsError } from "../../../presentation/errors"
import { RequiredFieldValidation } from "./required-field-validation"

const makeSut = (): RequiredFieldValidation => {
    return new RequiredFieldValidation('field')
}

describe('RequiredField Validation', () => {
    
    test('Should return a MissingParamsError if validation fails', () => {
        
        const sut = makeSut()
        
        const error = sut.validate({ name: '_any_name' })
        
        expect(error).toEqual(new MissingParamsError('field'))
        
    })
    
    test('Should not return if validation succeeds', () => {
        
        const sut = makeSut()
        
        const error = sut.validate({ field: '_any_name' })
        
        expect(error).toBeFalsy()
        
    })    
    
})
