import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { UserRoles } from "./user-roles.model";
import { Employee } from "src/employees/employees.model";

interface RoleCreationAttrs {
    name: string;
    description: string;
}

@Table({tableName: 'role', updatedAt: false, createdAt: false})
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({ example: 1, description: 'unique id' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: "ADMIN", description: 'role name' })
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @ApiProperty({ example: "Has access to everything", description: 'role description' })
    @Column({
        type: DataType.STRING,
    })
    description: string;

    @BelongsToMany(() => Employee, () => UserRoles)
    users: Employee[];
}