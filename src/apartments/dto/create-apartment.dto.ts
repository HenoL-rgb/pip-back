import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class CreateApartmentDto {
    @ApiProperty({example: 'Moskovskiy prospect', description: 'street name'})
    @IsString({message: "street must be string"})
    readonly street: string;

    @ApiProperty({example: 1, description: 'city id'})
    @IsNumber({},{message: "cityId must be number"})
    readonly cityId: number;
}