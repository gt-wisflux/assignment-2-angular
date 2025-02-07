import { Column, Model, Table, DataType } from "sequelize-typescript";

@Table({tableName: 'ingredients'}) 
export class Ingredient extends Model<Ingredient> { 
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true 
  })
  id: number
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  name: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  price: number
}