import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Program, ProgramDocument } from './schemas/program.schema';
import { CreateProgramDto } from './dto/create-program.dto';

@Injectable()
export class ProgramsService {
  constructor(@InjectModel(Program.name) private programModel: Model<ProgramDocument>) {}

  async create(dto: CreateProgramDto) {
    const created = new this.programModel(dto);
    return created.save();
  }

  async findAll(filter = {}, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.programModel.find(filter).skip(skip).limit(limit).lean(),
      this.programModel.countDocuments(filter)
    ]);
    return { items, total };
  }

  async findOne(id: string) {
    const p = await this.programModel.findById(id);
    if (!p) throw new NotFoundException('Program not found');
    return p;
  }

  async update(id: string, update: Partial<CreateProgramDto>) {
    return this.programModel.findByIdAndUpdate(id, update, { new: true });
  }

  async remove(id: string) {
    return this.programModel.findByIdAndDelete(id);
  }
}