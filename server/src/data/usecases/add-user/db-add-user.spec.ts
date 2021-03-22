import { Hasher, AddUserModel, UserModel, AddUserRepository } from "./db-add-user.protocol"
import { DbAddUser } from "./db-add-user"

interface SutTypes {
    sut: DbAddUser
    hasherStub: Hasher
    addUserRepositoryStub: AddUserRepository
}

const makeAddUserRepository = (): AddUserRepository => {
    
    class AddUserRepositoryStub implements AddUserRepository {
        async add (user: AddUserModel): Promise<UserModel> {
            
            const fakeUser = {
                id: '_valid_id',
                username: '_any_username',
                email: '_any@email',
                birth_date: new Date('2021-02-28'),
                name: '_any_name',
                password: 'hashed_password'                
            }
            
            return new Promise(resolve => resolve(fakeUser))
        }
    }
    
    return new AddUserRepositoryStub()
}

const makeHasherStub = (): Hasher => {
    class HasherStub implements Hasher {
        async hash (value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }
    
    return new HasherStub()
    
}

const makeSut = (): SutTypes => {
    
    const hasherStub = makeHasherStub()
    const addUserRepositoryStub = makeAddUserRepository()
    const sut = new DbAddUser(hasherStub, addUserRepositoryStub)
    
    return {
        sut,
        hasherStub,
        addUserRepositoryStub
    }

}

describe('DbAddUser Usecase', () => {

    test('Should call Hasher with corret password', async () => {

        const { sut, hasherStub } = makeSut()

        const encryptSpy = jest.spyOn(hasherStub, 'hash')

        const userData = {
            username: '_any_username',
            email: '_any@email',
            birth_date: '2021-02-28',
            name: '_any_name',
            password: '_any_password'
        }

        await sut.add(userData)

        expect(encryptSpy).toHaveBeenCalledWith("_any_password")

    })
    
    test('Should throw if Hasher throws', async () => {

        const { sut, hasherStub } = makeSut()

        jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

        const userData = {
            username: '_any_username',
            email: '_any@email',
            birth_date: '2021-02-28',
            name: '_any_name',
            password: '_any_password'
        }

        const promisseAdd = sut.add(userData)

        await expect(promisseAdd).rejects.toThrow()

    })
    
    test('Should call AddUserRepository with corret values', async () => {
        
        const { sut, addUserRepositoryStub } = makeSut()
        
        const addSpy = jest.spyOn(addUserRepositoryStub, 'add')
        
        const userData = {
            username: '_any_username',
            email: '_any@email',
            birth_date: '2021-02-28',
            name: '_any_name',
            password: 'hashed_password'            
        }
        
        await sut.add(userData)
        
        expect(addSpy).toHaveBeenCalledWith({
            username: '_any_username',
            email: '_any@email',
            birth_date: '2021-02-28',
            name: '_any_name',
            password: 'hashed_password'                
        })
        
    })
    
    test('Should throw if AddUserRepository throws', async () => {
        
        const { sut, addUserRepositoryStub } = makeSut()
        
        jest.spyOn(addUserRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        
        const userData = {
            username: '_any_username',
            email: '_any@email',
            birth_date: '2021-02-28',
            name: '_any_name',
            password: '_any_password'             
        }
        
        const promise = sut.add(userData)
        
        await expect(promise).rejects.toThrow()
        
    })
    
    test('Should return a user on success', async () => {
        
        const { sut } = makeSut()
        
        const userData = {
            username: '_any_username',
            email: '_any@email',
            birth_date: new Date('2021-02-28'),
            name: '_any_name',
            password: '_any_password'               
        }
        
        const newUser = await sut.add(userData)
        
        expect(newUser).toEqual({
            id: '_valid_id',
            username: '_any_username',
            email: '_any@email',
            birth_date: new Date('2021-02-28'),
            name: '_any_name',
            password: 'hashed_password'            
        })
        
    })

})
