import { InvalidParamsError } from '../../../presentation/errors'
import { Validation } from './validation'

export class MaxLengthFieldValidation implements Validation {
    private readonly fieldName: string
    private readonly maxLength: number

    constructor (fieldName: string, maxLength: number) {
        this.fieldName = fieldName
        this.maxLength = maxLength
    }    
    
    validate (input: any): Error {
        
        if (input[this.fieldName].length > input[this.maxLength]) {
            
            return new InvalidParamsError(this.fieldName)
            
        }
        
    }
}
