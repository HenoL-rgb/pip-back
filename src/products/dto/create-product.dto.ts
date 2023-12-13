import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Software', description: 'product name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 13, description: 'product amount' })
  @IsNumber()
  readonly amount: number;
}
