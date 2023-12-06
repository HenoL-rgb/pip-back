import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateEmployeeDto {
    @ApiProperty({example: 1, description: 'apartment id'})
    @IsNumber({}, {message: "id must be number"})
    readonly apartmentId?: number;

    @ApiProperty({example: 'Aleksey', description: 'Name'})
    @IsString({message: "name must be string"})

    readonly name?: string;

    @ApiProperty({example: 'Petrov', description: 'Surname'})
    @IsString({message: "surname must be string"})
    readonly surname?: string;

    @ApiProperty({example: 24, description: 'Age'})
    @IsNumber({}, {message: "age must be number"})
    readonly age: number;

    @ApiProperty({example: 1, description: 'Position id'})
    @IsNumber({}, {message: "poisitonId must be number"})
    readonly positionId: number;
}
