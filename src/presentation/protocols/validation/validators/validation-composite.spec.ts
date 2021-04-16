import { Validation } from "../../../controllers/signup/signup.protocols"
import { MissingParamsError } from "../../../errors"
import { ValidationComposite } from "./validation-composite"

interface SutTypes {
    sut: ValidationComposite
    validationStub: Validation
}

const makeValidation = (): Validation => {
    
    class ValidationStub implements Validation {
        validate (input: any): Error {
            return null
        }
    }
    
    return new ValidationStub()
}

const makeSut = (): SutTypes => {
    
    const validationStub = makeValidation()
    const sut = new ValidationComposite([validationStub])
    
    return {
        sut,
        validationStub
    }
}

describe('Validation Composite', () => {
    
    test('Should return an error if any validation fails', () => {
        
        const { sut, validationStub } = makeSut()
        
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamsError('field'))
        
        const error = sut.validate({ field: '_any_value' })
        
        expect(error).toEqual(new MissingParamsError('field'))
        
    })
    
    test('Should not return if validation succeeds', () => {
        
        const { sut } = makeSut()
        
        const error = sut.validate({ field: '_any_value' })
        
        expect(error).toBeFalsy()
        
    })    
    
})
