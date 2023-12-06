import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreatePositionDto {
    @ApiProperty({example: 'Developer', description: 'position name'})
    @IsString({message: "name must be string"})
    readonly name: string;
}