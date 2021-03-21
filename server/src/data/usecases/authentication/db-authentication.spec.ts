import { UserModel } from "../../../domain/models/user"
import { LoadUserByUsernameRepository } from "../../../data/protocols/repository/load-user-by-username"
import { DbAuthentication } from './db-authentication'

const makeLoadUserByUsernameRepository = (): LoadUserByUsernameRepository => {
    
    class LoadUserByUsernameRepositoryStub implements LoadUserByUsernameRepository {
        async load (username: string): Promise<UserModel> {
            
            const user: UserModel = {
                id: '_valid_id',
                username: 'thdq',
                birth_date: new Date('2021-03-21'),
                email: '_valid@email',
                name: '_any_name',
                password: '_any_password'
            }
            
            return new Promise(resolve => resolve(user))
        }
    }
    
    return new LoadUserByUsernameRepositoryStub()
}

interface SutTypes {
    sut: DbAuthentication
    loadUserByUsernameRepositoryStub: LoadUserByUsernameRepository
}

const makeSut = (): SutTypes => {
    
    const loadUserByUsernameRepositoryStub = makeLoadUserByUsernameRepository()
    const sut = new DbAuthentication(loadUserByUsernameRepositoryStub)
    
    return {
        sut,
        loadUserByUsernameRepositoryStub
    }
}

describe('DbAuthentication UseCase', () => {
    
    test('Should call LoadUserByUsernameRepository with correct email', async () => {
        
        const { sut, loadUserByUsernameRepositoryStub } = makeSut()
        
        const loadSpy = jest.spyOn(loadUserByUsernameRepositoryStub, 'load')
        
        await sut.auth({
            username: 'thdq',
            password: '_any_password'
        })
        
        expect(loadSpy).toHaveBeenCalledWith('thdq')
        
    })
    
    test('Should throw if LoadUserByUsernameRepository throws', async () => {
        
        const { sut, loadUserByUsernameRepositoryStub } = makeSut()
        
        jest.spyOn(loadUserByUsernameRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        
        const promise = sut.auth({
            username: 'thdq',
            password: '_any_password'
        })
        
        await expect(promise).rejects.toThrow()
        
    })
    
    test('Should return null LoadUserByUsernameRepository returns null', async () => { 
        
        const { sut, loadUserByUsernameRepositoryStub } = makeSut()
        
        jest.spyOn(loadUserByUsernameRepositoryStub, 'load').mockReturnValueOnce(null)
        
        const accessToken = await sut.auth({
            username: 'thdq',
            password: '_any_password'
        })
        
        expect(accessToken).toBeNull()
        
    })
    
})
