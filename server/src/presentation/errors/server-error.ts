export class ServerError extends Error {
    constructor (error?: any) {
        super()        
        this.name = "ServerError"
        this.message = error
    }
}
