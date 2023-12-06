import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Apartment } from "src/apartments/apartments.model";
import { Product } from "src/products/products.model";


interface SaleCreationAttrs {
    apartmentId: number;
    amount: number;
    productId: number;
    date: Date;
}

@Table({tableName: 'sales'})
export class Sale extends Model<Sale, SaleCreationAttrs> {

    @ApiProperty({ example: 1, description: 'unique id' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: '2023-04-12', description: 'sale date' })
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    date: Date;

    @ApiProperty({ example: 2, description: 'sale amount' })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    amount: number;

    @ApiProperty({ example: 1, description: 'product id' })
    @ForeignKey(() => Product)
    productId: number;

    @ApiProperty({ example: 3, description: 'apartment id' })
    @ForeignKey(() => Apartment)
    apartmentId: number;

    @BelongsTo(() => Product)
    product: Product;

    @BelongsTo(() => Apartment)
    apartment: Apartment;
}