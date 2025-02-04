import { Column, Model, Table, DataType } from "sequelize-typescript";

@Table({tableName: 'users'}) 
export class User extends Model<User> { 
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string
}