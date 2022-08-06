import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'

describe('UserController', () => {
    let controller: UserController

    function mockUserModel(dto: any) {
        this.data = dto
        this.save = () => {
            return this.data
        }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
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

        controller = module.get<UserController>(UserController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
