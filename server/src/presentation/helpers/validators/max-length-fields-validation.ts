import { InvalidParamsError } from '../../../presentation/errors'
import { Validation } from './validation'

export class MaxLengthFieldValidation implements Validation {
    private readonly fieldName: string
    private readonly maxLength: number

    constructor (fieldName: string) {
        this.fieldName = fieldName
        this.maxLength = 50
    }    
    
    validate (input: any): Error {
        
        if (input[this.fieldName].length > this.maxLength) {
            
            return new InvalidParamsError(this.fieldName)
            
        }
        
    }
}
