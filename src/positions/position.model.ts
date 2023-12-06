import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Employee } from "src/employees/employees.model";

interface PositionCreationAttrs {
    name: string;
}

@Table({tableName: 'positions', updatedAt: false, createdAt: false})
export class Position extends Model<Position, PositionCreationAttrs> {
    @ApiProperty({ example: 1, description: 'unique id' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'Developer', description: 'position name' })
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @HasMany(() => Employee)
    employees: Employee[];
}