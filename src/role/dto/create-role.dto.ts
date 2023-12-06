import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({example: 'ADMIN'})
    @IsString()
    readonly name: string;
    
    @ApiProperty({example: "Has access to everything"})
    @IsString()
    readonly description: string;
}
