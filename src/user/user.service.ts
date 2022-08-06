import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDocument } from './entities/user.entity'

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}
    async create(createUserDto: CreateUserDto) {
        return this.userModel.create(createUserDto)
    }

    async findAll() {
        return this.userModel.find().exec()
    }

    async findById(id: string) {
        return this.userModel.findById({ _id: id }).exec()
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userModel.findByIdAndUpdate(id, updateUserDto)
        if (!user) {
            throw new Error('User not found')
        }
        return user
    }

    async remove(id: string) {
        const user = await this.userModel.findByIdAndRemove(id)
        if (!user) {
            throw new Error('User not found')
        }
        return user
    }
}
