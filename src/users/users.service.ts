import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto) {
    const created = new this.userModel(dto);
    return created.save();
  }

  async findAllByProgram(programId?: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const filter: any = {};
    if (programId) filter.programId = new Types.ObjectId(programId);
    const [items, total] = await Promise.all([
      this.userModel.find(filter).skip(skip).limit(limit).lean(),
      this.userModel.countDocuments(filter)
    ]);
    return { items, total };
  }

  async findOne(id: string) {
    const u = await this.userModel.findById(id);
    if (!u) throw new NotFoundException('User not found');
    return u;
  }
}