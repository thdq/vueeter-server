import { Decrypter } from "../../../data/protocols/cripotagraphy/decrypter"
import { DbLoadUserByToken } from './db-load-user-by-token'

interface SutTypes {
    sut: DbLoadUserByToken
    decrypterStub: Decrypter
}

const makeDecrypter = (): Decrypter => {
    
    class DecrypterStub implements Decrypter {
        async decrypt (value: string): Promise<string> {
            return new Promise(resolve => resolve('_decrypted_token'))
        }
    }
    
    return new DecrypterStub()
    
}

const makeSut = (): SutTypes => {
    
    const decrypterStub = makeDecrypter()
    const sut = new DbLoadUserByToken(decrypterStub)
    
    return {
        sut,
        decrypterStub
    }
    
}

describe('DbLoadUserByToken', () => {

    test('Should call Decrypter with correct values', async () => {

        const { sut, decrypterStub } = makeSut()
        
        const decrypterSpy = jest.spyOn(decrypterStub, "decrypt")
        
        await sut.load('_any_token')
        
        expect(decrypterSpy).toHaveBeenCalledWith('_any_token')

    })

})
