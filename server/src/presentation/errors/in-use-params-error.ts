export class InUseParamsError extends Error {

    constructor (param: any) {
        super()
        this.name = 'InUseParamsError'
        this.message = `Params is already used: ${param?.target?.[0] || param}`
    }

}
