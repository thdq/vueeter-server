import request from 'supertest'

import app from '../config/app'

describe('Content Type middlware', () => {
    
    test('Should return default content type as JSON', async () => {
        
        app.get('/test_content_type', (req, res) => {
        
            res.send()
            
        })
        
        await request(app)
            .get('/test_content_type')
            .expect('content-type', /json/)
    })
    
})
