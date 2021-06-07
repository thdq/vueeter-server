import { NewVueetRepository } from "@/data/protocols/repository/vueet/new-vueet-repository"
import { AddVueetModel } from "@/domain/usecases/new-vueet"
import { DbNewVueet } from "./db-new-vueet"
import faker from 'faker'

interface SutTypes {
    sut: DbNewVueet
    newVueetRepositoryStub: NewVueetRepository
}

const makeNewVueetRepository = (): NewVueetRepository => {
    
    class NewVueetRepositoryStub implements NewVueetRepository {
        async create (fakeNewVueet): Promise<void> {
            await null
        }
    }
    
    return new NewVueetRepositoryStub()
    
}

const makeSut = (): SutTypes => {
    
    const newVueetRepositoryStub = makeNewVueetRepository()
    const sut = new DbNewVueet(newVueetRepositoryStub)
    
    return {
        sut,
        newVueetRepositoryStub
    }
    
}

describe('DbNewVueet Usecase ', () => {

    test('Should call NewVueetRepository with correct values', async () => {

        const { sut, newVueetRepositoryStub } = makeSut()
        
        const newVueet: AddVueetModel = {
            text: faker.random.word(),
            source: faker.internet.userAgent(),
            in_reply_to_vueet_id: null,
            in_reply_to_user_id: null,
            user_id: faker.datatype.uuid()
        }
        
        const newVueetRepositorySpy = jest.spyOn(newVueetRepositoryStub, 'create')
        
        await sut.create(newVueet)
        
        expect(newVueetRepositorySpy).toHaveBeenCalledWith(newVueet)
        
    })
    
    test('Should throw if NewVueetRepository throws', async () => {
        
        const { sut, newVueetRepositoryStub } = makeSut()
        
        jest.spyOn(newVueetRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        
        const newVueet: AddVueetModel = {
            text: faker.random.word(),
            source: faker.internet.userAgent(),
            in_reply_to_vueet_id: null,
            in_reply_to_user_id: null,
            user_id: faker.datatype.uuid()
        }
        
        const promise = sut.create(newVueet)
        
        await expect(promise).rejects.toThrow()
        
    })    

})
