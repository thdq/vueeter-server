import { HttpPostClient } from '@/data/protocols/http/httpPostClient'

export class RemoteAuthentication {
    private readonly url: string
    private readonly httpPostClient: HttpPostClient

    constructor (url: string, httpPostClient: HttpPostClient) {
        this.url = url
        this.httpPostClient = httpPostClient
    }

    async auth (): Promise<void> {

        await this.httpPostClient.post(this.url)

    }
}
