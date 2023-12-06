import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { City } from "src/cities/cities.model";
import { Employee } from "src/employees/employees.model";

interface ApartmentCreationAttrs {
    street: string;
    cityId: number;
}

@Table({tableName: 'apartments', updatedAt: false, createdAt: false})
export class Apartment extends Model<Apartment, ApartmentCreationAttrs> {
    @ApiProperty({ example: 1, description: 'unique id' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: "Wall street", description: 'street name' })
    @Column({
        type: DataType.STRING,
    })
    street: string;

    @ApiProperty({ example: 1, description: 'city id' })
    @ForeignKey(() => City)
    @Column({
        type: DataType.BIGINT,
    })
    cityId: number;

    @BelongsTo(() => City, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true
    })
    city: City;

    @HasMany(() => Employee)
    employees: Employee[];
}