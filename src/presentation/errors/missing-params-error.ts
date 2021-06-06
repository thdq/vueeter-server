export class MissingParamsError extends Error {

    constructor (paramName: string) {
        super(`Missing param: ${paramName}`)
        this.name = 'MissingParamsError'
        this.message = `domain.errors.notprovided.${paramName}`
    }

}
