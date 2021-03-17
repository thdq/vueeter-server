import { LoginController } from './login'
import { badRequest } from '../../helpers/http'
import { MissingParamsError } from '../../../presentation/errors'

interface SutTypes {
    sut: LoginController
}

const makeSut = (): SutTypes => {
    
    const sut = new LoginController()
    
    return {
        sut
    }
    
}

describe('Login Controller', () => {
    
    test('Should return 400 if no username is provided', async () => {
        
        const { sut } = makeSut()
        
        const httpRequest = {
            body: {
                password: '_any_password'
            }
        }
        
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamsError('username')))
        
    })
    
})
