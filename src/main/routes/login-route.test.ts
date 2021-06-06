import request from 'supertest'
import app from '../config/app'
import { prisma } from '../../infra/database/postgresql/helpers/prisma-helper'
import { hash } from 'bcrypt'

describe('Login Routes', () => {
    
    beforeAll(async () => {
        
        await prisma.user.deleteMany({
            where: {
                username: {
                    startsWith: '!'
                }
            }
        })        
        
    })
    
    afterAll(async () => {
        
        await prisma.$disconnect()
    })
    
    describe('Sign Routes', () => {
        
        test('Should return a 200 on signup', async () => {
        
            await request(app).post('/api/signup').send({
                username: '!thdqo',
                birth_date: new Date('1999-02-19'),
                email: '_any_mail@email.com',
                name: 'Thiago Oliveira',
                password: '@1AnyPassword__',
                passwordConfirm: '@1AnyPassword__'
            }).expect(200)
            
        })
        
    })
    
    describe('Login Routes', () => {
        
        test('Should return a 200 on login', async () => {
            
            const password = await hash('_any_password', 12)
            
            await prisma.user.create({
                data: {
                    username: '!thdqo1',
                    birth_date: new Date('1999-02-19'),
                    email: '_any_mail2@email.com',
                    name: 'Thiago Oliveira',
                    password: password                   
                }
            })
            
            await request(app).post('/api/login').send({
                username: '!thdqo1',
                password: '_any_password'
            }).expect(200)
            
        })
        
        test('Should return a 401 if login is unauthorized', async () => {
            
            const password = await hash('_any_password', 12)
            
            await prisma.user.create({
                data: {
                    username: '!thdqo2',
                    birth_date: new Date('1999-02-19'),
                    email: '_any_mail3@email.com',
                    name: 'Thiago Oliveira',
                    password: password                   
                }
            })
            
            await request(app).post('/api/login').send({
                username: '!thdqo2',
                password: '_invalid_password'
            }).expect(401)
            
        })        
        
    })    
    
})
