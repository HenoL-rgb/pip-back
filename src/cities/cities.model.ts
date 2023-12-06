import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Apartment } from "src/apartments/apartments.model";

interface CityCreationAttrs {
    name: string;
}

@Table({tableName: 'cities', updatedAt: false, createdAt: false})
export class City extends Model<City, CityCreationAttrs> {
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({example: 'Vitebsk', description: 'City name'})
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @HasMany(() => Apartment)
    apartments: Apartment[];
}