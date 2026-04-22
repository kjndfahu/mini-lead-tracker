import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(500)
  text: string;
}
