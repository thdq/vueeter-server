import { HttpPostClient } from "@/data/protocols/http/httpPostClient"
import { RemoteAuthentication } from "./remote-authentication"

interface SutType {
    sut: RemoteAuthentication
    httpPostClientStub: HttpPostClient
}

const makeHttpPostClient = (): HttpPostClient => {

    class HttpPostClientStub implements HttpPostClient {
        url?: string

        post (url: string): Promise<void> {
            this.url = url
            return Promise.resolve()
        }
    }

    return new HttpPostClientStub()

}

const makeSut = (url: string = '_any_url'): SutType => {

    const httpPostClientStub = makeHttpPostClient()
    const sut = new RemoteAuthentication(url, httpPostClientStub)

    return {
        sut,
        httpPostClientStub
    }
}

describe('RemoteAuthentication', () => {

    test('Should call HttpPostClient with correct URL', async () => {

        const url = '_other_url'

        const { sut, httpPostClientStub } = makeSut(url)

        await sut.auth()

        expect(httpPostClientStub.url).toBe(url)

    })

})
