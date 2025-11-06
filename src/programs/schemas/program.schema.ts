import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProgramDocument = Program & Document;

@Schema({ timestamps: true })
export class Program {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  startDate?: Date;

  @Prop({ default: 'draft' })
  status: string;
}

export const ProgramSchema = SchemaFactory.createForClass(Program);