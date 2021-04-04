import { Context } from "@nuxt/types"
import { AuthMiddleware } from './auth'

const makeContext = (): Context => {

    const context: Context = <Context>{
        app: {
            router: {
                currentRoute: {
                    path: '/home'
                }
            }
        },
        store: {
            getters: {
                isAuthenticated: true
            }
        },
        redirect: (path: string) => {}
    }

    return context

}

interface SutTypes {
    sut: AuthMiddleware,
    contextStub: Context
}

const makeSut = (): SutTypes => {

    const contextStub = makeContext()
    const sut = new AuthMiddleware(contextStub)

    return {
        sut,
        contextStub
    }

}

describe('Auth Middleware', () => {

    test('Should return false if user is not authenticated and current route is /home', () => {

        const { sut } = makeSut()

        jest.spyOn(sut, 'isAuthenticated').mockReturnValueOnce(false)

        const auth = sut.handle()

        expect(auth).toBe(false)

    })

})
