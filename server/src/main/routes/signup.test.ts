import request from 'supertest'
import app from '../config/app'
import { prisma } from '../../infra/database/postgresql/helpers/prisma-helper'

describe('SignUp Routes', () => {
    
    afterAll(async () => {
        await prisma.$disconnect()
    })    
    
    test('Should return a user on success', async () => {
        
        await request(app).post('/api/signup').send({
            username: 'thdqo',
            birth_date: new Date('1999-02-19'),
            email: '_any_mail@email.com',
            name: 'Thiago Oliveira',
            password: '_any_password',
            passwordConfirm: '_any_password'
        }).expect(200)
        
    })
    
})
