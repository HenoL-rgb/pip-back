import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Apartment } from "src/apartments/apartments.model";
import { Position } from "src/positions/position.model";
import { Role } from "src/role/role.model";
import { UserRoles } from "src/role/user-roles.model";

interface EmployeeCreationAttrs {
    apartmentId: number;
    name: string;
    surname: string;
    age: number;
    positionId: number;
    email: string;
    password: string;
}

@Table({tableName: 'employees', updatedAt: false, createdAt: false})
export class Employee extends Model<Employee, EmployeeCreationAttrs> {
    @ApiProperty({ example: 1, description: 'unique id' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'Fedor', description: 'name' })
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @ApiProperty({ example: 'Dostoevsky', description: 'surname' })
    @Column({
        type: DataType.STRING,
    })
    surname: string;

    @ApiProperty({ example: 14, description: 'age' })
    @Column({
        type: DataType.INTEGER,
    })
    age: number;

    @ApiProperty({ example: 1, description: 'apartment id' })
    @ForeignKey(() => Apartment)
    apartmentId: number;
    
    @ApiProperty({ example: 1, description: 'position id' })
    @ForeignKey(() => Position)
    positionId: number;

    @BelongsTo(() => Apartment)
    apartment: Apartment;

    @BelongsTo(() => Position)
    position: Position;

    @ApiProperty({ example: 'email@email.com', description: 'email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;
  
    @ApiProperty({ example: '1234', description: 'password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
  
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}
