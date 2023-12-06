import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Sale } from "src/sales/sales.model";

interface ProductCreationAttrs {
    name: string;
}

@Table({tableName: 'products', updatedAt: false, createdAt: false})
export class Product extends Model<Product, ProductCreationAttrs> {
    @ApiProperty({ example: 1, description: 'unique id' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'Software', description: 'product name' })
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @ApiProperty({example: 3, description: 'available amount'})
    @Column({
        type: DataType.NUMBER,
    })
    amount: number;

    @HasMany(() => Sale)
    sale: Sale;
}