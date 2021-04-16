import { HttpResponse } from '../../presentation/protocols'
import { HttpRequest } from './http'

export interface Middleware {
    handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
