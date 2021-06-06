import { Middleware } from '@/presentation/protocols'
import { Request, Response, NextFunction } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
    
    return async (req: Request, res: Response, next: NextFunction) => {
        
        const httpResponse = await middleware.handle(req)
        
        if (httpResponse.statusCode === 200) {
            
            Object.assign(req, httpResponse.body)
            next()
            
        } else {
            
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message
            })
            
        }
    }
}
