import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";


export class CreateEmployeeDto {
    @ApiProperty({example: 'email@example.com', description: "user's email"})
    @IsEmail()
    readonly email: string;

    @ApiProperty({example: '1aAkfaoefr', description: "user's password"})
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    })
    readonly password: string;
}