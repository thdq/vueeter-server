import { Router } from 'express'
import { makeSignUpController } from '../factories/controllers/signup/signup'
import { makeLoginController } from '../factories/controllers/login/login'
import { adapterRoute } from '../adapters/express/express-route-adapter'

export default (router: Router): void => {
    router.post('/signup', adapterRoute(makeSignUpController()))
    
    router.post('/login', adapterRoute(makeLoginController()))
}
