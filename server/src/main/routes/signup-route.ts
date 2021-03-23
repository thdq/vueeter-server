import { Router } from 'express'
import { makeSignUpController } from '../factories/signup/signup'
import { adapterRoute } from '../adapters/express/express-route-adapter'

export default (router: Router): void => {
    router.post('/signup', adapterRoute(makeSignUpController()))
}
