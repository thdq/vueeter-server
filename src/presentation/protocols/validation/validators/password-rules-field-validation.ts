import { InvalidPasswordError } from "../../../errors"
import { Validation } from "../../../controllers/signup/signup.protocols"

export class PasswordRulesFieldValidation implements Validation {
    private readonly fieldName: string
    
    constructor (fieldName: string) {
        this.fieldName = fieldName
    }
    
    validate (input: any): Error {
        
        const HAVENUMBER = /\d/.test(input[this.fieldName])
        const HAVEUPPERCASE = /[A-Z]/.test(input[this.fieldName])
        const HAVEMOREOREQUALTHAN8CHARACTERS = input[this.fieldName].length >= 8
        
        if (!HAVENUMBER || !HAVEUPPERCASE || !HAVEMOREOREQUALTHAN8CHARACTERS) return new InvalidPasswordError()
    }
    
}
