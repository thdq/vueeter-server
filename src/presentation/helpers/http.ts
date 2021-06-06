import { ServerError, UnauthorizedError } from '../errors'
import { HttpResponse } from '../protocols'

export const created = (): HttpResponse => ({
    statusCode: 201,
    body: ""
})

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
})

export const forbidden = (error: Error): HttpResponse => ({
    statusCode: 403,
    body: error
})

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: new UnauthorizedError()
})

export const serverError = (error?: any): HttpResponse => ({
    statusCode: 500,
    body: new ServerError(error)
})

export const serverSuccess = (body: any): HttpResponse => ({
    statusCode: 200,
    body: body
})
