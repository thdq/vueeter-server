import { InvalidParamsError } from "../../../presentation/errors"
import { PasswordRulesFieldValidation } from './'

const makeSut = (): PasswordRulesFieldValidation => {
    
    return new PasswordRulesFieldValidation('password')
    
}

describe('PasswordRulesField Validation', () => {
    
    test('Should return a InvalidParamsError if password not contains number', () => {
        
        const sut = makeSut()
        
        const error = sut.validate({
            password: 'thiago'
        })
        
        expect(error).toEqual(new InvalidParamsError('password'))
        
    })
    
    test('Should return a InvalidParamsError if password not contains uppercase', () => {
        
        const sut = makeSut()
        
        const error = sut.validate({
            password: 'thiago123'
        })
        
        expect(error).toEqual(new InvalidParamsError('password'))
        
    }) 
    
    test('Should return a InvalidParamsError if the password is not longer than or equal to 8 characters', () => {
        
        const sut = makeSut()
        
        const error = sut.validate({
            password: 'Thiag12'
        })
        
        expect(error).toEqual(new InvalidParamsError('password'))
        
    })    
    
    test('Should not return if validation succeeds', () => {
        
        const sut = makeSut()
        
        const error = sut.validate({
            password: 'Thiago123'
        })
        
        expect(error).toBeFalsy()
        
    })    
    
})
