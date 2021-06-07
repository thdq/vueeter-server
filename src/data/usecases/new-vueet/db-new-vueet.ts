import { NewVueetRepository } from "@/data/protocols/repository/vueet/new-vueet-repository"
import { AddVueetModel } from "@/domain/usecases/new-vueet"

export class DbNewVueet {
    private readonly newVueetRepository: NewVueetRepository
    
    constructor (newVueetRepository: NewVueetRepository) {
        this.newVueetRepository = newVueetRepository
    }
    
    async create (newVueet: AddVueetModel): Promise<void> {
        
        await this.newVueetRepository.create(newVueet)
        
    }
    
}
