import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({example: 'Software', description: 'product name'})
    @IsString({message: "name must be string"})
    readonly name: string;
}