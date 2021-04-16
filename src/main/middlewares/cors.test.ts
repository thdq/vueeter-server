import request from 'supertest'
import app from '../config/app'

describe('CORS middlware', () => {
    
    test('Should enable CORS', async () => {
        
        app.post('/test_cors', (req, res) => {
        
            res.send()
            
        })
        
        await request(app)
            .get('/test-cors')
            .expect('access-control-allow-origin', '*')
            .expect('access-control-allow-methods', '*')
            .expect('access-control-allow-headers', '*')
    })
    
})
