import { AuthMiddleware } from "../../../presentation/middlewares/auth"
import { Middleware } from "../../../presentation/protocols"
import { makeDbLoadUserByToken } from "../usecases/load-user-by-token/db-load-user-by-token"

export const makeAuthMiddleware = (): Middleware => {
    
    return new AuthMiddleware(makeDbLoadUserByToken())
    
}
