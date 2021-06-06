import { AddVueetModel, NewVueet } from "@/domain/usecases/new-vueet"
import { created, serverError } from "@/presentation/helpers/http"
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols"

export class NewVueetController implements Controller {
    private readonly newVueet: NewVueet
    
    constructor (newVueet: NewVueet) {
        this.newVueet = newVueet
    }
    
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        
        try {
            
            const { text, in_reply_to_user_id, source, in_reply_to_vueet_id } = httpRequest.body
            const userId = httpRequest.userId
            
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
