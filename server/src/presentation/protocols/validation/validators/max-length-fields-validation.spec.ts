import { InvalidParamsError } from "../../../errors"
import { MaxLengthFieldValidation } from "."

const makeSut = (): MaxLengthFieldValidation => {
    
    return new MaxLengthFieldValidation('username')
    
}

describe('MaxLengthField Validation', () => {
    
    test('Should return a InvalidParamsError if validation fails', () => {
        
        const sut = makeSut()
        
        const error = sut.validate({
            username: '_invalid_username_exceeds_50_characters_invalid_username_exceeds_50_characters'
        })
        
        expect(error).toEqual(new InvalidParamsError('username'))
        
    })
    
    test('Should not return if validation succeeds', () => {
        
        const sut = makeSut()
        
        const error = sut.validate({
            username: '_valid_username'
        })
        
        expect(error).toBeFalsy()
        
    })      
    
})
