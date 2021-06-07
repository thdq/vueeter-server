import { AddVueetModel } from '@/domain/usecases/new-vueet'
import { prisma } from '../helpers/prisma-helper'
import { VueetPostgreSQLRepository } from './vueet'
import faker from 'faker'

interface SutTypes {
    sut: VueetPostgreSQLRepository
}

const makeSut = (): SutTypes => {
    
    const sut = new VueetPostgreSQLRepository()
    
    return {
        sut
    }
    
}

describe('Vueet PostgreSQL Repository', () => {
    
    afterAll(async () => {
        
        await prisma.vueet.deleteMany()
        
        await prisma.$disconnect()
    })
    
    const getValidUserId = async (): Promise<string> => {
        
        const validUser = await prisma.user.create({
            data: {
                username: '!1_any_username',
                birth_date: new Date('2021-02-28'),
                email: '_any_mail@email',
                name: '_any_name',
                password: '_any_password'
            }
        })
        
        return validUser.id
    }
    
    test('Should return a vueet on success', async () => {
        
        const { sut } = makeSut()
        
        const newVueet: AddVueetModel = {
            text: faker.random.word(),
            source: faker.internet.userAgent(),
            in_reply_to_vueet_id: null,
            in_reply_to_user_id: null,
            user_id: await getValidUserId()
        }
        
        const vueet = await sut.create(newVueet)
        
        expect(vueet).toBeTruthy()
        expect(vueet.id).toBeTruthy()
        expect(vueet.text).toBe(newVueet.text)
        expect(vueet.source).toBe(newVueet.source)
        expect(vueet.in_reply_to_vueet_id).toBe(newVueet.in_reply_to_vueet_id)
        expect(vueet.in_reply_to_user_id).toBe(newVueet.in_reply_to_user_id)
        
    })
    
})
