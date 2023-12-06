import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from './role.model';
import { Employee } from 'src/employees/employees.model';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.NUMBER})
  roleId: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.NUMBER })
  userId: number;

}
