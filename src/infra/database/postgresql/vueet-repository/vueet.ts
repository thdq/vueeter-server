import { NewVueetRepository } from "@/data/protocols/repository/vueet/new-vueet-repository"
import { VueetModel } from "@/domain/models/vueet"
import { AddVueetModel } from "@/domain/usecases/new-vueet"
import { id, prisma } from "../helpers"

export class VueetPostgreSQLRepository implements NewVueetRepository {
    
    async create (newVueet: AddVueetModel): Promise<VueetModel> {
        
        const dataNewVueet = Object.assign(newVueet, { id: id(), userId: newVueet.user_id })
        delete dataNewVueet.user_id
        
        const newVueetResponse = await prisma.vueet.create({
            data: dataNewVueet
        })
        
        return new Promise(resolve => resolve(newVueetResponse))
    }
}
