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
    
})
