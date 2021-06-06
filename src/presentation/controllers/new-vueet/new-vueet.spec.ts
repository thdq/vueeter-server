import { NewVueet, AddVueetModel } from '@/domain/usecases/new-vueet'
import { ServerError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import faker from 'faker'
import { NewVueetController } from './new-vueet'

interface SutTypes {
    sut: NewVueetController
    newVueetStub: NewVueet
    validationStub: Validation
}

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        
        validate (input: any): Error {
            return null
        }
    }
    
    return new ValidationStub()
    
}

const makeNewVueet = (): NewVueet => {
    
    class NewVueetStub implements NewVueet {
        
        async create (vueet: AddVueetModel): Promise<void> {
            await null
        }
    }
    
    return new NewVueetStub()
    
}

const makeSut = (): SutTypes => {
    
    const newVueetStub = makeNewVueet()
    const validationStub = makeValidation()
    const sut = new NewVueetController(newVueetStub, validationStub)
    
    return {
        sut,
        newVueetStub,
        validationStub
    }
    
}

describe('NewVueet Controller', () => {

    test('Should return 500 if newVueet throws', async () => {

        const { sut, newVueetStub } = makeSut()
        
        jest.spyOn(newVueetStub, 'create').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
                
        const httpRequest = {
            body: {
                text: faker.random.word(),
                source: faker.internet.userAgent(),
                in_reply_to_vueet_id: null,
                in_reply_to_user_id: null,
                user_id: faker.datatype.uuid()
            }
        }
        
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())

    })
    
    test('Should return 500 if valiadtion throws', async () => {

        const { sut, validationStub } = makeSut()
        
        jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
            throw new Error()
        })
                
        const httpRequest = {
            body: {
                text: faker.random.word(),
                source: faker.internet.userAgent(),
                in_reply_to_vueet_id: null,
                in_reply_to_user_id: null,
                user_id: faker.datatype.uuid()
            }
        }
        
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())

    })    

})
