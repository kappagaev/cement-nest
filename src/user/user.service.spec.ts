import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'

describe('UserService', () => {
    let service: UserService

    function mockUserModel(dto: any) {
        this.data = dto
        this.save = () => {
            return this.data
        }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken('User'),
                    useValue: new mockUserModel({
                        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
                        name: 'John Doe',
                        email: 'kkpagaev@gmail.com',
                    }),
                },
            ],
        }).compile()

        service = module.get<UserService>(UserService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
