import { prisma } from '../helpers/prisma-helper'
import { UserPostgreSQLRepository } from './user'

interface SutTypes {
    sut: UserPostgreSQLRepository
}

const makeSut = (): SutTypes => {
    
    const sut = new UserPostgreSQLRepository()
    
    return {
        sut
    }
    
}

describe('User PostgreSQL Repository', () => {
    
    afterAll(async () => {
        await prisma.$disconnect()
    })
    
    test('Should return a user on success', async () => {
        
        const { sut } = makeSut()
        
        const user = await sut.add({
            username: '_any_username',
            birth_date: new Date('2021-02-28'),
            email: '_any_mail@email',
            name: '_any_name',
            password: '_any_password'
        })
        
        expect(user).toBeTruthy()
        expect(user.id).toBeTruthy()
        expect(user.username).toBe('_any_username')
        expect(user.birth_date.toISOString()).toBe(new Date('2021-02-28').toISOString())
        expect(user.email).toBe('_any_mail@email')
        expect(user.name).toBe('_any_name')
        expect(user.password).toBe('_any_password')
        
    })
    
})
