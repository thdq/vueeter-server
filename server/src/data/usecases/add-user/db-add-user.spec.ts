import { Encrypter } from "@/data/protocols/encrypter"
import { DbAddUser } from "./db-add-user"

interface SutTypes {
    sut: DbAddUser
    encrypterStub: Encrypter
}

const makeEncrypterStub = (): Encrypter => {
    
    class EncrypterStub implements Encrypter {
        async encrypt (value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }
    
    return new EncrypterStub()
    
}

const makeSut = (): SutTypes => {
    
    const encrypterStub = makeEncrypterStub()
    const sut = new DbAddUser(encrypterStub)
    
    return {
        sut,
        encrypterStub
    }

}

describe('DbAddUser Usecase', () => {

    test('Should call Encryper with corret password', async () => {

        const { sut, encrypterStub } = makeSut()

        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

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

})
