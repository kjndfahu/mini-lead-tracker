import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
  IsNumber,
  Min,
  MaxLength,
} from 'class-validator';
import { LeadStatus } from '@prisma/client';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsEnum(LeadStatus)
  @IsOptional()
  status?: LeadStatus;

  @IsNumber()
  @Min(0)
  @IsOptional()
  value?: number;

  @IsString()
  @MaxLength(2000)
  @IsOptional()
  notes?: string;
}
