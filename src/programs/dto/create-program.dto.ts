import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsString()
  status?: string;
}