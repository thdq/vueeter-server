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

    test('Should return true if user is not authenticated and current route is /', () => {

        const { sut } = makeSut()

        jest.spyOn(sut, 'isAuthenticated').mockReturnValueOnce(false)
        jest.spyOn(sut, 'getCurrentRoute').mockReturnValueOnce("/")

        const auth = sut.handle()

        expect(auth).toBe(true)

    })

    test('Should return true if user is not authenticated and current route is /login', () => {

        const { sut } = makeSut()

        jest.spyOn(sut, 'isAuthenticated').mockReturnValueOnce(false)
        jest.spyOn(sut, 'getCurrentRoute').mockReturnValueOnce("/login")

        const auth = sut.handle()

        expect(auth).toBe(true)

    })

    test('Should return true if user is not authenticated and current route is /signup', () => {

        const { sut } = makeSut()

        jest.spyOn(sut, 'isAuthenticated').mockReturnValueOnce(false)
        jest.spyOn(sut, 'getCurrentRoute').mockReturnValueOnce("/signup")

        const auth = sut.handle()

        expect(auth).toBe(true)

    })

    test('Should return true if user is authenticated and current route is /home', () => {

        const { sut } = makeSut()

        const auth = sut.handle()

        expect(auth).toBe(true)

    })

})
