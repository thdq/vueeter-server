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

    test('Should return 500 if NewVueet throws', async () => {

        const { sut, newVueetStub } = makeSut()
        
        jest.spyOn(newVueetStub, 'create').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
                
        const httpRequest = {
            body: {
                text: faker.random.word(),
                source: faker.internet.userAgent(),
                in_reply_to_vueet_id: null,
                in_reply_to_user_id: null
            }
        }
        
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())

    })
    
    test('Should call NewVueet with correct values', async () => {

        const { sut, newVueetStub } = makeSut()
        
        const newVueetSpy = jest.spyOn(newVueetStub, 'create')
                
        const httpRequest = {
            body: {
                text: faker.random.word(),
                source: faker.internet.userAgent(),
                in_reply_to_vueet_id: null,
                in_reply_to_user_id: null
            }
        }
        
        await sut.handle(httpRequest)
        
        expect(newVueetSpy).toHaveBeenCalledWith(httpRequest.body)

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
                in_reply_to_user_id: null
            }
        }
        
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())

    })
    
    test('Should call Validation with correct values', async () => {

        const { sut, validationStub } = makeSut()
        
        const validateSpy = jest.spyOn(validationStub, 'validate')
                
        const httpRequest = {
            body: {
                text: faker.random.word(),
                source: faker.internet.userAgent(),
                in_reply_to_vueet_id: null,
                in_reply_to_user_id: null
            }
        }
        
        await sut.handle(httpRequest)
        
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)

    })     

})
