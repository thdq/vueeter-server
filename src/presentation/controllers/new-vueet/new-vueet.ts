import { AddVueetModel, NewVueet } from "@/domain/usecases/new-vueet"
import { badRequest, created, serverError } from "@/presentation/helpers/http"
import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols"

export class NewVueetController implements Controller {
    private readonly newVueet: NewVueet
    private readonly validation: Validation
    
    constructor (newVueet: NewVueet, validation: Validation) {
        this.newVueet = newVueet
        this.validation = validation
    }
    
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        
        try {
            
            const { text, in_reply_to_user_id, source, in_reply_to_vueet_id } = httpRequest.body
            const userId = httpRequest.userId
            
            const error = this.validation.validate(httpRequest.body)
            
            if (error) return badRequest(error)
            
            const newVueet: AddVueetModel = {
                text,
                source,
                in_reply_to_vueet_id,
                in_reply_to_user_id,
                user_id: userId 
            }
            
            await this.newVueet.create(newVueet)
            
            return created()
            
        } catch (error) {
            return serverError()
        }
        
    }
    
}
