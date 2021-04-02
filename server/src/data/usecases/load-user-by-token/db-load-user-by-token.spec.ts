import { UserModel } from "../../../domain/models/user"
import { LoadUserByTokenRepository } from "../../protocols/repository/user/load-user-by-token-repository"
import { Decrypter } from "../../../data/protocols/cripotagraphy/decrypter"
import { DbLoadUserByToken } from './db-load-user-by-token'

interface SutTypes {
    sut: DbLoadUserByToken
    decrypterStub: Decrypter
    loadUserByTokenRepositoryStub: LoadUserByTokenRepository
}

const makeDecrypter = (): Decrypter => {
    
    class DecrypterStub implements Decrypter {
        async decrypt (value: string): Promise<string> {
            return new Promise(resolve => resolve('_decrypted_token'))
        }
    }
    
    return new DecrypterStub()
    
}

const makeLoadUserByTokenRepository = (): LoadUserByTokenRepository => {

    class LoadUserByTokenRepositoryStub implements LoadUserByTokenRepository {
        async loadByToken (value: string): Promise<UserModel> {
            return new Promise(resolve => resolve({
                id: '_any_id',
                birth_date: new Date('2021-03-30'),
                name: '_any_name',
                email: '_any@email.com',
                password: '_any_password',
                username: '_any_usernamme'
            }))
        }
    }
    
    return new LoadUserByTokenRepositoryStub()
}

const makeSut = (): SutTypes => {
    
    const decrypterStub = makeDecrypter()
    const loadUserByTokenRepositoryStub = makeLoadUserByTokenRepository()
    const sut = new DbLoadUserByToken(decrypterStub, loadUserByTokenRepositoryStub)
    
    return {
        sut,
        decrypterStub,
        loadUserByTokenRepositoryStub
    }
    
}

describe('DbLoadUserByToken use case', () => {

    test('Should call Decrypter with correct values', async () => {

        const { sut, decrypterStub } = makeSut()
        
        const decrypterSpy = jest.spyOn(decrypterStub, "decrypt")
        
        await sut.load('_any_token')
        
        expect(decrypterSpy).toHaveBeenCalledWith('_any_token')

    })
    
    test('Should return null if Decrypter return null', async () => {

        const { sut, decrypterStub } = makeSut()
        
        jest.spyOn(decrypterStub, "decrypt").mockReturnValueOnce(new Promise(resolve => resolve(null)))
        
        const user = await sut.load('_any_token')
        
        expect(user).toBeNull()

    })
    
    test('Should call LoadUserByTokenRepository with correct values', async () => {

        const { sut, loadUserByTokenRepositoryStub } = makeSut()
        
        const loadUserSpy = jest.spyOn(loadUserByTokenRepositoryStub, "loadByToken")
        
        await sut.load('_any_token')
        
        expect(loadUserSpy).toHaveBeenCalledWith('_decrypted_token')

    }) 
    
    test('Should return null if LoadUserByTokenRepository return null', async () => {

        const { sut, loadUserByTokenRepositoryStub } = makeSut()
        
        jest.spyOn(loadUserByTokenRepositoryStub, "loadByToken").mockReturnValueOnce(new Promise(resolve => resolve(null)))
        
        const user = await sut.load('_any_token')
        
        expect(user).toBeNull()

    })    

})
