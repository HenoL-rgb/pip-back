import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateCityDto {
    @ApiProperty({example: 'Vitebsk', description: 'City name'})
    @IsString({message: "name must be string"})
    readonly name: string;
}