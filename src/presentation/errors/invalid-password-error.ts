export class InvalidPasswordError extends Error {

    constructor () {
        super()
        this.name = 'InvalidPasswordError'
        this.message = 'domain.errors.invalid.password_rule'
    }

}
