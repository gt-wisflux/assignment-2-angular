import { Column, Model, Table, DataType } from "sequelize-typescript";

@Table({tableName: 'ingredients'}) 
export class Ingredient extends Model<Ingredient> { 
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  id: number
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  name: string

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  price: number
}