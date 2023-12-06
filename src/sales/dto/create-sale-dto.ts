import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { IsDateString } from "class-validator";


export class CreateSaleDto {
    @ApiProperty({example: 1, description: 'Sale id'})
    @IsNumber({}, {message: "apartmentId must be number"})
    readonly apartmentId: number;

    @ApiProperty({example: 2, description: 'Amount'})
    @IsNumber({}, {message: "amount must be number"})
    readonly amount: number;

    @ApiProperty({example: 1, description: 'Sale id'})
    @IsNumber({}, {message: "productId must be number"})
    readonly productId: number;

    @ApiProperty({example: 'YYYY-MM-DD', description: 'Date'})
    @IsDateString({}, {message: "date must be YYYY-MM-DD"})
    readonly date: Date;
}